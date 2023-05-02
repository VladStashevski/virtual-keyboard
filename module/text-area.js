export const inputKeyValueOnClick = (e) => {
  let keyCup = e.target;
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
      let cursor = txtSquare.selectionStart;
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