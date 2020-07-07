import mockTranslation from '../data/mockTranslation.json';

export default class API {

    static async getTranslations(listToTranslate, translateTo) {
        const completedTranslationList = [];
        for (let i = 0; i < listToTranslate.length; i++) {
            try {
                let translationsResponse = await fetch(`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=${translateTo}`, this.getAPIReqestOptions(listToTranslate[i]));
                let parsedResponse = await translationsResponse.json();
                if (translationsResponse.status < 200 || translationsResponse.status > 299) throw `Status: ${translationsResponse.status}. ${parsedResponse.error.message}`;
                completedTranslationList.push(parsedResponse);
            } catch (errorMessage) {
                return {
                    response: errorMessage,
                    isSuccessful: false
                }
            }
        }
        return {
            response: completedTranslationList,
            isSuccessful: true
        }
    }


    static async getMockTranslations () {
        return {
            response: mockTranslation,
            isSuccessful: true
        };
    }

    static getAPIReqestOptions = (listToTranslate) => ({
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': '',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(listToTranslate)
    })
}