const OUR_URL = "http://localhost:9292";
// Add the correct paths

function REPORTICLE_getReports(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("get", OUR_URL + "/reports");
    xhr.setRequestHeader("REPORT_URL", url);
    xhr.onerror = () => alert("Could not reach server");
    xhr.onload = () => {
        if (xhr.status == 200) {
            const response = xhr.response;
            console.log(xhr.status, response);
            return JSON.parse(response);
        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

function REPORTICLE_report(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", OUR_URL + "/add_report");
    xhr.setRequestHeader("REPORT_URL", url);
    xhr.onerror = () => alert("Could not reach server");
    xhr.onload = () => {
        if (xhr.status == 200) {
            alert("Thank you!");
        } else {
            alert("Error " + xhr.status);
        }
    };
    xhr.send();
}

function REPORTICLE_addView(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", OUR_URL + "/add_view");
    xhr.setRequestHeader("VIEW_URL", url);
    xhr.setRequestHeader("VIEW_TITLE", document.title);
    xhr.onerror = () => console.error("Could not reach server");
    xhr.onload = () => {
        if (xhr.status == 200) {
            console.log("View registered");
        } else {
            console.error("Error " + xhr.status);
        }
    };
    xhr.send();
}