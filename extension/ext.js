// CHANGE ALL FUNCTION NAMES TO HAVE THE EXTENSION NAME PREFIXED

NAME_load();
let currentURL = document.location.href;
setTimeout(NAME_view, 10000);

function NAME_view() {
    if (currentURL == document.location.href) {
        NAME_addView(currentURL);
    }
}

function NAME_load() {
    const url = document.location.href;
    // const reports = NAME_getReports(url);
    const reports = {
        "views": 400,
        "reports": 39,
        "percent": 10,
        "recommendations": [
            "www.google.com",
            "www.bing.com"
        ]
    };

    if (reports) {
        let text;
        if (reports.views == 0) {
            "This article has not been rated yet";
        } else {
            text = reports.reports + " out of " + reports.views + " (" + reports.percent + "%) have reported this article";
        }

        inject(text, reports.recommendations);
    }
}

function cEl(type) {
    return document.createElement(type);
}


function inject(text, recommendations) {
    const div = document.createElement("div");
    div.id = "EXTENSION_WHOO_DIV";
    div.style = "width: 100%; background-color: #313131; padding: 15px; font-family: sans-serif; display:flex; flex-direction: row";
    const div2 = document.createElement("div");
    div2.id = "EXTENSION_WHOO_DIV2";
    const div3 = document.createElement("div");
    div3.id = "EXTENSION_WHOO_DIV3";
    div3.style = "padding: 5px; align-content: center;";

    const parag = document.createElement("h4");
    parag.innerHTML = text;
    parag.style = "color: white; margin-bottom: 5px;";
    const rdown = document.createElement("h6");
    rdown.innerHTML = "Report for being factually incorrect";
    rdown.style = "background-color: red; cursor: pointer; padding: 5px; color: white;";
    rdown.onclick = rateDown;

    const srcTitle = document.createElement("h6");
    srcTitle.innerHTML = "Other sources";
    srcTitle.style = "color: white;";
    const table = cEl("table");
    for (let rec of recommendations) {
        const tr = cEl("tr");
        tr.innerHTML = rec;
        table.appendChild(tr);
    }

    div2.appendChild(parag);
    div2.appendChild(rdown);

    div3.appendChild(srcTitle);
    div3.appendChild(table);

    div.appendChild(div2);
    div.appendChild(div3);

    const body = document.querySelector("body");
    body.insertBefore(div, body.children[0]);
    console.log("inject");
}

function deleteInjection() {
    const div = document.getElementById("EXTENSION_WHOO_DIV");
    div.parentNode.removeChild(div);
}

function rateUp() {
    console.log("UP!");
    deleteInjection();
}

function rateDown() {
    console.log("DOWN!");
    deleteInjection();
}