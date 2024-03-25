chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab's URL is accessible and not a restricted URL like chrome://
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: injectSetTitleScript
        });
    }
});;

function injectSetTitleScript() {
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
