$(document).ready(function()
{
    $("#go-to-options").click(function() {
         if (chrome.runtime.openOptionsPage) {
        // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            window.open(chrome.runtime.getURL('options/options.html'));
        }

    });

    // start timer countdown
    function startTimer(duration) {
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
        } else {
          chrome.browserAction.setBadgeBackgroundColor({color: "blue"});
        }


        chrome.browserAction.setBadgeText({text: counterStr});

        if(timer-- === 0) {
          chrome.browserAction.setBadgeText({text: ""})
          clearInterval(setTime);
        }
      }, 1000)
    };

    $("#counter-button").click(function() {

      startTimer(14);

    });

    localStorage["block_url"] = "https://www.youtube.com/*";
    var testUrl = new RegExp("https://www.youtube.com/*");

    function clickHandler(e) {
       chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT}, function(tabs){

            if (testUrl.test(tabs[0].url)) {
              chrome.tabs.update({url: "../options/options.html"});
              window.close();
              // Note: window.close(), not this.close()
            }
         });
    }

    $("#page-redirect").click(function(){

      clickHandler();
    })

});

