"use strict";

//----------Move Player--------
let tabTokens = [];
board.players().forEach(function (p) {
    tabTokens.push(circle(tabSquare[p.position()].square.x + 25, tabSquare[p.position()].square.y + 25, 7, p.color()));
});

function movePlayers() {
    tabTokens.forEach(function (t, i) {
        t.circle.x = tabSquare[board.players()[i].position()].square.x + 25 + (i * 8);
        t.circle.y = tabSquare[board.players()[i].position()].square.y + 25 + (i * 8);
    });
    stage.update();
}

//-------------Play--------------
movePlayers();
let squares = [];
let labels = [];
let namePlayer = new createjs.Text("", "16px Arial", "#000000");
namePlayer.x = 250;
namePlayer.y = 120;
let img = new Image();
let img2 = new Image();

function drawImage(posx, posy, event) {
    let image = event.target;
    let bitmap = new createjs.Bitmap(image);
    bitmap.x = posx;
    bitmap.y = posy;
    stage.addChild(bitmap);
    stage.update();
}

img.onload = function (event) {
    drawImage(200, 330, event);
};
img2.onload = function (event) {
    drawImage(300, 330, event);
};
let test;
play();

function play() {
    let tabAction = board.actions();
    if (test) {
        namePlayer.text = board.players()[board.activePlayer()].color() + " turn";
        namePlayer.text += "\n\nYou have: " + board.players()[board.activePlayer()].money() + " monopoly";
        if (tabAction[0].name === "buy") {
            namePlayer.text += "\n\nThe price is: " + board.squares()[board.players()[board.activePlayer()].position()].price() + " monopoly";
        }
        namePlayer.color = board.players()[board.activePlayer()].color();
    }
    test = true;
    squares.forEach(function (s) {
        stage.removeChild(s);
    });
    labels.forEach(function (l) {
        stage.removeChild(l);
    });
    squares = [];

    tabAction.forEach(function (t, i) {
        let square = new createjs.Shape();
        square.graphics.beginFill("#0B486B").drawRect(0, 0, 80, 80);
        square.x = 210 + (i * 85);
        square.y = 440;
        square.on("click", function () {
            if (t.name === "surrender") {
                stage.removeChild(tabTokens[board.activePlayer()].circle);
                tabTokens.splice(board.activePlayer(), 1);
            }
            let ret = t();
            if (ret !== undefined) {
                if (ret.hasOwnProperty("dice1")) {
                    img.src = "img/dice-" + ret.dice1 + "-th.png";
                    img2.src = "img/dice-" + ret.dice2 + "-th.png";
                } else {
                    img.src = "";
                    img2.src = "";
                }
                if (ret.text !== "") {
                    namePlayer.text = board.players()[board.activePlayer()].color() + " turn";
                    namePlayer.text += "\n\nYou have: " + board.players()[board.activePlayer()].money() + " monopoly";
                    namePlayer.text += "\n\n" + ret.text;
                    test = false;
                }
            }

            if (t.name === "buy") {
                tabSquare[board.players()[board.activePlayer()].position()].circle.commandCircle.style = board.players()[board.activePlayer()].color();
            }
            if (t.name === "auction") {
                $("#auction").modal();
            }

            if (t.name === "trade") {
                $("#trade").modal();
            }


            movePlayers();
            play();
        });
        stage.addChild(namePlayer);
        stage.update();
        let label = new createjs.Text("", "15px Arial", "#000000");
        label.text = t.name;
        label.x = square.x + 20;
        label.y = square.y + 25;
        squares.push(square);
        labels.push(label);
        stage.addChild(square);
        stage.addChild(label);
        stage.update();
    });
}

function finishAuction() {
    let buyer = $("#buyer").val();
    board.finishAuction(buyer, $("#priceAuction").val());
    tabSquare[board.players()[board.activePlayer()].position()].circle.commandCircle.style = board.players()[buyer].color();
    stage.update();
}