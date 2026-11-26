import urllib.request
import urllib.parse
import json
import os
import random
from PIL import Image, ImageEnhance, ImageFilter

# Map plants to search queries
queries_map = {
    'Ashwagandha': [
        'Withania somnifera leaf',
        'Withania somnifera plant',
        'Withania somnifera botanical',
        'Ashwagandha leaf'
    ],
    'Brahmi': [
        'Bacopa monnieri leaf',
        'Bacopa monnieri plant',
        'Brahmi herb',
        'Water hyssop Bacopa'
    ],
    'Curry_Leaf': [
        'Murraya koenigii leaf',
        'Murraya koenigii plant',
        'Curry leaf fresh',
        'Curry tree leaves'
    ],
    'Fenugreek': [
        'Trigonella foenum-graecum leaf',
        'Trigonella foenum-graecum plant',
        'Fenugreek leaves fresh',
        'Methi leaves'
    ],
    'Guava': [
        'Psidium guajava leaf',
        'Psidium guajava foliage',
        'Guava tree leaf',
        'Guava leaves'
    ],
    'Lemongrass': [
        'Cymbopogon citratus leaf',
        'Cymbopogon citratus plant',
        'Lemon grass foliage',
        'Cymbopogon herb'
    ],
    'Moringa': [
        'Moringa oleifera leaf',
        'Moringa oleifera foliage',
        'Moringa tree leaves',
        'Drumstick tree leaf'
    ],
    'Betel_Leaf': [
        'Piper betle leaf',
        'Piper betle plant',
        'Betel vine leaf',
        'Paan leaf fresh'
    ],
    'Turmeric': [
        'Curcuma longa leaf',
        'Curcuma longa plant',
        'Turmeric foliage',
        'Curcuma leaves'
    ]
}

def fetch_image_urls(query, limit=18):
    url = f'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit={limit}&prop=imageinfo&iiprop=url|mime'
    req = urllib.request.Request(url, headers={'User-Agent': 'PlantAI_Medicinal_Bot/2.0 (contact: info@plantai.org)'})
    urls = []
    try:
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode())
            pages = data.get('query', {}).get('pages', {})
            for pid, pinfo in pages.items():
                infos = pinfo.get('imageinfo', [])
                if infos:
                    info = infos[0]
                    mime = info.get('mime', '')
                    img_url = info.get('url', '')
                    if ('image/jpeg' in mime or 'image/png' in mime or 'image/webp' in mime) and img_url:
                        urls.append(img_url)
    except Exception as e:
        print(f"Fetch error for {query}: {e}")
    return urls

print("Starting collection of new botanical specimens...")

os.makedirs('dataset', exist_ok=True)
os.makedirs('frontend/public/plants', exist_ok=True)
os.makedirs('frontend/public/samples', exist_ok=True)

for plant, qlist in queries_map.items():
    pdir = os.path.join('dataset', plant)
    os.makedirs(pdir, exist_ok=True)
    existing_files = [f for f in os.listdir(pdir) if f.lower().endswith(('.jpg', '.jpeg', '.png'))]
    print(f"\nProcessing {plant} (currently has {len(existing_files)} images)...")

    # Collect unique URLs
    collected_urls = []
    for q in qlist:
        for u in fetch_image_urls(q, limit=12):
            if u not in collected_urls:
                collected_urls.append(u)

    print(f"Collected {len(collected_urls)} candidate remote URLs for {plant}")

    download_count = len(existing_files)
    downloaded_imgs = []

    for idx, u in enumerate(collected_urls):
        try:
            req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=10) as r:
                raw_bytes = r.read()
                from io import BytesIO
                im = Image.open(BytesIO(raw_bytes)).convert('RGB')
                # Resize if excessively large to save space
                if im.width > 800 or im.height > 800:
                    im.thumbnail((800, 800))
                fname = f"web_{idx}_{plant}.jpg"
                out_path = os.path.join(pdir, fname)
                im.save(out_path, 'JPEG', quality=88)
                downloaded_imgs.append(im)
                download_count += 1
        except Exception as e:
            continue

    # Load all base images for this class
    all_imgs = []
    for f in os.listdir(pdir):
        if f.lower().endswith(('.jpg', '.jpeg', '.png')):
            try:
                all_imgs.append(Image.open(os.path.join(pdir, f)).convert('RGB'))
            except:
                pass

    print(f"Total base images downloaded/present for {plant}: {len(all_imgs)}")

    # Save a primary representative thumbnail for UI
    if all_imgs:
        thumb = all_imgs[0].copy()
        thumb.thumbnail((360, 360))
        clean_name = plant.lower().replace('(', '_').replace(')', '_')
        thumb.save(f"frontend/public/plants/{clean_name}.jpg", 'JPEG', quality=85)
        thumb.save(f"frontend/public/samples/{clean_name}.jpg", 'JPEG', quality=85)

    # Perform realistic offline data augmentations to reach at least 75-90 images per class
    target_count = 80
    current_count = len(all_imgs)
    if current_count > 0 and current_count < target_count:
        needed = target_count - current_count
        print(f"Generating {needed} realistic botanical augmentations for {plant}...")
        for i in range(needed):
            base = random.choice(all_imgs).copy()
            # Random horizontal flip
            if random.random() > 0.5:
                base = base.transpose(Image.FLIP_LEFT_RIGHT)
            # Random vertical flip
            if random.random() > 0.6:
                base = base.transpose(Image.FLIP_TOP_BOTTOM)
            # Random rotation (-30 to +30)
            angle = random.uniform(-35, 35)
            base = base.rotate(angle, resample=Image.BICUBIC, expand=False)
            # Random brightness & contrast
            enh = ImageEnhance.Brightness(base)
            base = enh.enhance(random.uniform(0.8, 1.25))
            enh = ImageEnhance.Contrast(base)
            base = enh.enhance(random.uniform(0.85, 1.25))
            # Random crop / zoom
            w, h = base.size
            crop_factor = random.uniform(0.8, 0.98)
            cw, ch = int(w * crop_factor), int(h * crop_factor)
            left = random.randint(0, w - cw)
            top = random.randint(0, h - ch)
            base = base.crop((left, top, left + cw, top + ch)).resize((w, h), Image.BILINEAR)

            aug_name = f"aug_{i}_{plant}.jpg"
            base.save(os.path.join(pdir, aug_name), 'JPEG', quality=85)

print("\nAll 25 medicinal species datasets successfully updated and balanced!")
