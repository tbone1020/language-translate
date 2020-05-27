import mockTranslation from '../data/mockTranslation.json';

export default class API {
    static URL = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en';

    static async getTranslations(listToTranslate, translateTo) {
        try {
            let translationsResponse = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${translateTo}`, this.getAPIReqestOptions());
            if (translationsResponse.status >= 200 && translationsResponse.status <= 299) {
                return await translationsResponse.json();
            } else {
                throw `Error with API Call: ${translationsResponse.status} ${this.getErrorType(translationsResponse.status)}`;
            }
        } catch (errorMessage) {
            throw errorMessage;
        }
    }

    static getMockTranslations () {
        return mockTranslation;
    }

    static getErrorType = (status) => {
        let codeType = status.toString().split('')[0];
        const errorCode = {
            "4": "Bad Request. Check API URL or translation input",
            "5": "Internal Server Error"
        }
        return errorCode[codeType];
    } 

    static getAPIReqestOptions = (listToTranslate) => {
        return {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': 'f44ce021bfa54ac9aa855d71b5250cae',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(listToTranslate)
        }
    }
}