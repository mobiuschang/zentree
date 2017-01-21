   chrome.storage.sync.set({'foo': 'hello', 'bar': 'hi'}, function() {
      console.log('Settings saved');
    });