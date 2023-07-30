const fs = require('fs-extra');
const nunjucks = require('nunjucks');

const adamizdami = process.env.mehmet || 'adamizda';

const indexFile = nunjucks.render('src/templates/index.njk', {'mehmet': adamizdami});

if (!fs.existsSync('public')){
  fs.mkdirSync('public');
}
fs.writeFileSync('public/index.html', indexFile);

fs.copySync('static', 'public/static');
