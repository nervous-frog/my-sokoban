import * as map from './map.js';
const divContainer = document.getElementById('game');
const pieceWidth = 50;
const pieceHeight = 50;
divContainer.style.width = pieceWidth * map.colNumber + 'px';
divContainer.style.height = pieceHeight * map.rowNumber + 'px';
export default function () {
    divContainer.innerHTML = '';
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            showPiece(row, col);
        }
    }
}
function showPiece(row, col) {
    const value = map.content[row][col];
    const div = document.createElement('div');
    div.className = 'ele';
    div.style.left = col * pieceWidth + 'px';
    div.style.top = row * pieceHeight + 'px';
    if (value === map.PLAYER) {
        div.classList.add('player');
    } else if (value === map.WALL) {
        div.classList.add('wall');
    } else if (value === map.BOX) {
        div.classList.add('box');
    } else {
        if (isCorrect(row, col)) {
            div.classList.add('right_location');
        } else {
            return;
        }
    }
    divContainer.appendChild(div);
}
function isCorrect(row, col) {
    return (map.correct.find(item => row === item.row && col === item.col) !== undefined);
}