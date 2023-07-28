const moment = require('moment');
const yargs = require('yargs');
require('moment-timezone');
const { saveContact, listContact, deleteContact } = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Menambahkan contact baru',
    builder: {
      nama: {
        describe: 'Nama lengkap',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Alamat email',
        demandOption: true,
        type: 'string',
      },
      noHp: {
        describe: 'Nomor HP',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      const iTime = moment().tz('Asia/Jakarta').format('DD-MM-YYYY HH:mm:ss');
      saveContact(argv.nama, argv.email, argv.noHp, iTime);
    },
  })
  .demandCommand();

yargs.command({
  command: 'list',
  describe: 'Menampilkan semua list contact',
  handler() {
    listContact();
  },
});

yargs.command({
  command: 'delete',
  describe: 'Menghapus contact berdasarkan nama',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
