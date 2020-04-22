// var images = document.getElementsByTagName('img');
// for (var i = 0, l = images.length; i < l; i++) {
//   images[i].src = 'http://placekitten.com/' + images[i].width + '/' + images[i].height;
// }

chrome.runtime.onInstalled.addListener(function () {
  console.log("Google chrome PowerApps style extension initialized");
});

let matches = ["https://us.create.powerapps.com/studio/#",
"*://us.create.powerapps.com/studio/#" ]
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    for (let i in matches) {
        if (tab.url.includes(matches[i])) {
            chrome.pageAction.show(tabId)
            break
        }
    }
})

