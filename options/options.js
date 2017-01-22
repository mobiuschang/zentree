$(function(){

    let convertUrlRegex = function(url){
        return url + "/*";
    };

    var blockUrl = $("#inputUrl").val();

    $(".btn-add").click(function(){

        var urlValue = convertUrlRegex($("#inputUrl").val());
        var urlArray = [urlValue];
        chrome.storage.sync.set({"block_urls": urlArray}, function(){

            console.log(`${urlValue} Url saved`);
        });
    });

        // chrome.storage.local.get("block_urls", function(result){

        //   let resultArr = result.block_urls;
        //   // resultArr.splice(0, 1);
        //   resultArr.push("www.youtube.com/*");
        // });

  //   {
  //       e.preventDefault();

  //       var controlForm = $('.controls form:first'),
  //           currentEntry = $(this).parents('.entry:first'),
  //           newEntry = $(currentEntry.clone()).appendTo(controlForm);

  //         chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
  //     console.log('Settings saved');
  //   });

  //       newEntry.find('input').val('');
  //       controlForm.find('.entry:not(:last) .btn-add')
  //           .removeClass('btn-add').addClass('btn-remove')
  //           .removeClass('btn-success').addClass('btn-danger')
  //           .html('<span class="glyphicon glyphicon-minus"></span>');
  //   }).on('click', '.btn-remove', function(e)
  //   {
  //       $(this).parents('.entry:first').remove();

  //       e.preventDefault();
  //       return false;
  // });
});