const mainBox = document.querySelector(".main"),
    selectBox = mainBox.querySelector(".select-player-box"),
    selectXbutton = selectBox.querySelector(".player-x"),
    selectYbutton = selectBox.querySelector(".player-y"),
    playBoard = mainBox.querySelector(".play-board"),
    allCell = mainBox.querySelectorAll(".cell"),
    players = playBoard.querySelector(".players"),
    resultBox = mainBox.querySelector(".result-box"),
    wonText = resultBox.querySelector(".won-text"),
    replayButton = resultBox.querySelector(".replay-button"),
    selectTheme=mainBox.querySelector(".select-theme"),
    themeCircles = selectTheme.querySelector(".theme-circles"),
    blueTheme = themeCircles.querySelector(".blue-theme"),
    greenTheme = themeCircles.querySelector(".green-theme"),
    grayTheme = themeCircles.querySelector(".gray-theme")


window.onload = () => {
    // for(i=0;i<allCell.length;i++){
    //     allCell[i].setAttribute("onclick","clickBox(this)")
    // }
    console.log(blueTheme)
    blueTheme.onclick=()=>{
        mainBox.classList.add("blue")
        selectBox.classList.add("show")
        selectTheme.classList.add("hide")
    }
    greenTheme.onclick = () => {
        mainBox.classList.add("green")
        selectBox.classList.add("show")
        selectTheme.classList.add("hide")
    }
    grayTheme.onclick = () => {
        mainBox.classList.add("gray")
        selectBox.classList.add("show")
        selectTheme.classList.add("hide")
    }
    selectXbutton.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectYbutton.onclick = () => {
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    }
    allCell.forEach(cell => {
        cell.addEventListener('click', () => handleClick(cell), { once: true })
    })


}
let playerSign = 'X';
let runBot = true;
function handleClick(e) {
    if (players.classList.contains("player")) {
        playerSign = "Y";
        e.innerText = "Y";
        players.classList.remove("active");
        e.setAttribute("id", playerSign)
    }
    else {
        e.innerText = "X";
        players.classList.add("active");
        e.setAttribute("id", playerSign)

    }

    selectWinner();
    playBoard.style.pointerEvents = "none";
    let randomTime = ((Math.random() * 1000) + 200).toFixed(); //generating random number for timeout in order to delay bot's move.
    // console.log("randomtime", randomTime)
    setTimeout(() => {
        bot(runBot); //calling bot function
    }, randomTime); //delaying time
}

// https://stackoverflow.com/a/39583825

// https://stackoverflow.com/a/10179849
function bot(runBot) {
    if (runBot) {
        playerSign = "Y";
        let array = [];
        allCell.forEach((cell, i) => {
            // console.log(cell.innerText)
            if (cell.childNodes.length == 0) {
                // console.log(cell)
                array.push(i)
                // console.log(`${i} has no children`)
            }
        })
        // console.log('array', array)

        let randomBox = array[Math.floor(Math.random() * array.length)];
        // console.log(randomBox)
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allCell[randomBox].innerText = "X";
                players.classList.add("active")
                playerSign = "X"
                allCell[randomBox].setAttribute("id", playerSign);

            }
            else {
                allCell[randomBox].innerText = "Y";
                players.classList.remove("active")
                allCell[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
        }
        allCell[randomBox].style.pointerEvents = 'none' //once the bot select any box the user cant select that box
        playBoard.style.pointerEvents = "auto";

        playerSign = "X"

    }
}

//select the winner

function getID(idname) {
    return mainBox.querySelector(".cell" + idname).id;

}

function checkThreeID(val1, val2, val3, sign) {
    if (getID(val1) == sign && getID(val2) == sign && getID(val3) == sign) {
        return true
    }
}

function selectWinner() {
    if (checkThreeID(1, 2, 3, playerSign) || checkThreeID(4, 5, 6, playerSign) || checkThreeID(7, 8, 9, playerSign) ||
        checkThreeID(1, 4, 7, playerSign) || checkThreeID(2, 5, 8, playerSign) || checkThreeID(3, 6, 9, playerSign) ||
        checkThreeID(1, 5, 9, playerSign) || checkThreeID(3, 5, 7, playerSign)) {
        // console.log(`${playerSign} has won the game!`)
        //once the match is won by someone then stop the bot 
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show")
            resultBox.classList.add("show")
        }, 700) //delay to show result box
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game `;       //if match has drawn
    }
    else if (getID(1) != "" && getID(2) != "" && getID(3) != "" && getID(4) != "" && getID(5) != ""
        && getID(6) != "" && getID(7) != "" && getID(8) != "" && getID(9) != "") {
        runBot = false;
        bot(runBot);
        setTimeout(() => {
            playBoard.classList.remove("show")
            resultBox.classList.add("show")//show result box
        }, 700) //delay to show result box

        wonText.textContent = `match has been drawn`
    }
}
replayButton.onclick = () => {
    window.location.reload();
}


