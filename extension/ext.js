let REPORTICLE_currentURL = document.location.href;
let REPORTICLE_COUNTER = 0;
setTimeout(REPORTICLE_view, 1000);

function REPORTICLE_view() {
    if (REPORTICLE_currentURL == document.location.href) {
        const url = document.location.href;
        if (!url.includes("www.facebook.com")) {
            REPORTICLE_getReports(url, REPORTICLE_reportsCallback);
            setTimeout(() => REPORTICLE_addView(REPORTICLE_currentURL), 500);
        }
        // REPORTICLE_load();
    }
}

// function REPORTICLE_load() {
    
    
//     // const reports = {
//     //     "views": 400,
//     //     "reports": 39,
//     //     "percent": 10,
//     //     "recommendations": [
//     //         {
//     //             "url": "https://www.google.com",
//     //             "title": "Google"
//     //         },
//     //         {
//     //             "url": "https://www.bing.com",
//     //             "title": "Bing"
//     //         }
//     //     ]
//     // };
    
// }

function REPORTICLE_reportsCallback(reports) {
    console.log("Reports: ", reports);
    let text;
    if (reports == null || reports.views == 0) {
        text = "This article has not been rated yet";
    } else {
        const percent = Math.floor(reports.reports/reports.views * 100 + 0.5)
        console.log(percent);
        text = reports.reports + " out of " + reports.views + " (" + percent + "%) have reported this article";
    }

    // REPORTICLE_inject(text, reports.recommendations);
    REPORTICLE_inject(text, false);
}

function REPORTICLE_cEl(type) {
    return document.createElement(type);
}


function REPORTICLE_inject(text, recommendations, element, url) {
    if (!url) {
        url = document.location.href;
    }
    const id = "REPORTICLE_EXT_DIV-" + REPORTICLE_COUNTER++;

    const div = REPORTICLE_cEl("div");
    div.id = id;
    div.style = "width: 100%; background-color: #313131; padding: 15px; font-family: sans-serif; display:flex; flex-direction: row";
    const div2 = REPORTICLE_cEl("div");
    // div2.id = "REPORTICLE_EXT_DIV2";
    const div3 = REPORTICLE_cEl("div");
    // div3.id = "REPORTICLE_EXT_DIV3";
    div3.style = "padding: 5px; align-content: center;";

    const parag = REPORTICLE_cEl("h4");
    parag.innerHTML = text;
    parag.style = "color: white; margin-bottom: 5px;";
    const rdown = REPORTICLE_cEl("h6");
    rdown.innerHTML = "Report for being factually incorrect";
    rdown.style = "background-color: red; cursor: pointer; padding: 5px; color: white;";
    rdown.onclick = () => REPORTICLE_reportArticle(id, url);

    if (recommendations) {
        const srcTitle = REPORTICLE_cEl("h6");
        srcTitle.innerHTML = "Other sources";
        srcTitle.style = "color: white;";
        const table = REPORTICLE_cEl("table");
        table.style = "padding: 5px;"
        for (let rec of recommendations) {
            const tr = REPORTICLE_cEl("tr");
            const link = REPORTICLE_cEl("a");
            link.innerHTML = rec.name;
            link.href = rec.url;
            tr.appendChild(link)
            table.appendChild(tr);
        }
        div3.appendChild(srcTitle);
        div3.appendChild(table);
    }

    div2.appendChild(parag);
    div2.appendChild(rdown);

    div.appendChild(div2);
    div.appendChild(div3);

    if (element) {
        element.appendChild(div, element);
    } else {
        const body = document.querySelector("body");
        body.insertBefore(div, body.children[0]);
    }
    
    console.log("inject");
}

function REPORTICLE_deleteInjection(id) {
    console.log(id);
    const div = document.getElementById(id);
    div.parentNode.removeChild(div);
}

function REPORTICLE_reportArticle(id, url) {
    console.log("DOWN!");
    REPORTICLE_deleteInjection(id);
    REPORTICLE_report(url);
}