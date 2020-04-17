export async function getTranslations(listToTranslate) {
    try {
        let translationList = await fetch(`https://jsonplaceholder.typicode.com/photos`);
        return await translationList.json();
    } catch(error) {
        return error.message;
    }
}
