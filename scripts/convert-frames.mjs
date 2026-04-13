/**
 * Smoke Frame Optimizer
 * Converts 240 PNG frames → WebP
 * Strips alpha, caps at 1920x1080, quality 78%
 *
 * Usage:
 *   npm install sharp --save-dev
 *   node scripts/convert-frames.mjs
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.resolve(__dirname, '../public/Smoke-frames');
const OUTPUT_DIR = path.resolve(__dirname, '../public/Smoke-webp');

const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;
const QUALITY = 78;
const TOTAL_FRAMES = 240;

async function convertFrame(inputPath, outputPath, index) {
  try {
    await sharp(inputPath)
      .flatten({ background: { r: 0, g: 0, b: 0 } }) // Remove alpha, composite on black
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',           // Maintain aspect ratio within bounds
        withoutEnlargement: true // Don't upscale if smaller
      })
      .webp({ quality: QUALITY, effort: 4 }) // effort 4 = good balance of speed/compression
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);
    
    return { index, inputSize: inputStats.size, outputSize: outputStats.size, savings };
  } catch (err) {
    console.error(`  ✗ Frame ${index}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  🔥 Smoke Frame Optimizer');
  console.log('  PNG → WebP | Alpha stripped | 1080p cap');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Create output directory
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  let totalInputBytes = 0;
  let totalOutputBytes = 0;
  let converted = 0;

  // Process in batches of 10 for controlled concurrency
  const BATCH_SIZE = 10;

  for (let batch = 0; batch < Math.ceil(TOTAL_FRAMES / BATCH_SIZE); batch++) {
    const promises = [];
    const start = batch * BATCH_SIZE + 1;
    const end = Math.min(start + BATCH_SIZE - 1, TOTAL_FRAMES);

    for (let i = start; i <= end; i++) {
      const paddedIndex = String(i).padStart(3, '0');
      const inputFile = path.join(INPUT_DIR, `ezgif-frame-${paddedIndex}.png`);
      const outputFile = path.join(OUTPUT_DIR, `frame-${paddedIndex}.webp`);

      if (fs.existsSync(inputFile)) {
        promises.push(convertFrame(inputFile, outputFile, i));
      }
    }

    const results = await Promise.all(promises);

    for (const result of results) {
      if (result) {
        totalInputBytes += result.inputSize;
        totalOutputBytes += result.outputSize;
        converted++;
      }
    }

    // Progress bar
    const progress = Math.round((end / TOTAL_FRAMES) * 100);
    const bar = '█'.repeat(Math.floor(progress / 2)) + '░'.repeat(50 - Math.floor(progress / 2));
    process.stdout.write(`\r  [${bar}] ${progress}% (${converted}/${TOTAL_FRAMES})`);
  }

  console.log('\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  ✓ Converted: ${converted} frames`);
  console.log(`  ✓ Input:     ${(totalInputBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  ✓ Output:    ${(totalOutputBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  ✓ Savings:   ${((1 - totalOutputBytes / totalInputBytes) * 100).toFixed(1)}%`);
  console.log(`  ✓ Output:    ${OUTPUT_DIR}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main().catch(console.error);
