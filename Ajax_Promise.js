function showTime() {
    const date = new Date();
    return date.getHours() + " Hrs : " + date.getMinutes() + " Minutes : " + date.getSeconds() + " Seconds ";
}

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            //console.log(methodType+" State Change called at: "+showTime()+" RS: "+ xhr.readyState+" Status: "+xhr.status);
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 201) {
                    resolve(xhr.responseText);
                } else if (xhr.status >= 400) {
                    reject({
                        status: xhr.status,
                        statusText: xhr.statusText
                    });
                    console.log("XHR Failed");
                    console.log("Handle 400 Client Error or 500 Server Error at : " + showTime());
                }
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else
            xhr.send();
        console.log(methodType + " request sent to server at " + showTime());
    });
}

const getURL = "http://127.0.0.1:3000/employees/1";
makePromiseCall("GET", getURL, true).then(responseText => {
        console.log("Get user data at: " + showTime() + ": data : " + responseText);
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));
console.log("Made GET AJAX call to server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false).then(responseText => {
        console.log("User deleted at: " + showTime() + ": data : " + responseText);
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));
console.log("Made DELETE AJAX call to server at " + showTime());

const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Harry", "salary": 500000 };
makePromiseCall("POST", postURL, true, emplData).then(responseText => {
        console.log("User Added at: " + showTime() + ": data : " + responseText);
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));
console.log("Made POST AJAX call to server at " + showTime());