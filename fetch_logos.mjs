import fs from 'fs';
import path from 'path';
import https from 'https';

const brands = [
  { name: 'bumble', domain: 'bumble.com' },
  { name: 'swiggy', domain: 'swiggy.com' },
  { name: 'clinique', domain: 'clinique.com' },
  { name: 'mercedes', domain: 'mercedes-benz.com' },
  { name: 'ritukumar', domain: 'ritukumar.com' },
  { name: 'bacardi', domain: 'bacardi.com' },
  { name: 'hm', domain: 'hm.com' },
  { name: 'nykaa', domain: 'nykaa.com' },
  { name: 'lovebeauty', domain: 'lovebeautyandplanet.com' },
  { name: 'noise', domain: 'gonoise.com' },
  { name: 'coach', domain: 'coach.com' },
  { name: 'mars', domain: 'mars.com' },
  { name: 'zara', domain: 'zara.com' },
  { name: 'myntra', domain: 'myntra.com' },
  { name: 'bgmi', domain: 'battlegroundsmobileindia.com' }
];

const dir = './public/brands';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function downloadLogo(brand) {
  const url = `https://icon.horse/icon/${brand.domain}`;
  const dest = path.join(dir, `${brand.name}.png`);
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded ${brand.name}`);
          resolve(true);
        });
      } else {
        console.log(`Failed to download ${brand.name} (Status: ${res.statusCode})`);
        resolve(false);
      }
    }).on('error', (err) => {
      console.log(`Error downloading ${brand.name}:`, err.message);
      resolve(false);
    });
  });
}

async function main() {
  for (const brand of brands) {
    await downloadLogo(brand);
  }
}

main();
