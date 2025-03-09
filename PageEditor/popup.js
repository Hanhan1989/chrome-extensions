class DesignModeToggler {
    constructor(buttonId) {
        this.button = document.getElementById(buttonId);
        this.init();
    }

    async toggleDesignMode() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                document.designMode = document.designMode === "on" ? "off" : "on";
                let newStatus = document.designMode === "on" ? "Disable" : "Enable";
                chrome.runtime.sendMessage({ status: newStatus });
            }
        });
    }

    async updateButtonStatus() {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                let newStatus = document.designMode === "on" ? "Disable" : "Enable";
                chrome.runtime.sendMessage({ status: newStatus });
            }
        });
    }

    handleStatusMessage(message) {
        this.button.innerText = message.status;
    }

    init() {
        this.button.addEventListener("click", () => this.toggleDesignMode());
        chrome.runtime.onMessage.addListener((message) => this.handleStatusMessage(message));
        chrome.tabs.onActivated.addListener(() => this.updateButtonStatus());
        chrome.windows.onFocusChanged.addListener(() => this.updateButtonStatus());
    }
}

// Initialize the toggler
new DesignModeToggler("toggle");
