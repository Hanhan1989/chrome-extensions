document.getElementById("toggle").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            document.designMode = document.designMode === "on" ? "off" : "on";
            let newStatus = document.designMode === "on" ? "Disable" : "Enable";
            chrome.runtime.sendMessage({ status: newStatus });
        }
    });
});

// Function to check designMode status and update the button
async function updateButtonStatus() {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            let newStatus = document.designMode === "on" ? "Disable" : "Enable";
            chrome.runtime.sendMessage({ status: newStatus });
        }
    });
}

// Listen for messages and update the button text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById("toggle").innerText = message.status;
});

// Detect when the tab gains focus and update the button status
chrome.tabs.onActivated.addListener(updateButtonStatus);
chrome.windows.onFocusChanged.addListener(updateButtonStatus);
