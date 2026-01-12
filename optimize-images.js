import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  {
    name: 'siding-01.webp',
    input: 'src/assets/siding/siding-01.webp',
    quality: 78,
    resize: 1920
  },
  {
    name: 'water-damage-01.webp',
    input: 'src/assets/water-damage/water-damage-01.webp',
    quality: 75,
    resize: 1920
  }
];

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  for (const img of images) {
    try {
      const inputPath = path.join(process.cwd(), img.input);
      const tempPath = inputPath + '.tmp';
      const inputStat = fs.statSync(inputPath);
      const inputSize = (inputStat.size / 1024).toFixed(2);

      console.log(`📦 ${img.name}`);
      console.log(`   Input: ${inputSize} KB`);

      // Optimize to temp file
      await sharp(inputPath)
        .resize(1920, 1080, {
          fit: 'cover',
          withoutEnlargement: true
        })
        .webp({ quality: img.quality })
        .toFile(tempPath);

      // Replace original with optimized version
      try {
        fs.unlinkSync(inputPath);
        fs.renameSync(tempPath, inputPath);

        const outputStat = fs.statSync(inputPath);
        const outputSize = (outputStat.size / 1024).toFixed(2);
        const reduction = (((inputSize - outputSize) / inputSize) * 100).toFixed(1);

        console.log(`   Output: ${outputSize} KB (saved ${reduction}%)`);
        console.log(`   ✅ Complete\n`);
      } catch (replaceError) {
        console.log(`   ⚠️  File locked (likely open in editor)`);
        console.log(`   Optimized version saved to temp: ${tempPath}`);
        console.log(`   Please close the editor and run again\n`);
        // Keep temp file for manual move
      }
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
    }
  }

  console.log('✨ Optimization complete!');
}

optimizeImages();
