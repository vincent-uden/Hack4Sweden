if (document.location.href.includes("facebook.com")) {
    setTimeout(REPORTICLE_tagbook, 3000);
}

function REPORTICLE_tagbook() {
    // const p = document.querySelectorAll('[role="article"]');
    // console.log(p);
    // let posts = []
    // for (let po of p) {
    //     // console.log(po);
    //     if (po.id != "") {
    //         posts.push(po);
    //     }
    // }
    // console.log(posts);
    let po = document.getElementsByClassName("userContentWrapper");
    let posts = [];
    for (let p of po) {
        if (p.querySelectorAll('[rel="nofollow"]').length > 0) {
            if (p.getElementsByClassName("REPORTICLE_FACEBOOK_DIV").length == 0) {
                posts.push(p);
            }
        }
    }

    // console.log("posts:", posts);
    for (let p of posts) {
        let url = p.querySelectorAll('[rel="nofollow"]')[0].href;
        url = url.split("u=")[1];
        url = url.split("%3F")[0];
        url = decodeURIComponent(url);

        console.log(p.querySelectorAll('[rel="nofollow"]')[0]);

        const warning = REPORTICLE_cEl("div");
        // warning.innerHTML = "Warning! FAKE NEWS!!!!";
        // warning.style = "color: red;";
        // warning.id = "REPORTICLE_WARNING_MESSAGE";
        warning.classList.add("REPORTICLE_FACEBOOK_DIV");
        p.insertBefore(warning, p.childNodes[1]);

        REPORTICLE_getReports(url, REPORTICLE_facebookCallback, warning, url);

        

        REPORTICLE_addView(url);
        console.log("URL:", url); 
    }
    
    setTimeout(REPORTICLE_tagbook, 1500);
}

function REPORTICLE_facebookCallback(reports, element, url) {
    // console.log("Reports: ", reports);
    let text;
    if (reports == null || reports.views == 0) {
        text = "This article has not been rated yet";
    } else {
        const percent = Math.floor(reports.reports/reports.views * 100 + 0.5)
        // console.log(percent);
        text = reports.reports + " out of " + reports.views + " (" + percent + "%) have reported this article";
    }
    
    REPORTICLE_inject(text, null, element, url);  
}