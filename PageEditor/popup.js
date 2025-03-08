document.getElementById("toggle").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: () => {
            document.designMode = document.designMode === "on" ? "off" : "on";

            // Evaluamos después de cambiar document.designMode
            let newStatus = document.designMode === "on" ? "Disable" : "Enable";
            chrome.runtime.sendMessage({ status: newStatus });
        }
    });
});

// Escuchar el mensaje y actualizar el botón
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById("toggle").innerText = message.status;
});
