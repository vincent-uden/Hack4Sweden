// Main function for facebook
function REPORTICLE_tagbook() {
    // Extracts the post divs
    let po = document.getElementsByClassName("userContentWrapper");
    let posts = [];
    for (let p of po) {
        // Only includes the ones with a link outside of facebook
        if (p.querySelectorAll('[rel="nofollow"]').length > 0) {
            // Prevent duplicates
            if (p.getElementsByClassName("REPORTICLE_FACEBOOK_DIV").length == 0) {
                posts.push(p);
            }
        }
    }

    // Go through the posts
    for (let p of posts) {
        // Remove the extra facebook stuff from the link
        let url = p.querySelectorAll('[rel="nofollow"]')[0].href;
        url = url.split("u=")[1];
        url = url.split("%3F")[0];
        url = decodeURIComponent(url);

        // Create a div between the main part and the comments
        const warning = REPORTICLE_cEl("div");
        warning.classList.add("REPORTICLE_FACEBOOK_DIV");
        p.insertBefore(warning, p.childNodes[1]);

        REPORTICLE_getReports(url, REPORTICLE_facebookCallback, warning, url);

        REPORTICLE_addView(url);
        console.log("URL:", url); 
    }
    // Check again because facebook updates dynamically
    setTimeout(REPORTICLE_tagbook, 1500);
}

// Callback when reports are received
// Formats the data
function REPORTICLE_facebookCallback(reports, element, url) {
    let text;
    if (reports == null || reports.views == 0) {
        text = "This article has not been rated yet";
    } else {
        const percent = Math.floor(reports.reports/reports.views * 100 + 0.5)
        text = reports.reports + " out of " + reports.views + " (" + percent + "%) have reported this article";
    }
    
    REPORTICLE_inject(text, reports.recommendations, element, url);  
}