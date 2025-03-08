document.getElementById("toggle").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            document.designMode = document.designMode === "on" ? "off" : "on";
            alert(`Edit Mode: ${document.designMode}`);
        }
    });
});