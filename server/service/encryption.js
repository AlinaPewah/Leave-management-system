// const { constants } = require( 'perf_hooks');
// Nodejs encryption with CTR

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
// const key = crypto.randomBytes(32);
// const iv = crypto.randomBytes(16);

const key = Buffer.from(process.env.KEY, 'hex');

const iv = Buffer.from(process.env.IV, 'hex');

// const text = {
//     "id": "Hid389s89hf894h89srh",
//     "contact": 09123433433
// }
// console.log('key:',  key);
// console.log('iv:', iv.toString('hex'));
const encrypt = (text) => {
  // console.log("Text Here",text)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);

  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { i: iv.toString('hex'), de: encrypted.toString('hex') };
};

const decrypt = (text) => {
  // console.log(text)
  const iv = Buffer.from(text.i, 'hex');
  const encryptedText = Buffer.from(text.de, 'hex');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  // decipher.setAutoPadding(false)
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

// var hw = JSON.stringify(encrypt(JSON.stringify(text)))
// console.log(hw)
// //console.log("*******************")
// //hw = JSON.stringify(hw)
// const hw = '{"i":"4fddc0484000e25462380c0c00b11d82","de":"ca44fdae20704db40ef592edc07cdfd937f6a5cc84a846125d5fe4374cc4cc6a6066bf490324fa75091c5976240bd19f89384fc7148410e350f95c1f1f32517c"}'
// const dc = JSON.parse(decrypt(JSON.parse(hw)))
// console.log(dc)
// console.log(text.id == dc.id )
// console.log(text, "\n\n",dc)

// console.log(JSON.stringify(hw))
module.exports = { encrypt, decrypt };
