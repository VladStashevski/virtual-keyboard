import { data } from './module/const.js';

// ---------------------------------


window.addEventListener('DOMContentLoaded', () => {	
	
  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
		Keyboard.init();
  });
});