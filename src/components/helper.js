export async function getTranslations(listToTranslate, translateTo) {
    try {
      let translationList = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${translateTo}`, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': '',
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(listToTranslate)
        });
      return await translationList.json();
    } catch(error) {
        console.log(error.message)
        return error.message;
    }
}
