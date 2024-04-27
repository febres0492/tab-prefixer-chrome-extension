// Listener for keyboard shortcut (Ctrl+Shift+Y)
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
        e.preventDefault(); // Prevent the default action (refresh)

        const newPrefix = prompt("Enter a new prefix to be saved, or type 'delete' to remove the existing prefix:");
        if (newPrefix.trim().toLowerCase() === 'delete') {
            localStorage.removeItem('customPrefix');
            alert("Saved prefix has been deleted.");
        } else if (newPrefix !== null && newPrefix.trim() !== '') {
            localStorage.setItem('customPrefix', newPrefix.trim());
        }
        // Reapply the title to reflect the new or deleted prefix
        setTitle();
    }
});

// Listen for messages from the background script or popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "updateTitle" && request.prefix) {
        // Apply the prefix to the current page's title
        document.title = `${request.prefix} / ${document.title}`;
        sendResponse({status: "Title updated"});
    }
});

// Function to send messages to the background script if needed
function reportBackToBackground(info) {
    chrome.runtime.sendMessage({command: "reportBack", data: info}, response => {
        console.log("Response from background:", response);
    });
}

function setTitle() {
    const savedPrefix = localStorage.getItem('customPrefix');
    let prefix;
    if (savedPrefix) {
        prefix = savedPrefix;
    } else {
        // Use the first part of the hostname as the prefix
        const domainParts = window.location.hostname.split('.');
        prefix = domainParts[0] === 'www' ? domainParts[1] : domainParts[0];
    }
    updateTitle(prefix);
}

function updateTitle(prefix) {
    let originalTitle = document.title;
    // Check if the prefix is already set to prevent duplicating it
    if (!originalTitle.startsWith(prefix + ' / ')) {
        document.title = prefix + ' / ' + originalTitle;
    }
}