const cell = $('.cell');
const table_row = document.querySelectorAll('.table-row');
const play_again_btn = document.querySelector('.btn-primary')
var player = 1;
const innerCROSS = `<div class="cross"></div>`;
const innerZERO = `<div class="zero"></div>`;
const modal_title = document.querySelector('.modal-title');
const player_lable = document.querySelector('.player-lable');
var filled_cells_counter = 0;
var draw_stopper = 0;

function rowWinnerDetection(innerHTML, player) {
    for (i = 0; i < 3; i++) {
        let counter = 0;
        for (j = 0; j < 3; j++) {
            if (table_row[i].children[j].innerHTML == innerHTML) {
                counter++
            }
        }
        if (counter == 3) {
            draw_stopper++;
            modal_title.innerText = `Player ${player} is a winner!`
            $('#exampleModalCenter').modal()
            console.log(`Row test: player ${player} is winner`)
        }
    }
}

function colWinnerDetection(innerHTML, player) {
    for (j = 0; j < 3; j++) {
        let counter = 0;
        for (i = 0; i < 3; i++) {
            if (table_row[i].children[j].innerHTML == innerHTML) {
                counter++;
            }
        }
        if (counter == 3) {
            draw_stopper++;
            modal_title.innerText = `Player ${player} is a winner!`
            $('#exampleModalCenter').modal()
            console.log(`Column test : player ${player} is winner`);
        }
    }
}

function leftDiagonalWinnerDetection(innerHTML, player) {
    let counter = 0;
    for (i = 0; i < 3; i++) {
        if (table_row[i].children[i].innerHTML == innerHTML) {
            counter++;
        }
    }
    if (counter == 3) {
        draw_stopper++;
        modal_title.innerText = `Player ${player} is a winner!`
        $('#exampleModalCenter').modal()
        console.log(`Left diagonal test: player ${player} is winner`)
    }
}

function rightDiagonalWinnerDetection(innerHTML, player) {
    let j = 2;
    let counter = 0;
    for (i = 0; i < 3; i++) {
        if (table_row[i].children[j].innerHTML == innerHTML) {
            counter++;
        }
        j--;
    }
    if (counter == 3) {
        draw_stopper++;
        modal_title.innerText = `Player ${player} is a winner!`
        $('#exampleModalCenter').modal()
        console.log(`Right diagonal test: player ${player} is winner`)
    }
}



$(document).ready(function () {
    
    cell.click(function () {
        filled_cells_counter++;
        let index = $(cell).index(this);
        let cellHTML = cell[index].innerHTML.replace(/\s/g, '').length;
        if (cellHTML == 0) {
            if (player == 1) {
                
                cell[index].innerHTML = innerCROSS;
                player_lable.innerText = 'PLAYER 2 MOVE';
                player_lable.style.color = 'green';
                player = 2;

            } else {
                cell[index].innerHTML = innerZERO;
                player_lable.innerText = 'PLAYER 1 MOVE';
                player_lable.style.color = 'red';
                player = 1;
            }
        }

        rowWinnerDetection(innerCROSS, 1);
        rowWinnerDetection(innerZERO, 2);
        colWinnerDetection(innerCROSS, 1);
        colWinnerDetection(innerZERO, 2);
        leftDiagonalWinnerDetection(innerCROSS, 1);
        leftDiagonalWinnerDetection(innerZERO, 2);
        rightDiagonalWinnerDetection(innerCROSS, 1);
        rightDiagonalWinnerDetection(innerZERO, 2)

        if(filled_cells_counter == 9 && draw_stopper == 0) {
            modal_title.innerText = `It's draw!`
            $('#exampleModalCenter').modal();

        }
    })


    play_again_btn.addEventListener('click', () => {
        player_lable.style.color = 'red';
        filled_cells_counter = 0;
        player = 1;
        draw_stopper = 0;
        player_lable.innerText = 'PLAYER 1 MOVE'

        for (i = 0; i < 9; i++) {
            cell[i].innerHTML = "";
        }
    })

})
