const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const fetch = require('node-fetch');

async function fetchAdamiz() {
  const response = await fetch('https://4s7kcwiwv2.execute-api.us-east-1.amazonaws.com/dev/get-adamiz');
  const data = await response.json();

  console.log(data.message);

  return data.message === 'ADAMIZDA' ? 'adamizda' : 'adamizda-degil';
}

async function build() {
  const adamizdami = await fetchAdamiz();

  const indexFile = nunjucks.render('src/templates/index.njk', { 'mehmet': adamizdami });

  if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
  }
  fs.writeFileSync('public/index.html', indexFile);

  fs.copySync('static', 'public/static');
}

build();
