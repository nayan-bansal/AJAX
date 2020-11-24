function showTime() {
    const date = new Date();
    return date.getHours() + " Hrs : " + date.getMinutes() + " Minutes : " + date.getSeconds() + " Seconds ";
}

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        //console.log(methodType + " State changed called. Ready state : " + xhr.readyState + " Status : " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
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
    console.log(methodType + " request sent to the server");
}

const getURL = "http://127.0.0.1:3000/employees/1";

function getUserDetails(data) {
    console.log("Get user data at: " + showTime() + ": data : " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX call to server at " + showTime());

const deleteURL = "http://localhost:3000/employees/4";

function userDeleted(data) {
    console.log("User deleted at: " + showTime() + ": data : " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX call to server at " + showTime());

const postURL = "http://localhost:3000/employees/";

const emplData = { "name": "Harry", "salary": 500000 };

function userAdded(data) {
    console.log("User Added at: " + showTime() + ": data : " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
console.log("Made POST AJAX call to server at " + showTime());