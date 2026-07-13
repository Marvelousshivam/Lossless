const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, 'Music');
const musicJsonPath = path.join(__dirname, 'music.json');

// 1. Rename files in Music/
const files = fs.readdirSync(musicDir);
files.forEach(file => {
    if (file.startsWith('shivam-')) {
        const newFileName = file.replace(/^shivam-/, 'Marvelousshivam-');
        const oldPath = path.join(musicDir, file);
        const newPath = path.join(musicDir, newFileName);
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${newFileName}`);
    }
});

// 2. Update music.json
let musicJsonContent = fs.readFileSync(musicJsonPath, 'utf8');
musicJsonContent = musicJsonContent.replace(/Music\/shivam-/g, 'Music/Marvelousshivam-');
fs.writeFileSync(musicJsonPath, musicJsonContent, 'utf8');
console.log('Updated music.json to use Marvelousshivam- prefix.');
