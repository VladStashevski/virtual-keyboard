// eslint-disable-next-line import/prefer-default-export
export const createRowsKey = (container) => {
  let i = 1;
  while (i <= 5) {
    const row = document.createElement('div');
    row.classList.add('keyboard__row', `row${i}`);
    container.appendChild(row);
    i += 1;
  }
};
