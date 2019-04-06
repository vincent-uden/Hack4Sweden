let REPORTICLE_currentURL = document.location.href;
let REPORTICLE_COUNTER = 0; // For display IDs
setTimeout(REPORTICLE_view, 1000); // Wait for the page to load a bit more

// Main function
// Checks if and how it should display warnings
function REPORTICLE_view() {
    const url = document.location.href;
    if (REPORTICLE_currentURL == url) {
        if (!url.includes("www.facebook.com") && document.location.pathname != "/") {
            // Normal articles, one warning at the top of the page
            REPORTICLE_getReports(url, REPORTICLE_reportsCallback);
            setTimeout(() => REPORTICLE_addView(REPORTICLE_currentURL), 500);
        }
    }
    if (url.includes("facebook.com")) {
        // Facebook, one warning per link post
        REPORTICLE_tagbook();
    }
}

// Callback for when the article reports are received from the server
// Formats the data for display
function REPORTICLE_reportsCallback(reports) {
    // console.log("Reports: ", reports);
    let text;
    if (reports == null || reports.views == 0) {
        text = "This article has not been rated yet";
    } else {
        const percent = Math.floor(reports.reports/reports.views * 100 + 0.5)
        // console.log(percent);
        text = reports.reports + " out of " + reports.views + " (" + percent + "%) have reported this article";
    }

    console.log("Recommendations:", reports.recommendations);
    REPORTICLE_inject(text, reports.recommendations);
    // REPORTICLE_inject(text, false);
}

// Short function for document.createElement()
function REPORTICLE_cEl(type) {
    return document.createElement(type);
}

// Function for injecting the warnings into the pages
// element and url are only used on facebook where it's not placed in the body
function REPORTICLE_inject(text, recommendations, element, url) {
    if (!url) {
        url = document.location.href;
    }
    const id = "REPORTICLE_EXT_DIV-" + REPORTICLE_COUNTER++;

    // Create the main divs
    const div = REPORTICLE_cEl("div");
    div.id = id;
    div.style = "width: 100%; background-color: #A8DADC; font-family: sans-serif; display:flex; flex-direction: row;";
    const div2 = REPORTICLE_cEl("div");
    div2.id = "REPORTICLE_EXT_DIV2";
    const div3 = REPORTICLE_cEl("div");
    div3.id = "REPORTICLE_EXT_DIV3";
    div3.style = "padding: 5px; align-content: center;";

    // The warning text and report button
    const parag = REPORTICLE_cEl("h4");
    parag.innerHTML = text;
    parag.style = "color: #1D3537; margin-top: 15px; margin-left: 15px;";
    const rdown = REPORTICLE_cEl("h6");
    rdown.innerHTML = "Report for being factually incorrect";
    rdown.style = "background-color: #E63946; cursor: pointer; padding: 5px; color: white; border-radius: 10px; border: 5px solid #E63946; display: inline-block; box-shadow: 0px 2px 5px 0px #00000057; margin-left: 15px; margin-bottom: 15px; margin-top: 5px;";
    rdown.onclick = () => REPORTICLE_reportArticle(id, url);

    if (recommendations.length > 0) {
        const srcTitle = REPORTICLE_cEl("h6");
        srcTitle.innerHTML = "Related articles";
        // srcTitle.style = "color: white;";
        const table = REPORTICLE_cEl("table");
        table.style = "padding: 5px;";
        // Create table with all recommendations
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

// Remove the warning when clicked on report
function REPORTICLE_deleteInjection(id) {
    console.log(id);
    const div = document.getElementById(id);
    div.parentNode.removeChild(div);
}

// function called when pressing report button
function REPORTICLE_reportArticle(id, url) {
    console.log("DOWN!");
    REPORTICLE_deleteInjection(id);
    REPORTICLE_report(url);
}
