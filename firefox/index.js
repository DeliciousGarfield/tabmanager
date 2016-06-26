var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "toggle-button",
  label: "Tab Manager",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  width: 250,
  height: 80,
  contentURL: self.data.url("menu.html"),
  contentScriptFile: self.data.url("js/content_script.js"),
  onHide: handleHide
});

panel.port.on("event_arrange", arrangeTabs);
panel.port.on("event_restore", restoreTabs);

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

var tabs = require("sdk/tabs");
var tabArray = [];

function arrangeTabs() {
  for (let tab of tabs)
    tabArray.push(tab);

  tabArray.sort(function(a, b) {
    var aDomainName = getDomainNameFromURL(a.url);
    var bDomainName = getDomainNameFromURL(b.url);
    return aDomainName > bDomainName;
  });

  for (var i = 0; i < tabArray.length; i++) {
    tabArray[i].index = i;
  }

}

function getDomainNameFromURL(url) {
  var beg = url.indexOf('://') + 3;
  var end = url.indexOf('/', beg);
  return url.substring(beg, end);
}

function restoreTabs() {
  var i = 0;
  for (let tab of tabs) {
    tab.index = i;
    i++;
  }
}
