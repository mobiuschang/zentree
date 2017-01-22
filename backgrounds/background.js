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

var testUrl = new RegExp("https://www.youtube.com/*");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
              if (testUrl.test(tab.url)) {
              chrome.tabs.update({url: "../options/options.html"});
              window.close();
            }
})

chrome.tabs.onActivated.addListener(function(tab) {
  chrome.tabs.get(tab.id, function(currentTab) {
         if (testUrl.test(currentTab.url)) {
              chrome.tabs.update({url: "../options/options.html"});
              window.close();
            }
  })

});
// chrome.browserAction.setPopup({"popup": "popup/popup.html"});