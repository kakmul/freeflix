const fs = require('fs');
const path = require('path');
const obfuscator = require('javascript-obfuscator');

const walk = (dir, callback) => {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.js')) {
      callback(filepath);
    }
  });
};

const targetDir = path.resolve(__dirname, '../.next/static/chunks');

walk(targetDir, filepath => {
  const code = fs.readFileSync(filepath, 'utf8');
  const obfuscated = obfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    stringArray: true,
    rotateStringArray: true
  }).getObfuscatedCode();
  fs.writeFileSync(filepath, obfuscated);
  console.log(`Obfuscated: ${filepath}`);
});
