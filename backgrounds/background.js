// chrome.runtime.onMessage.addListener(function(request, sender) {
//   chrome.tabs.update(sender.tab.id, {url: requrest.redirect});
// })

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // Send a message to the active tab
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     var activeTab = tabs[0];
//     chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
//   });
// });

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     if(request.message === 'open_new_tab') {
//       chrome.tabs.create({"url": request.url});
//     }
//   }
// );
//
//


chrome.storage.local.set({"block_url": ["https://www.youtube.com/*", "https://www.reddit.com/*"]});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

    chrome.storage.local.get("block_url", function(result){

      let resultArr = result.block_url;
      resultArr.forEach(function(oneUrl){

        let testUrl = new RegExp(oneUrl);
        if (testUrl.test(tab.url)) {
          chrome.tabs.update({url: "../options/options.html"});
          window.close();
        }
      });
    });
});


// localStorage["block_url"] = "https://www.youtube.com/*";
// var testUrl = new RegExp(localStorage.block_url);

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//               if (testUrl.test(tab.url)) {
//                 chrome.tabs.update({url: "../options/options.html"});
//                 window.close();
//               }
// })

// chrome.tabs.onActivated.addListener(function(tab) {
//   chrome.tabs.get(tab.id, function(currentTab) {
//          if (testUrl.test(currentTab.url)) {
//               chrome.tabs.update({url: "../options/options.html"});
//               window.close();
//             }
//   })

// });
// chrome.browserAction.setPopup({"popup": "popup/popup.html"});