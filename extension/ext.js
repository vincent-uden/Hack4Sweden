// CHANGE ALL FUNCTION NAMES TO HAVE THE EXTENSION NAME PREFIXED

let REPORTICLE_currentURL = document.location.href;
setTimeout(REPORTICLE_view, 1000);

function REPORTICLE_view() {
    if (REPORTICLE_currentURL == document.location.href) {
        REPORTICLE_addView(REPORTICLE_currentURL);
        REPORTICLE_load();
    }
}

function REPORTICLE_load() {
    const url = document.location.href;
    // const reports = NAME_getReports(url);
    const reports = {
        "views": 400,
        "reports": 39,
        "percent": 10,
        "recommendations": [
            {
                "url": "https://www.google.com",
                "title": "Google"
            },
            {
                "url": "https://www.bing.com",
                "title": "Bing"
            }
        ]
    };

    if (reports) {
        let text;
        if (reports.views == 0) {
            "This article has not been rated yet";
        } else {
            text = reports.reports + " out of " + reports.views + " (" + reports.percent + "%) have reported this article";
        }

        REPORTICLE_inject(text, reports.recommendations);
    }
}

function REPORTICLE_cEl(type) {
    return document.createElement(type);
}


function REPORTICLE_inject(text, recommendations) {
    const div = REPORTICLE_cEl("div");
    div.id = "EXTENSION_WHOO_DIV";
    div.style = "width: 100%; background-color: #313131; padding: 15px; font-family: sans-serif; display:flex; flex-direction: row";
    const div2 = REPORTICLE_cEl("div");
    div2.id = "EXTENSION_WHOO_DIV2";
    const div3 = REPORTICLE_cEl("div");
    div3.id = "EXTENSION_WHOO_DIV3";
    div3.style = "padding: 5px; align-content: center;";

    const parag = REPORTICLE_cEl("h4");
    parag.innerHTML = text;
    parag.style = "color: white; margin-bottom: 5px;";
    const rdown = REPORTICLE_cEl("h6");
    rdown.innerHTML = "Report for being factually incorrect";
    rdown.style = "background-color: red; cursor: pointer; padding: 5px; color: white;";
    rdown.onclick = rateDown;

    const srcTitle = REPORTICLE_cEl("h6");
    srcTitle.innerHTML = "Other sources";
    srcTitle.style = "color: white;";
    const table = REPORTICLE_cEl("table");
    table.style = "padding: 5px;"
    for (let rec of recommendations) {
        const tr = REPORTICLE_cEl("tr");
        const link = REPORTICLE_cEl("a");
        link.innerHTML = rec.title;
        link.href = rec.url;
        tr.appendChild(link)
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

function REPORTICLE_deleteInjection() {
    const div = document.getElementById("EXTENSION_WHOO_DIV");
    div.parentNode.removeChild(div);
}

function REPORTICLE_rateUp() {
    console.log("UP!");
    REPORTICLE_deleteInjection();
}

function rateDown() {
    console.log("DOWN!");
    REPORTICLE_deleteInjection();
}