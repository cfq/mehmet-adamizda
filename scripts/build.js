import { existsSync, mkdirSync, writeFileSync, cpSync } from 'fs';
import nunjucks from 'nunjucks';
import fetch from 'node-fetch';

async function fetchAdamiz() {
  const response = await fetch('https://4s7kcwiwv2.execute-api.us-east-1.amazonaws.com/dev/get-adamiz');
  const data = await response.json();

  console.log(data.message);

  return data.message === 'ADAMIZDA' ? 'adamizda' : 'adamizda-degil';
}

async function build() {
  const adamizdami = await fetchAdamiz();

  const indexFile = nunjucks.render('src/templates/index.njk', { 'mehmet': adamizdami });

  if (!existsSync('public')) {
    mkdirSync('public');
  }
  writeFileSync('public/index.html', indexFile);

  cpSync('static', 'public/static', {recursive: true});
}

build();
