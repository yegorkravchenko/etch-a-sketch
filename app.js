const root = document.documentElement;
const gridSizeInput = document.querySelector('.btns-container__grid-input');
const btnsArr = document.querySelectorAll('.btns-container__btn');
const [resetBtn, blackColorBtn, randomColorBtn] = btnsArr;
const gridContainerEl = document.querySelector('.main__grid-container');

let colorMode = 'black';

function randomColor() {
    let color = '#';
    const characters = ['A', 'B', 'C', 'D', 'E', 'F', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let i = 0; i < 6; i++) {
        color += characters[Math.floor(Math.random() * ((characters.length - 1) - 0) + 0)];
    }

    return color;
}

function setGrid(length) {
    const cellsNumber = length ** 2;
    gridContainerEl.innerHTML = '<!-- Grid generated with JavaScript -->';
    gridSizeInput.value = length; 

    for (let i = 0; i < cellsNumber; i++) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('grid-container__cell');
        gridContainerEl.appendChild(cellEl);
    }

    root.style.setProperty('--grid-columns', length);
    root.style.setProperty('--grid-rows', length);

    const gridCells = document.querySelectorAll('.grid-container__cell');
    gridCells.forEach(cell => cell.addEventListener('mouseover', (e) => {
        switch (colorMode) {
            case 'black':
                e.target.style.backgroundColor = '#0F0F0F';
                break;
            case 'random':
                e.target.style.backgroundColor = randomColor();
                break;
        }
    }));
}

function changeCurrentSelected(event, itemsArr, className) {
    const currentSelected = Object.values(itemsArr).filter(item => item.classList.contains(className))[0];
    currentSelected.classList.remove(className);
    event.target.classList.add(className);
}

gridSizeInput.addEventListener('change', () => {
    // setGrid(gridSizeInput.value);
    const gridSize = gridSizeInput.value;
    if (gridSize >= 1 && gridSize <= 100) {
        setGrid(gridSize);
    } else {
        window.alert('Grid size should be between 1 and 100');
        setGrid(16);
    }
});

resetBtn.addEventListener('click', () => {
    setGrid(16);
});

blackColorBtn.addEventListener('click', (e) => {
    colorMode = 'black';
    changeCurrentSelected(e, btnsArr, 'btns-container__btn--selected');
});

randomColorBtn.addEventListener('click', (e) => {
    colorMode = 'random';
    changeCurrentSelected(e, btnsArr, 'btns-container__btn--selected');
});

window.addEventListener('load', () => {
    setGrid(16);
});

console.log(randomColor());