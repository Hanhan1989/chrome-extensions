document.getElementById("toggle").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            document.designMode = document.designMode === "on" ? "off" : "on";
            let status = document.designMode === "on" ? "Disable" : "Enable";
            chrome.runtime.sendMessage({ status });
        }
    });
});

// Escuchar el mensaje y actualizar el botón
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById("toggle").innerText = message.status;
});
