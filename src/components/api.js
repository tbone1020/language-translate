export const getTranslations = async (listToTranslate, translateTo) => {
    // A promise catch is required.
    // https://www.valentinog.com/blog/throw-async/#how-to-throw-errors-from-async-functions-in-javascript-wrapping-up
    try {
        const REQUEST_URL = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${translateTo}`;
        let response = await fetch('https://jsonplaceholder.typicode.com/todos/'); // , apiRequestOptions(listToTranslate)
        if (response.status !== 200) throw `Error with API Call: ${response.status} ${getErrorType(response.status)}`;
        return await response.json();
    } catch (e) {
        throw e;
    }
}

const getErrorType = (status) => {
    let codeType = status.toString().split('')[0];
    const errorCode = {
        "4": "Not Found",
        "5": "Bad Request"
    }
    return errorCode[codeType];
} 

const apiRequestOptions = (listToTranslate) => {
    return {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': 'f44ce021bfa54ac9aa855d71b5250cae',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(listToTranslate)
    }
}
