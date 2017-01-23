$(document).ready(function()
{

  var total_earned_time = chrome.extension.getBackgroundPage().total_earned_time;

  $("#zenpoints_field").text(`You have ${total_earned_time} Zen points`);

    $("#go-to-options").click(function() {
         if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            window.open(chrome.runtime.getURL('options/options.html'));
        }
    });

    $("#counter-button").click(function() {

      console.log("Time is starting now");
      chrome.runtime.sendMessage({
        start:"now"
      }, function(response){
        console.log(response.msg);
      });

    });

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
      if(request.zenTime === "increase" || request.zenTime === "stop"){
          var total_earned_time = chrome.extension.getBackgroundPage().total_earned_time;

          $("#zenpoints_field").text(`You have ${total_earned_time} Zen points`);

      }
    });


    $("#increase-button").click(function() {

      console.log("Time to earn zen now");
      chrome.runtime.sendMessage({
        zen:"increase"
      }, function(response){
        console.log(response.msg);
      });

    });
    // localStorage["block_url"] = "https://www.youtube.com/*";
    // var testUrl = new RegExp("https://www.youtube.com/*");

    // function clickHandler(e) {
    //    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){

    //         if (testUrl.test(tabs[0].url)) {
    //           chrome.tabs.update({url: "../options/options.html"});
    //           window.close();
    //           // Note: window.close(), not this.close()
    //         }
    //      });
    // }

    // $("#page-redirect").click(function(){

    //   clickHandler();
    // });

});

