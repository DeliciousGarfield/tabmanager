var origTabs;
var restorable = false;

chrome.tabs.onCreated.addListener(function(tab){
    restorable = false;
});

chrome.tabs.onMoved.addListener(function() {
  restorable = false;
});

chrome.tabs.onRemoved.addListener(function() {
  restorable = false;
});

chrome.runtime.onMessage.addListener(function(message) {
  if (message == "event_arrange") {
    arrangeTabs();
  }

  if (message == "event_restore") {
    restoreTabs();
  }
});

function arrangeTabs() {
  chrome.tabs.query({
      currentWindow : true
  }, function(tabArray){
    origTabs = tabArray.concat();

    tabArray.sort(function(a, b) {
      var aDomainName = getDomainNameFromURL(a.url);
      var bDomainName = getDomainNameFromURL(b.url);
      return aDomainName > bDomainName;
    });

    for (var i = 0; i < tabArray.length; i++)
      chrome.tabs.move(tabArray[i].id, {'index':i}, function() {
        restorable = true;
      });
  });
}

function getDomainNameFromURL(url) {
  var beg = url.indexOf('://') + 3;
  var end = url.indexOf('/', beg);
  return url.substring(beg, end);
}

function restoreTabs() {
  if (restorable) {
    for (var i = 0; i < origTabs.length; i++)
      chrome.tabs.move(origTabs[i].id, {'index':i});
  }
}
