import os
import sys
import json

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import MobileNetV2

print("=== PlantAI Intelligence Engine - Fast Neural Training (25 Classes) ===")

dataset_dir = 'dataset'
img_size = (224, 224)
batch_size = 32

# Load dataset with built-in shuffle and validation split
train_ds, val_ds = tf.keras.preprocessing.image_dataset_from_directory(
    dataset_dir,
    validation_split=0.15,
    subset="both",
    seed=123,
    image_size=img_size,
    batch_size=batch_size,
    shuffle=True
)

class_names = train_ds.class_names
num_classes = len(class_names)
print(f"Loaded {num_classes} classes: {class_names}")

# Save class_names.json mapping
with open('class_names.json', 'w', encoding='utf-8') as f:
    json.dump(class_names, f, indent=2)
print("Saved class_names.json mapping.")

AUTOTUNE = tf.data.AUTOTUNE
train_ds = train_ds.prefetch(buffer_size=AUTOTUNE)
val_ds = val_ds.prefetch(buffer_size=AUTOTUNE)

# Data Augmentation layer
data_augmentation = tf.keras.Sequential([
    layers.RandomFlip("horizontal_and_vertical"),
    layers.RandomRotation(0.2),
    layers.RandomZoom(0.15),
    layers.RandomContrast(0.15)
], name='botanical_augmentation')

# MobileNetV2 Base (pre-trained on ImageNet)
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)
base_model.trainable = False

# Build Model
inputs = tf.keras.Input(shape=(224, 224, 3))
x = data_augmentation(inputs)
x = layers.Rescaling(1./127.5, offset=-1)(x) # MobileNetV2 [-1, 1] normalization
x = base_model(x, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.35)(x)
x = layers.Dense(192, activation='relu')(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.25)(x)
outputs = layers.Dense(num_classes, activation='softmax')(x)

model = tf.keras.Model(inputs, outputs, name="PlantAI_MobileNetV2_Classifier")

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

print("\n--- Phase 1: Training Classification Head (4 Epochs) ---")
model.fit(
    train_ds,
    epochs=4,
    validation_data=val_ds
)

print("\n--- Phase 2: Fine-Tuning Top Layers (2 Epochs) ---")
base_model.trainable = True
for layer in base_model.layers[:-25]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=3e-5),
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(
    train_ds,
    epochs=2,
    validation_data=val_ds
)

eval_results = model.evaluate(val_ds)
print(f"\nFinal Validation Accuracy: {eval_results[1]*100:.2f}%")

model_path = 'medicinal_plant_model.h5'
model.save(model_path)
print(f"Model saved successfully to {model_path}!")
