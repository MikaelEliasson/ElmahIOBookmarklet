# ElmahIOBookmarklet - Speed up deleting in Elmah.io


Create a bookmarklet with this js
```
javascript: (function () { 
    var jsCode = document.createElement('script'); 
    jsCode.setAttribute('src', 'https://cdn.rawgit.com/MikaelEliasson/ElmahIOBookmarklet/master/elmahbookmarklet.js');                  
    document.body.appendChild(jsCode); 
  }());
```

You can convert it to more bookmarklet friendly code at http://chriszarate.github.io/bookmarkleter/

When you are on the search page in elmah.io. Click the bookmarklet and then you can navigate the errors with up & down keys. You can delete an error with "delete". The error get slightly read when deleting and clear red when it's done.


# Contributing

It would be nice to add hide functionality like this too. And some better handling of expanded errors. Feel free to create any pull requests or add an issue.

