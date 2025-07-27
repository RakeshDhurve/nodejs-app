import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the mode from command line arguments
const mode = process.argv[2] || 'development';

// Source and destination files
const sourceFile = path.join(__dirname, `env.${mode}`);
const destFile = path.join(__dirname, '.env');

try {
  // Check if source file exists
  if (fs.existsSync(sourceFile)) {
    // Copy the environment file
    fs.copyFileSync(sourceFile, destFile);
    console.log(`✅ Environment file copied for ${mode} mode`);
    console.log(`📁 Source: ${sourceFile}`);
    console.log(`📁 Destination: ${destFile}`);
  } else {
    console.error(`❌ Environment file not found: ${sourceFile}`);
    console.log('Available environment files:');
    const files = fs.readdirSync(__dirname).filter(file => file.startsWith('env.'));
    files.forEach(file => console.log(`  - ${file}`));
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Error copying environment file:', error.message);
  process.exit(1);
} 