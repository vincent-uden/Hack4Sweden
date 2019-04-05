function sendRequest() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "/reports", true);
    xmlHttp.setRequestHeader("REPORT_URL", 
        "https://reddit.com/r/LateStageCapitalism"
    );
    xmlHttp.onload = function(e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                console.log(xmlHttp.responseText);
            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
    xmlHttp.onerror = function(e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send();
}

function addReport() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/add_report", true);
    xmlHttp.setRequestHeader("REPORT_URL", 
        "https://www.reddit.com/r/worldnews/comments/b9c5nd/when_mueller_submitted_his_report_on_russian/"
    );
    xmlHttp.onload = function(e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                console.log(xmlHttp.responseText);
            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
    xmlHttp.onerror = function(e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send();
}

function addView() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "/add_view", true);
    xmlHttp.setRequestHeader("VIEW_URL", 
        "https://reddit.com/r/socialism"
    );
    xmlHttp.setRequestHeader("VIEW_TITLE", 
        "Socialism"
    );
    xmlHttp.onload = function(e) {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                console.log(xmlHttp.responseText);
            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
    xmlHttp.onerror = function(e) {
        console.error(xmlHttp.statusText);
    };
    xmlHttp.send();
}

const stats_url = "/stats";
const github_url = "https://github.com/vincent-uden/Hack4Sweden";

function navigate(url) {
    window.location.href = url;
}
