const REPORTICLE_OUR_URL = "http://localhost:9292";

// Gets the reports from the server (database)
function REPORTICLE_getReports(url, callback, transfer, transfer2) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", REPORTICLE_OUR_URL + "/reports");
    xhr.setRequestHeader("REPORT_URL", url);
    xhr.onerror = () => alert("Could not reach server");
    xhr.onload = () => {
        if (xhr.status == 200) {
            const response = xhr.response;
            console.log(xhr.status, response);
            callback(JSON.parse(response), transfer, transfer2);
        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

// Send a report about a url (an article) being fake
function REPORTICLE_report(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", REPORTICLE_OUR_URL + "/add_report");
    xhr.setRequestHeader("REPORT_URL", url);
    xhr.onerror = () => alert("Could not reach server");
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                alert("Thank you! Your report has been sent.");
            } else {
                alert("Error " + xhr.status);
            }
        }
    };
    xhr.send();
}


// Adds a view to the database to be able to compare it with the reports
function REPORTICLE_addView(url) {
    const msg = {
        "title": document.title,
        "url": url
    };

    const xhr = new XMLHttpRequest();
    xhr.open("post", REPORTICLE_OUR_URL + "/add_view");
    xhr.onerror = () => console.error("Could not reach server");
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("View registered");
        } else {
            console.error("Error " + xhr.status);
        }
    };
    xhr.send(JSON.stringify(msg));
}