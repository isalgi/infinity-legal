import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'public/images';
const outputDir = 'public/images/optimized';

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImages() {
  try {
    const files = fs.readdirSync(inputDir);
    const imageFiles = files.filter(file => 
      file.toLowerCase().endsWith('.webp') || 
      file.toLowerCase().endsWith('.jpg') || 
      file.toLowerCase().endsWith('.jpeg') || 
      file.toLowerCase().endsWith('.png')
    );

    console.log(`Found ${imageFiles.length} images to optimize...`);

    for (const file of imageFiles) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      console.log(`Optimizing: ${file}`);
      
      await sharp(inputPath)
        .webp({ 
          quality: 60,
          effort: 6
        })
        .resize(800, 600, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .toFile(outputPath);
      
      const originalStats = fs.statSync(inputPath);
      const optimizedStats = fs.statSync(outputPath);
      const savedBytes = originalStats.size - optimizedStats.size;
      const savedPercent = ((savedBytes / originalStats.size) * 100).toFixed(1);
      
      console.log(`✓ ${file}: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB → ${(optimizedStats.size / 1024 / 1024).toFixed(2)}MB (${savedPercent}% smaller)`);
    }
    
    console.log('\n✅ All images optimized successfully!');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();