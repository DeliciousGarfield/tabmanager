var menu_arrange = document.getElementById('menu_arrange');
var menu_restore = document.getElementById('menu_restore');

var menu_arrange_text = chrome.i18n.getMessage("menuArrange");
var menu_restore_text = chrome.i18n.getMessage("menuRestore");

menu_arrange_prev_text = menu_arrange.innerHTML;
menu_restore_prev_text = menu_restore.innerHTML;

menu_arrange.innerHTML = menu_arrange_text + menu_arrange_prev_text;
menu_restore.innerHTML = menu_restore_text + menu_restore_prev_text;

menu_arrange.addEventListener('click', function() {
    chrome.runtime.sendMessage('event_arrange');
});

menu_restore.addEventListener('click', function() {
  chrome.runtime.sendMessage('event_restore');
});
