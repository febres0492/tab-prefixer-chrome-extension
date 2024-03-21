chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: setTitle
        });
    }
});

function setTitle() {
    const delay = 500; // Set delay as constant

    // Function to update the tab title
    function updateTitle(prefix) {
        let originalTitle = document.title;
        // Check if the prefix is already set to prevent duplicating it
        if (!originalTitle.startsWith(prefix + ' / ')) {
            document.title = prefix + ' / ' + originalTitle;
        }
    }

    // Function to determine and set the tab title
    function setTitle() {
        const savedPrefix = localStorage.getItem('customPrefix');
        let prefixToUse;
        if (savedPrefix) {
            prefixToUse = savedPrefix;
        } else {
            // Use the first part of the hostname as the prefix
            const domainParts = window.location.hostname.split('.');
            const firstPart = domainParts[0];
            prefixToUse = firstPart;
        }
        updateTitle(prefixToUse);
    }

    // Delay setting the title until 1 second after the page load completes
    setTimeout(setTitle, delay);

    // Also consider pageshow for SPA and cached pages
    window.addEventListener('pageshow', function() {
        setTimeout(setTitle, delay);
    });

    // Monitor for history changes
    (function(history){
        const pushState = history.pushState;
        const replaceState = history.replaceState;

        history.pushState = function() {
            pushState.apply(history, arguments);
            setTimeout(setTitle, delay); // Update title on pushState
        };

        history.replaceState = function() {
            replaceState.apply(history, arguments);
            setTimeout(setTitle, delay); // Update title on replaceState
        };
    })(window.history);

    window.onpopstate = function(event) {
        setTimeout(setTitle, delay); // Delayed call after popstate event
    };
}
