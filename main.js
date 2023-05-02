import {enKey, ruKey, fnKey, arrKey} from './module/const.js';
import {createRowsKey} from './module/keyboard.js';
import {inputKeyValueOnClick} from './module/text-area.js';

// ---------------------------------
const body = document.querySelector('body');
let language = 'en';
let сaps = false;
let shift = false;

const createTextArea = () => {
  const header = document.createElement('h1');
  header.classList.add('header');
  header.innerHTML = 'Virtual keyboard';
  const txtSpace = document.createElement('div');
  txtSpace.classList.add('text-field');
  const changeLanguage = document.createElement('p');
  changeLanguage.classList.add('text-field__change-language');
  if (language === 'en') {
    changeLanguage.innerHTML = 'Press <span>shift+option(alt)</span> to change languageuage. \nTask created in Windows OS';
  } else {
    changeLanguage.innerHTML = 'Нажмите <span>shift+option(alt)</span> для смены языка. \nТаск выполнен в ОС Windows';
  }
  const txtSquare = document.createElement('textarea');
  txtSquare.classList.add('text-field__textarea');
  txtSquare.setAttribute('autofocus', 'autofocus');

  txtSpace.appendChild(changeLanguage);
  txtSpace.appendChild(txtSquare);

  body.appendChild(header);
  body.appendChild(txtSpace);
};

const createKeybArea = () => {
  const macKeyboard = document.createElement('div');
  macKeyboard.classList.add('keyboard');
  body.append(macKeyboard);
  const macKeyboardContainer = document.createElement('div');
  macKeyboardContainer.classList.add('keyboard__keys-container');
  macKeyboard.append(macKeyboardContainer);
};

createTextArea();
createKeybArea();
class KeyCup {
  constructor(x) {
    this.value = x.value;
    this.code = x.code;
    this.shifted = x.shifted;
    this.doubled = x.doubled;
  }

  create() {
    let keyCup = document.createElement('div');
    keyCup.classList.add('key-cup');
    keyCup.dataset.code = `${this.code}`;
    keyCup.dataset.shifted = `${this.shifted}`;
    keyCup.dataset.value = `${this.value}`;
    keyCup.innerHTML = `${this.value}`;
    if (fnKey.includes(`${this.code}`)) {
      keyCup.classList.add('func-key-cup');
    }
    if (arrKey.includes(`${this.code}`)) {
      keyCup.classList.add('arrow-key-cup');
    }
    return keyCup;
  }
}

const createKeysCup = (keysData, rows) => {
  for (let i = 0; i < keysData.length; i += 1) {
    for (let j = 0; j < keysData[i].length; j += 1) {
      let keyCup = new KeyCup(keysData[i][j]).create();
      rows[i].appendChild(keyCup);
    }
  }
};

const macKeyboardContainer = document.querySelector('.keyboard__keys-container');
createRowsKey(macKeyboardContainer);
let rows = document.querySelectorAll('.keyboard__row');

// выбор языка
if (language === 'en') {
  createKeysCup(enKey, rows);
} else {
  createKeysCup(ruKey, rows);
}

const txtSquare = document.querySelector('textarea');

const switchUpperCase = () => {
  document.querySelectorAll('.key-cup').forEach((item) => {
    if (!item.classList.contains('arrow-key-cup') && !item.classList.contains('func-key-cup') && item.dataset.shifted !== 'null') {
      let keyCup = item;
      keyCup.innerHTML = keyCup.dataset.shifted;
    }
  });
};

// меняет на маленькие буквы
const switchLowerCase = () => {
  document.querySelectorAll('.key-cup').forEach((item) => {
    if (!item.classList.contains('arrow-key-cup') && !item.classList.contains('func-key-cup') && item.dataset.shifted !== 'null') {
      let keyCup = item;
      keyCup.innerHTML = keyCup.dataset.value;
    }
  });
};

// меняет на большие буквы
const switchUpperCaseСaps = () => {
  document.querySelectorAll('.key-cup').forEach((item) => {
    let code = item.dataset.code;
    if (code.indexOf('key-cup') !== -1) {
      let keyCup = item;
      keyCup.innerHTML = keyCup.innerHTML.toLocaleUpperCase();
    }
  });
};

const inputKeyboardValue = (insertValue) => {
  let text = txtSquare.value;
  let cursor = txtSquare.selectionStart;
  let piece1 = text.slice(0, cursor);
  let piece2 = text.slice(cursor);
  piece1 += insertValue;
  text = piece1 + piece2;
  txtSquare.value = text;
  txtSquare.selectionStart = cursor + insertValue.length;
  txtSquare.selectionEnd = cursor + insertValue.length;
};

const inputDeltValue = () => {
  let text = txtSquare.value;
  let cursor = txtSquare.selectionStart;
  let piece1 = text.slice(0, cursor);
  let piece2 = text.slice(cursor + 1);
  text = piece1 + piece2;
  txtSquare.value = text;
  txtSquare.selectionStart = cursor;
  txtSquare.selectionEnd = cursor;
};

const inputBackspcValue = () => {
  let text = txtSquare.value;
  let cursor = txtSquare.selectionStart;
  let endCursor = txtSquare.selectionEnd;
  if (cursor === endCursor) {
    let piece1 = text.slice(0, cursor - 1);
    let piece2 = text.slice(cursor);
    text = piece1 + piece2;
    txtSquare.value = text;
    txtSquare.selectionStart = cursor - 1;
    txtSquare.selectionEnd = cursor - 1;
  }
};



const addPresOnClick = (e) => {
  let keyCup = e.target;
  if (keyCup.classList.contains('key-cup')) {
    keyCup.classList.add('pressed');
  }
};

const removePresOnClick = (e) => {
  let keyCup = e.target;
  if (keyCup.classList.contains('key-cup')) {
    keyCup.classList.remove('pressed');
  }
};

window.addEventListener('keydown', (e) => {
  txtSquare.focus();
  macKeyboardContainer.querySelector(`.key-cup[data-code="${e.code}"]`).classList.add('pressed');
  e.preventDefault();

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shift = true;
    switchUpperCase();
  }
});

// вставлет символы
window.addEventListener('keyup', (e) => {
  if (e.code !== 'Сaps') {
    macKeyboardContainer.querySelector(`.key-cup[data-code="${e.code}"]`).classList.remove('pressed');
  }
  if (e.code === 'Сaps' && сaps === false) {
    сaps = true;
    switchUpperCaseСaps();
  } else if (e.code === 'Сaps' && сaps === true) {
    сaps = false;
    switchLowerCase();
    document.querySelector(`.key-cup[data-code="${e.code}"]`).classList.remove('pressed');
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shift = false;
    switchLowerCase();
  }

  if (e.code.indexOf('key-cup') !== -1) {
    let keyCup = document.querySelector(`.key-cup[data-code="${e.code}"]`);
    if (сaps && !shift) {
      inputKeyboardValue(`${keyCup.dataset.shifted}`);
    } else if (сaps && shift) {
      inputKeyboardValue(`${keyCup.dataset.value}`);
    } else if (!сaps && shift) {
      inputKeyboardValue(`${keyCup.dataset.shifted}`);
    } else if (!сaps && !shift) {
      inputKeyboardValue(`${keyCup.dataset.value}`);
    }
  }

  if (!fnKey.includes(e.code) && !arrKey.includes(e.code) && e.code.indexOf('key-cup') === -1) {
    let keyCup = document.querySelector(`.key-cup[data-code="${e.code}"]`);
    if (сaps && !shift) {
      inputKeyboardValue(`${keyCup.dataset.value}`);
    } else if (сaps && shift) {
      inputKeyboardValue(`${keyCup.dataset.shifted}`);
    } else if (!сaps && shift) {
      inputKeyboardValue(`${keyCup.dataset.shifted}`);
    } else if (!сaps && !shift) {
      inputKeyboardValue(`${keyCup.dataset.value}`);
    }
  }

  if (e.code === 'Tab') {
    inputKeyboardValue('    ');
  }
  if (e.code === 'Delete') {
    inputDeltValue(txtSquare);
  }
  if (e.code === 'Backspace') {
    inputBackspcValue(txtSquare);
  }
  if (e.code === 'Enter') {
    inputKeyboardValue('\n');
  }
  if (e.code === 'Space') {
    inputKeyboardValue(' ');
  }
  if (e.code.indexOf('Arrow') !== -1) {
    let cursor = txtSquare.selectionStart;
    if (e.code === 'ArrowLeft') {
      txtSquare.selectionStart = cursor - 1;
      txtSquare.selectionEnd = cursor - 1;
    } else if (e.code === 'ArrowRight') {
      txtSquare.selectionStart = cursor + 1;
      txtSquare.selectionEnd = cursor + 1;
    } else if (e.code === 'ArrowUp') {
      inputKeyboardValue('↑');
    } else if (e.code === 'ArrowDown') {
      inputKeyboardValue('↓');
    }
  }
});

window.addEventListener('click', inputKeyValueOnClick);
window.addEventListener('mousedown', addPresOnClick);
window.addEventListener('mouseup', removePresOnClick);

// меняет язык при комбинации 
const swithcLanguage = (event) => {
  if (event.shiftKey && event.altKey) {
    if (language === 'en') {
      language = 'ru';
    } else {
      language = 'en';
    }
    macKeyboardContainer.innerHTML = '';
    createRowsKey(macKeyboardContainer);
    rows = document.querySelectorAll('.keyboard__row');
    if (language === 'ru') {
      createKeysCup(ruKey, rows);
      document.querySelector('.text-field__change-language').innerHTML = 'Нажмите <span>shift+option(alt)</span> для смены языка. \nТаск выполнен в macOS';
    } else {
      createKeysCup(enKey, rows);
      document.querySelector('.text-field__change-language').innerHTML = 'Press <span>shift+option(alt)</span> to change languageuage. \nTask created in macOS';
    }
  }
};

// меняет язык
document.addEventListener('keydown', swithcLanguage);

// сохраняет выбор языка 
const setLocalStorage = () => {
  localStorage.setItem('language', language);
};

const languageLocalStorage = () => {
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    macKeyboardContainer.innerHTML = '';
    createRowsKey(macKeyboardContainer);
    rows = document.querySelectorAll('.keyboard__row');
    if (language === 'ru') {
      createKeysCup(ruKey, rows);
      document.querySelector('.text-field__change-language').innerHTML = 'Нажмите <span>shift+option(alt)</span> для смены языка. \nТаск выполнен в macOS';
    } else {
      createKeysCup(enKey, rows);
      document.querySelector('.text-field__change-language').innerHTML = 'Press <span>shift+option(alt)</span> to change languageuage. \nTask created in macOS';
    }
  }
};

window.addEventListener('beforeunload', setLocalStorage);
window.addEventListener('load', languageLocalStorage);
