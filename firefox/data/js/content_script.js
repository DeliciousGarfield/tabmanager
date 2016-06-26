var menu_arrange = document.getElementById('menu_arrange');
var menu_restore = document.getElementById('menu_restore');

menu_arrange.addEventListener('click', function() {
  self.port.emit('event_arrange');
});

menu_restore.addEventListener('click', function() {
  self.port.emit('event_restore');
});
