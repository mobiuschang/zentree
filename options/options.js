$(function(){

    let convertUrlRegex = function(url){
        return url + "/*";
    };

    var count = 0;

    chrome.storage.sync.get("block_urls", function(result){
       var currentArray = result.block_urls;
       console.log(`${currentArray} Url saved`);
       if(currentArray.length > 0){
          var firstInput = currentArray[0].replace("/*", "");
          $("#inputUrl_0").val(firstInput);
          for(var count=1; count<currentArray.length; count++){
            var newValue = currentArray[count].replace("/*", "");
            var inputField = "<div class='entry_"+count+" input-group col-xs-3'> " +
                               "<input id = 'inputUrl_"+count+"' value='"+newValue+"' class='input-field form-control' name='fields[]' type='text' placeholder='Type something' /> " +
                                  "<span class='input-group-btn'>" +
                                    "<button class='btn btn-success btn-delete' data-count="+count+" type='button'>" +
                                      "<span class='glyphicon glyphicon-minus'></span>" +
                                    "</button></span></div>"
            $("#option-form").append(inputField);
          }
       }
    });

    $(document).keypress(function(e){
      if(e.which === 13) {

        var urlArray = [];
        var hasEnter = true;
        $(".input-field").each(function(){
          var value = $(this).val();
          if( !value || value == "") {
            alert("please enter previous input field");
            hasEnter = false;
          }
          var newValue = convertUrlRegex(value);
          urlArray.push(newValue);
        });

        if(hasEnter){
          chrome.storage.sync.set({"block_urls": urlArray}, function(){
            console.log(`${urlArray} Url saved`);
          });

         count++;
         var inputField = "<div class='entry_"+count+" input-group col-xs-3'> " +
                                 "<input id = 'inputUrl_"+count+"' class='input-field form-control' name='fields[]'' type='text' placeholder='Type something' /> " +
                                    "<span class='input-group-btn'>" +
                                      "<button class='btn btn-success btn-delete' data-count="+count+" type='button'>" +
                                        "<span class='glyphicon glyphicon-minus'></span>" +
                                      "</button></span></div>"
          $("#option-form").append(inputField);
        }
      }
    });

    $(document).on("click", ".btn-delete", function(){
      var currentCount = $(this).attr("data-count");
      var urlArray = [];
      $('.entry_'+currentCount).remove();
      $(".input-field").each(function(){
        var value = $(this).val();
        var newValue = convertUrlRegex(value);
        urlArray.push(newValue);
      });
      chrome.storage.sync.set({"block_urls": urlArray}, function(){
        console.log(`${urlArray} Url saved`);
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