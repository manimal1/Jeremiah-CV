const fs = require('fs');
const pdf = require('html-pdf');
const html = fs.readFileSync('./test/businesscard.html', 'utf8');
const options = { format: 'Letter' };

pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});
