
// if (typeof XMLHttpRequest === 'undefined') {
//     var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// }
//
if (typeof window !== "undefined" && !window.XMLHttpRequest) // code for IE6, IE5
    XMLHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");

import { AbortablePromise } from "./utils";

export default function fetcher (method, url, data) {

    let xhr = new XMLHttpRequest();
    let a = [];
    xhr.open(method, url, true);

    let promise = new AbortablePromise((resolve, response) => {

        let res = {};
        xhr.onreadystatechange = () => {

            // Test if request is complete
            if (xhr.readyState == 4) {

              // Safari doesn't support xhr.responseType = 'json'
              // so the response is parsed
              if (xhr.status>=200 && xhr.status<300) {
                try {
                  res.data = JSON.parse(xhr.responseText);
                } catch (e) {
                  res = {};
                }
                resolve(res);
              }
            }
        };

        xhr.send(data);

    });

    promise.setAbort(() => xhr.abort());

    return promise;

}
