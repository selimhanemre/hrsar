#!/usr/bin/env python3
import os

repo = '/mnt/data/projects/hrsar'
config_path = os.path.join(repo, 'src/config.ts')

with open(config_path, 'r') as f:
    content = f.read()

old = "tel:+150****7751"
new = "tel:+15013817751"

if old in content:
    content = content.replace(old, new)
    with open(config_path, 'w') as f:
        f.write(content)
    print(f'Replaced "{old}" with "{new}"')
else:
    print(f'Pattern "{old}" not found in config')

# Also fix Base.astro GA4 condition
base_path = os.path.join(repo, 'src/layouts/Base.astro')
with open(base_path, 'r') as f:
    base_content = f.read()

# Replace the GA4 conditional block entirely
old_ga4 = '''    {site.ga4 && site.ga4.length > 0 && (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`}></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', '${site.ga4}');
        </script>
      </>
    )}'''

new_ga4 = '''    {site.ga4 ? (
      <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`}></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag() { dataLayer.push(arguments); }
          gtag('js', new Date());
          gtag('config', `${site.ga4}`);
        </script>
      </>
    ) : ''}'''

if old_ga4 in base_content:
    base_content = base_content.replace(old_ga4, new_ga4)
    with open(base_path, 'w') as f:
        f.write(base_content)
    print('Updated Base.astro GA4 condition')
else:
    print('Base.astro GA4 block not found for replacement')
