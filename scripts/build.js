import { existsSync, mkdirSync, writeFileSync, cpSync } from 'fs';
import * as sass from 'sass';

async function build() {
  if (!existsSync('public')) {
    mkdirSync('public');
  }

  cpSync('src/templates/index.html', 'public/index.html');

  const compiledCSS = sass.compile("src/scss/main.scss", {style: "compressed"});
  if(!existsSync('static/css')){
    mkdirSync('static/css');
  }
  writeFileSync('static/css/styles.css', compiledCSS.css);

  cpSync('static', 'public/static', {recursive: true});
}

build();
