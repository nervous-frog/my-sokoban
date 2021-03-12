import move, { isWin, backMove } from './play.js';
import show from './ui.js';
import * as map from './map.js';
let over = false;
let count = 0;
let index = 0;
const directions = [];
show();

// const originalMap = JSON.parse(JSON.stringify(map.content));
// maps[0] = originalMap;
window.onkeyup = function (e) {
    //console.log(e.key)
    let result = false;
    if (over) {
        return
    }
    if (e.key === 'ArrowLeft') {
        result = move('ArrowLeft');
    }
    if (e.key === 'ArrowRight') {
        result = move('ArrowRight');
    }
    if (e.key === 'ArrowUp') {
        result = move('ArrowUp');
    }
    if (e.key === 'ArrowDown') {
        result = move('ArrowDown');
    }
    if (result) {
        index++;
        show();
        let info = {};
        info.direction = e.key;
        info.value = result;
        directions.push(info);
        console.log(index,info)
        if (isWin()) {
            console.log('恭喜过关！')
            over = true;
        }
    }
    if (e.key === 'Escape' || e.key === 'Backspace') {
        let len = directions.length;
        if (len === 0) {
            console.log('还未移动');
            return;
        } else {
            count++;
            if(count > len ) {
                return
            }else {
                const dir = directions[len - count].direction;
                const key = directions[len - count].value;
                backMove(dir, key);
                show();
                console.log(count,dir)
            }
        }

    }
}
