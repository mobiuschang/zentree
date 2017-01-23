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


var total_earned_time = 15;
var productive_sites = new RegExp("https://www.coursera.org/*");

var isBlocked = true;
var bg = chrome.extension.getURL("backgrounds/background.html");
var increaseTimer;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {


    if(productive_sites.test(tab.url)){

      increaseTimer = setInterval(function(){
        total_earned_time++;
        chrome.browserAction.setBadgeText({text: total_earned_time + ""});
        chrome.browserAction.setBadgeBackgroundColor({color: "blue"});

        chrome.runtime.sendMessage({
         zenTime:"increase"
        }, function(response){
          console.log(response.msg);
        });
      }, 5000);

    } else {

      clearInterval(increaseTimer);
      chrome.storage.sync.get("block_urls", function(result){

        let resultArr = result.block_urls;
        // resultArr.splice(0, 1);
        resultArr.forEach(function(oneUrl){

          let testUrl = new RegExp(oneUrl);
          if (testUrl.test(tab.url) && isBlocked) {
            chrome.tabs.update({url: bg});
            window.close();
          }
        });
      });

    }
});

// start timer countdown
function startTimer(duration) {
  isIncreasingTimer = false;
  clearInterval(increaseTimer);

  isBlocked = false;
  var timer = duration, minutes, seconds;
  let setTime = setInterval(function() {
    if(timer < 60) {
      mintues = 0;
    } else {
       mintues = parseInt(timer / 60, 10);
    }
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let counterStr = mintues + ":" + seconds;

    if(timer <= 10) {
      chrome.browserAction.setBadgeBackgroundColor({color: "red"});
    } else  {
      chrome.browserAction.setBadgeBackgroundColor({color: "blue"});
    }

    chrome.browserAction.setBadgeText({text: counterStr});

    chrome.runtime.sendMessage({
       zenTime:"stop"
      }, function(response){
        console.log(response.msg);
    });

    if(timer-- === 1) {
      chrome.browserAction.setBadgeText({text: ""});
      alert("Time to get productive again");
      total_earned_time = 0;
      isBlocked = true;
      chrome.tabs.update({url: bg});

      clearInterval(setTime);
    }
  }, 1000);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.start === "now"){
    startTimer(total_earned_time);
    sendResponse({msg: "backend has received"});
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.zen === "increase"){
    increaseTimer();
    sendResponse({msg: "backend has started increasing zen"});
  }
});
// chrome.tabs.query({"active": true, currentWindow: true}, function(tabs){
//       currentTab = tabs[0].id;
//       chrome.tabs.get(currentTab, function(tab){
//         alert(tab.url)
//       });

// });

// let totalTime = 0;
// let startingTime = 0;
// let started = false;
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     let currentTab = "";
//     // var start = new Date();
//     // chrome.tabs.query({"active": true, lastFocusedWindow: true}, function(tabs){
//     //   currentTab = tabs[0].url;
//     // });

//     chrome.storage.sync.get("block_urls", function(result){

//       let resultArr = result.block_urls;

//       // resultArr.splice(0, 1);
//       resultArr.forEach(function(oneUrl){

//         let testUrl = new RegExp(oneUrl);



//         if (testUrl.test(tab.url)) {
//           if(started === false) {
//             startingTime = new Date();
//             started = true;
//             alert("here is starting time" + startingTime);
//           }


//           // let startTime = setInterval(function() {
//           //   alert(Math.round((new Date() - start) / 1000) + "Seconds" );
//           // }, 1000);
//           // chrome.tabs.update({url: "../options/options.html"});
//           // window.close();
//         } else {
//           totalTime = Math.round((new Date() - startingTime)) / 1000;
//           alert("here is total time" + totalTime);

//         }
//       });
//     });
// });

// chrome.tabs.onActivated.addListener(function(tab) {
//   chrome.tabs.get(tab.id, function(currentTab) {
//          if (testUrl.test(currentTab.url)) {
//               chrome.tabs.update({url: "../options/options.html"});
//               window.close();
//             }
//   })

// });
// chrome.browserAction.setPopup({"popup": "popup/popup.html"});