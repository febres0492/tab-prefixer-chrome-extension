chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the tab's URL is accessible and not a restricted URL like chrome://
    if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            function: injectSetTitleScript
        });
    }
});;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // handle message
    console.log(request);
});


// Function to update the tab title
function updateTitle(prefix) {
    console.log('updateTitle', prefix)
    let originalTitle = document.title;
    if (!originalTitle.startsWith(prefix + ' / ')) {
        document.title = prefix + ' / ' + originalTitle;
    }
}

// Function to determine and set the tab title
function setTitle() {
    const domain = window.location.hostname;
    chrome.storage.local.get([domain], function(result) {
        const domainPrefix = result[domain] || getDomainPrefix(domain);
        updateTitle(domainPrefix);
    });
}

// Utility function to extract or default the domain prefix
function getDomainPrefix(domain) {
    const domainParts = domain.split('.');
    return domainParts[0] === 'www' ? domainParts[1] : domainParts[0];
}

// Function to save a prefix for a specific domain using chrome.storage
function savePrefixForDomain(domain, prefix) {
    let obj = {};
    obj[domain] = prefix;
    chrome.storage.local.set(obj);
}

function injectSetTitleScript() {
    const delay = 500;

    function observeTitleChanges() {
        const titleElement = document.querySelector('title');
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    setTimeout(setTitle, delay);
                }
            });
        });
        observer.observe(titleElement, { childList: true, characterData: true, subtree: true });
    }

    setTimeout(setTitle, delay);
    observeTitleChanges();

    window.addEventListener('pageshow', function() {
        setTimeout(setTitle, delay);
    });

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

