import './style.css';
import './modules/actions.js'
import {markPage} from "./modules/DOMManipulations.js";


document.getElementById("mark-webpage-button").addEventListener("click", async () => {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);

    chrome.tabs.sendMessage(tab.id, {
        command: "MARK_PAGE"
    }, function (msg) {
        console.log("result message:", msg);
    });
})