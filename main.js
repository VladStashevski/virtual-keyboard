/* eslint-disable import/extensions */
/* eslint-disable object-curly-newline */
import { enKey, ruKey, fnKey, arrKey } from './module/const.js';
import { createRowsKey } from './module/keyboard.js';

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
    changeLanguage.innerHTML = 'Press <span>shift+option(alt)</span> to change languageuage. \nTask created in macOS';
  } else {
    changeLanguage.innerHTML = 'Нажмите <span>shift+option(alt)</span> для смены языка. \nТаск выполнен в ОС macOS';
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
    const keyCup = document.createElement('div');
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
      const keyCup = new KeyCup(keysData[i][j]).create();
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
      const keyCup = item;
      keyCup.innerHTML = keyCup.dataset.shifted;
    }
  });
};

// меняет на маленькие буквы
const switchLowerCase = () => {
  document.querySelectorAll('.key-cup').forEach((item) => {
    if (!item.classList.contains('arrow-key-cup') && !item.classList.contains('func-key-cup') && item.dataset.shifted !== 'null') {
      const keyCup = item;
      keyCup.innerHTML = keyCup.dataset.value;
    }
  });
};

// меняет на большие буквы
const switchUpperCaseСaps = () => {
  document.querySelectorAll('.key-cup').forEach((item) => {
    const { code } = item.dataset;
    if (code.indexOf('key-cup') !== -1) {
      const keyCup = item;
      keyCup.innerHTML = keyCup.innerHTML.toLocaleUpperCase();
    }
  });
};

const inputKeyboardValue = (insertValue) => {
  let text = txtSquare.value;
  const cursor = txtSquare.selectionStart;
  let piece1 = text.slice(0, cursor);
  const piece2 = text.slice(cursor);
  piece1 += insertValue;
  text = piece1 + piece2;
  txtSquare.value = text;
  txtSquare.selectionStart = cursor + insertValue.length;
  txtSquare.selectionEnd = cursor + insertValue.length;
};

const inputDeltValue = () => {
  let text = txtSquare.value;
  const cursor = txtSquare.selectionStart;
  const piece1 = text.slice(0, cursor);
  const piece2 = text.slice(cursor + 1);
  text = piece1 + piece2;
  txtSquare.value = text;
  txtSquare.selectionStart = cursor;
  txtSquare.selectionEnd = cursor;
};

const inputBackspcValue = () => {
  let text = txtSquare.value;
  const cursor = txtSquare.selectionStart;
  const endCursor = txtSquare.selectionEnd;
  if (cursor === endCursor) {
    const piece1 = text.slice(0, cursor - 1);
    const piece2 = text.slice(cursor);
    text = piece1 + piece2;
    txtSquare.value = text;
    txtSquare.selectionStart = cursor - 1;
    txtSquare.selectionEnd = cursor - 1;
  }
};

const inputKeyValueOnClick = (e) => {
  const keyCup = e.target;
  if (keyCup.classList.contains('key-cup')) {
    txtSquare.focus();
    if (keyCup.dataset.code.indexOf('key-cup') !== -1) {
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
    if (!fnKey.includes(keyCup.dataset.code) && !arrKey.includes(keyCup.dataset.code) && keyCup.dataset.code.indexOf('key-cup') === -1) {
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
    if (arrKey.includes(keyCup.dataset.code)) {
      const cursor = txtSquare.selectionStart;
      if (keyCup.dataset.code === 'ArrowLeft') {
        txtSquare.selectionStart = cursor - 1;
        txtSquare.selectionEnd = cursor - 1;
      } else if (keyCup.dataset.code === 'ArrowRight') {
        txtSquare.selectionStart = cursor + 1;
        txtSquare.selectionEnd = cursor + 1;
      } else if (keyCup.dataset.code === 'ArrowUp') {
        inputKeyboardValue('↑');
      } else if (keyCup.dataset.code === 'ArrowDown') {
        inputKeyboardValue('↓');
      }
    }
    if (keyCup.dataset.code === 'Tab') {
      inputKeyboardValue('    ');
    }
    if (keyCup.dataset.code === 'Delete') {
      inputDeltValue(txtSquare);
    }
    if (keyCup.dataset.code === 'Backspace') {
      inputBackspcValue(txtSquare);
    }
    if (keyCup.dataset.code === 'Space') {
      inputKeyboardValue(' ');
    }
    if (keyCup.dataset.code === 'Enter') {
      inputKeyboardValue('\n');
    }
    if (keyCup.dataset.code === 'Сaps') {
      if (сaps) {
        сaps = false;
        keyCup.classList.remove('pressed');
        switchLowerCase();
      } else {
        сaps = true;
        keyCup.classList.add('pressed');
        switchUpperCaseСaps();
      }
    }
  }
};

const addPresOnClick = (e) => {
  const keyCup = e.target;
  if (keyCup.classList.contains('key-cup')) {
    keyCup.classList.add('pressed');
  }
};

const removePresOnClick = (e) => {
  const keyCup = e.target;
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
    const keyCup = document.querySelector(`.key-cup[data-code="${e.code}"]`);
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
    const keyCup = document.querySelector(`.key-cup[data-code="${e.code}"]`);
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
    const cursor = txtSquare.selectionStart;
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
