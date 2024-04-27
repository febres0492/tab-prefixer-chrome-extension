// Simplified selector function
function S(selector) {
    return document.querySelector(selector);
}

S('#btn-add').addEventListener('click', () => {
    const prefix = S('#prefix-input').value;
    console.log('btn-add', prefix)
    if(!prefix.length){return}
    chrome.runtime.sendMessage({command: "add", prefix: prefix});
});

S('#btn-delete').addEventListener('click', () => {
    chrome.runtime.sendMessage({command: "delete"});
});

S('#btn-pause-on-current').addEventListener('click', () => {
    chrome.runtime.sendMessage({command: "pauseCurrent"});
});

S('#btn-pause-on-all').addEventListener('click', () => {
    chrome.runtime.sendMessage({command: "pauseAll"});
});




// document.getElementById('openWindow').addEventListener('click', function() {
//     window.open('https://example.com', '_blank', 'width=800,height=600');
// });


// S("#btn-add")[0].addEventListener("click", ()=> {
//     var value = S("#input-add")[0].value;
//     if (value) {
//         setTitle(value)
//     }
// });

// function setTitle(value = null) {
//     const domain = window.location.hostname;
//     chrome.storage.local.get([domain], function(result) {
//         let domainPrefix = result[domain] || getDomainPrefix(domain);
//         if (value) {
//             domainPrefix = value;
//             savePrefixForDomain(domain, value);
//         }
//         updateTitle(domainPrefix);
//     });
// }