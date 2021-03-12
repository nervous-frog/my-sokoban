import * as map from './map.js';
export default function (direction) {
    const player = getPlayerPoint();
    const next = nextInfo(player.row, player.col, direction);
    const nextNext = nextInfo(next.row, next.col, direction);
    if (map.content[next.row][next.col] === map.WALL) {
        console.log('撞墙了！');
        return false;
    } else if (map.content[next.row][next.col] === map.SPACE) {
        exchange(player, next);
        return 1;
    } else if (map.content[next.row][next.col] === map.BOX && map.content[nextNext.row][nextNext.col] === map.SPACE) {
        exchange(next, nextNext);
        exchange(player, next);
        return 2;
    }
}
export function backMove(direction,key) {
    const backPlayer = getPlayerPoint();
    const opposite = oppositeDirection(direction);
    const back = nextInfo(backPlayer.row,backPlayer.col,opposite);
    const backNext = nextInfo(backPlayer.row,backPlayer.col,direction);
    //console.log(backPlayer.row,backPlayer.col,direction)
    if(key === 1) {
        exchange(backPlayer,back);
    }
    if(key === 2) {
        exchange(backPlayer,back);
        exchange(backPlayer,backNext);
    }
}
function oppositeDirection(direction) {
    if(direction === 'ArrowLeft') {
        return 'ArrowRight';
    }
    if(direction === 'ArrowRight') {
        return 'ArrowLeft';
    }
    if(direction === 'ArrowUp') {
        return 'ArrowDown';
    }
    if(direction === 'ArrowDown') {
        return 'ArrowUp';
    }
}
export function isWin() {
    return map.correct.every(item => map.content[item.row][item.col] === map.BOX);
}
function getPlayerPoint() {
    for (let row = 0; row < map.rowNumber; row++) {
        for (let col = 0; col < map.colNumber; col++) {
            if (map.content[row][col] === map.PLAYER) {
                return {
                    row,
                    col
                }
            }
        }
    }
}
function nextInfo(row, col, direction) {
    if (row < 1 || row >= map.rowNumber - 1 || col < 1 || col >= map.colNumber - 1) {
        return
    }
    if (direction === 'ArrowLeft') {
        return {
            row: row,
            col: col - 1,
            value: map.content[row][col - 1]
        }
    }
    if (direction === 'ArrowRight') {
        return {
            row: row,
            col: col + 1,
            value: map.content[row][col + 1]
        }
    }
    if (direction === 'ArrowUp') {
        return {
            row: row - 1,
            col: col,
            value: map.content[row - 1][col]
        }
    }
    if (direction === 'ArrowDown') {
        return {
            row: row + 1,
            col: col,
            value: map.content[row + 1][col]
        }
    }
}
function exchange(point1, point2) {
    const temp = map.content[point1.row][point1.col];
    map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
    map.content[point2.row][point2.col] = temp;
}