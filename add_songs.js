const fs = require('fs');
const path = require('path');

const musicJsonPath = path.join(__dirname, 'music.json');
let musicJson = JSON.parse(fs.readFileSync(musicJsonPath, 'utf8'));

const songsToAdd = [
  { file: '04 - Kun Faya Kun - A. R. Rahman, Javed Ali, Mohit Chauhan.flac', song: 'Kun Faya Kun', artist: 'A. R. Rahman, Javed Ali, Mohit Chauhan', movie: 'Rockstar' },
  { file: '102 -  Lag Ja Gale Se Phir (From Woh Kaun Thi).flac', song: 'Lag Ja Gale Se Phir', artist: 'Lata Mangeshkar', movie: 'Woh Kaun Thi' },
  { file: '24 Agar Tum Saath Ho (From _Tamasha_).flac', song: 'Agar Tum Saath Ho', artist: 'Alka Yagnik, Arijit Singh', movie: 'Tamasha' },
  { file: 'Apna Bana Le - Sachin-Jigar.flac', song: 'Apna Bana Le', artist: 'Arijit Singh, Sachin-Jigar', movie: 'Bhediya' },
  { file: 'Dilwale_Original_Motion_Picture.flac', song: 'Janam Janam', artist: 'Arijit Singh, Antara Mitra', movie: 'Dilwale' },
  { file: 'Jawad_Ahmed,_Sharib_Toshi,_Arijit_Singh,_Shreya_Ghoshal_Samjhawan.flac', song: 'Samjhawan', artist: 'Arijit Singh, Shreya Ghoshal', movie: 'Humpty Sharma Ki Dulhania' },
  { file: 'Kalank  Title Track - Pritam.flac', song: 'Kalank (Title Track)', artist: 'Arijit Singh, Pritam', movie: 'Kalank' },
  { file: 'Kesariya (From _Brahmastra_) - Pritam.flac', song: 'Kesariya', artist: 'Arijit Singh, Pritam', movie: 'Brahmastra' },
  { file: 'My_Name_Is_Khan_Original_Motion_Picture_Soundtrack_CD_1_TR.flac', song: 'Tere Naina', artist: 'Shafqat Amanat Ali', movie: 'My Name Is Khan' },
  { file: 'Phir Le Aya Dil - Pritam.flac', song: 'Phir Le Aya Dil', artist: 'Rekha Bhardwaj, Pritam', movie: 'Barfi!' },
  { file: 'Pritam, Arijit Singh - Phir Le Aya Dil (Reprise).flac', song: 'Phir Le Aya Dil (Reprise)', artist: 'Arijit Singh, Pritam', movie: 'Barfi!' },
  { file: 'Pritam, Arijit Singh, Shilpa Rao - Bulleya (Reprise).flac', song: 'Bulleya (Reprise)', artist: 'Arijit Singh, Shilpa Rao, Pritam', movie: 'Ae Dil Hai Mushkil' },
  { file: 'Pritam,_Arijit_Singh_Channa_Mereya_From__Ae_Dil_Hai_Mushkil_.flac', song: 'Channa Mereya', artist: 'Arijit Singh, Pritam', movie: 'Ae Dil Hai Mushkil' },
  { file: 'Radha kaise na jale.FLAC', song: 'Radha Kaise Na Jale', artist: 'Asha Bhosle, Udit Narayan, A.R. Rahman', movie: 'Lagaan' },
  { file: 'Shashwat Sachdev - Gehra Hua (From  Dhurandhar ).flac', song: 'Gehra Hua', artist: 'Shashwat Sachdev', movie: 'Dhurandhar' },
  { file: 'Zaalima - Arijit Singh.flac', song: 'Zaalima', artist: 'Arijit Singh, Harshdeep Kaur', movie: 'Raees' }
];

for (const s of songsToAdd) {
  const sourcePath = path.join('d:\\losless', s.file);
  
  // Clean filename for URL friendliness and to append prefix
  let cleanName = s.file.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-\.]/g, '').toLowerCase();
  if (cleanName.endsWith('.flac')) {
     // good
  } else {
     cleanName += '.flac';
  }
  
  const targetFileName = 'shivam-' + cleanName;
  const destPath = path.join(__dirname, 'Music', targetFileName);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`Copied: ${targetFileName}`);
    
    musicJson.items.push({
      song: s.song,
      artist: s.artist,
      movie: s.movie,
      url: `https://lossless.echomusic.fun/Music/${targetFileName}`
    });
  } else {
    console.error("Missing file: " + sourcePath);
  }
}

fs.writeFileSync(musicJsonPath, JSON.stringify(musicJson, null, 2));
console.log("music.json updated successfully.");
