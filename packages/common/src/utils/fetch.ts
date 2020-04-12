export function getJSON (jsonpath) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                let json = null
                try {
                    resolve(JSON.parse(xhr.responseText))
                } catch (error) {
                    reject(error)
                }
                resolve()
            }
        }
        xhr.open('GET', jsonpath, true);
        xhr.send(null);
    })
}