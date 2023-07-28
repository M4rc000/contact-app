const fs = require('fs');
const validator = require('validator');

const dirPath = './data';
const filePath = './data/contacts.json';

// CEK FOLDER
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// CEK FILE
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

const loadContact = () => {
  const file = fs.readFileSync('./data/contacts.json', 'utf8');
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContact = (nama, email, noHp, iTime) => {
  // const iTime = new Date().toLocaleString('en-US', {
  //   timeZone: 'Asia/Jakarta', // Change this to the appropriate time zone
  //   hour12: false, // Set to true for 12-hour format, false for 24-hour format
  // });
  const contact = { nama, email, noHp, iTime };
  const contacts = loadContact();

  const duplicate = contacts.find((contact) => contact.nama === nama);
  if (duplicate) {
    console.log('Contact sudah terdaftar, silahkan gunakan nama lain !');
    return false;
  }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(`Email yang ada masukan tidak valid ! ${email}`);
      return false;
    }
  }

  if (!validator.isMobilePhone(noHp, 'id-ID')) {
    console.log(`Nomor HP yang ada masukan tidak valid ! ${noHp}`);
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync('./data/contacts.json', JSON.stringify(contacts));
  console.log('Data berhasil di input');
};

const listContact = () => {
  const contacts = loadContact();
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.email} - ${contact.noHp} - ${contact.iTime}`);
  });
};

const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
  if (contacts.length === newContact.length) {
    console.log(`${nama} tidak ditemukan !`);
    return false;
  } else {
    fs.writeFileSync('./data/contacts.json', JSON.stringify(newContact));
    console.log(` Data contact ${nama} berhasil dihapus`);
  }
};

module.exports = {
  saveContact,
  listContact,
  deleteContact,
};
