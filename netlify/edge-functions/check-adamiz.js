import nunjucks from 'nunjucks';

async function fetchAdamiz() {
  const response = await fetch('https://4s7kcwiwv2.execute-api.us-east-1.amazonaws.com/dev/get-adamiz');
  const data = await response.json();

  console.log(data.message);

  return data.message === 'ADAMIZDA' ? 'adamizda' : 'adamizda-degil';
}

export default async (request, context) => {
  const adamizdami = await fetchAdamiz();
  const response = await context.next();
  const page = await response.text();
  const inAdamiz = adamizdami == "adamizda";

  const replacedPage = page
    .replace('R_HTML_CLASS', adamizdami)
    .replace('R_DESCRIPTION', inAdamiz ? 'Adamızda!' : "Adamızda değil :(")
    .replace('R_P_CLASS', inAdamiz ? 'adamizda-text' : "adamizda-degil-text")
    .replace('R_P_TEXT', inAdamiz ?
                            'Mehmet Adam&inodot;zda &#127965;&#65039;' :
                            "Mehmet Adam&inodot;zda de&gbreve;il &#129394;")

  return new Response(
    replacedPage,
    response
  );
};
