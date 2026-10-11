const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build');
const indexFile = path.join(buildDir, 'index.html');
const destFile = path.join(buildDir, '404.html');

try {
  if (!fs.existsSync(buildDir)) {
    console.log('Build directory not found, skipping copy of 404.html');
    process.exit(0);
  }
  if (!fs.existsSync(indexFile)) {
    console.log('index.html not found in build directory, skipping copy of 404.html');
    process.exit(0);
  }
  fs.copyFileSync(indexFile, destFile);
  console.log('Copied index.html to 404.html');
} catch (err) {
  console.error('Failed to copy 404.html:', err);
  process.exit(1);
}
