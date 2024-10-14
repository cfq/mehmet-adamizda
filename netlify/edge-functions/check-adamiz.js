const replacements = {
  'R_HTML_CLASS': {
    'adamizda': 'adamizda',
    'adamizda-degil': 'adamizda-degil'
  },
  'R_DESCRIPTION': {
    'adamizda': 'Adamızda!',
    'adamizda-degil': 'Adamızda değil :('
  },
  'R_P_CLASS': {
    'adamizda': 'adamizda-text',
    'adamizda-degil': 'adamizda-degil-text'
  },
  'R_P_TEXT': {
    'adamizda': 'Mehmet Adam&inodot;zda &#127965;&#65039;',
    'adamizda-degil': 'Mehmet Adam&inodot;zda de&gbreve;il &#129394;'
  }
};

async function fetchAdamiz() {
  const adamizServiceURL = 'https://4s7kcwiwv2.execute-api.us-east-1.amazonaws.com/dev/get-adamiz';
  try {
    const response = await fetch(adamizServiceURL);
    if( response.ok ){
      const data = await response.json();
      return data.message === 'ADAMIZDA' ? 'adamizda' : 'adamizda-degil';
    } else {
      console.error('HTTP Response not OK', response);
    }
  } catch( error ) {
    console.error('Fetch failed', error);
  }

  // On failure, Mehmet adamizda.
  return 'adamizda';
}

export default async (request, context) => {
  const adamizdami = await fetchAdamiz();
  const response = await context.next();
  const page = await response.text();
  const inAdamiz = adamizdami === "adamizda";

  const replacedPage = Object.entries(replacements).reduce((prev, entry) => {
    const [key, values] = entry;
    return prev.replace(key, values[adamizdami])
  }, page);

  return new Response(
    replacedPage,
    response
  );
};
