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
let labelText = new createjs.Text("", "16px Arial", "#000000");
labelText.x = 200;
labelText.y = 120;
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
let test = true;
play();

function play() {
    let tabAction = board.actions();
    if (test) {
        labelText.text = board.players()[board.activePlayer()].color() + " turn";
        labelText.text += "\n\nYou have: " + board.players()[board.activePlayer()].money() + " $";
        if (tabAction[0].name === "buy") {
            labelText.text += "\n\nThe price is: " + board.cells()[board.players()[board.activePlayer()].position()].price() + " $";
        }
        labelText.color = board.players()[board.activePlayer()].color();
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
                let cell = board.cells()[players[board.activePlayer()].position()];
                if (cell.isBuyable()) {
                    players[board.activePlayer()].properties().forEach(function (property) {
                        cell.owner.addProperty(property);
                        property.owner = cell.owner;
                        tabSquare[property.id()].circle.commandCircle.style = cell.owner.color();
                    });
                } else {
                    board.players()[board.activePlayer()].properties().forEach(function (property) {
                        tabSquare[property.id()].circle.commandCircle.style = "yellow";
                        property.owner = bank;
                    });
                }
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
                    labelText.text = board.players()[board.activePlayer()].color() + " turn";
                    labelText.text += "\n\nYou have: " + board.players()[board.activePlayer()].money() + " $";
                    labelText.text += "\n\n" + ret.text;
                    test = false;
                }
            }

            if (t.name === "buy") {
                tabSquare[board.players()[board.activePlayer()].position()].circle.commandCircle.style = board.players()[board.activePlayer()].color();
            }
            if (t.name === "auction") {
                let buyer = $("#buyer");
                buyer.empty();
                players.forEach(function (player, id) {
                    buyer.append(`<option value="${id}">${player.color()}(${player.money()}$)</option>`);
                });
                $("#auction").modal({
                    keyboard: false,
                    backdrop: 'static'
                });
            }

            if (t.name === "trade") {
                if (tabAction[i].name === "trade") {
                    let tabs = $("#pills-tab");
                    let content = $("#pills-tabContent");
                    let selectActivePlayer = $("#selectActivePlayer");
                    selectActivePlayer.empty();
                    tabs.empty();
                    content.empty();
                    let first = true;
                    players.forEach(function (player, i) {
                        if (i !== board.activePlayer()) {
                            tabs.append(`
                                <li class="nav-item">
                                    <a class="nav-link${first ? ' active' : ''}" id="pills-home-tab" data-toggle="pill" href="#pills${i}" role="tab"
                                aria-controls="pills-home" aria-expanded="true">${player.color()}</a>
                                </li>
                            `);
                            let text = `
                                <div class="tab-pane fade${first ? ' show active' : ''}" id="pills${i}" role="tabpanel"
                                 aria-labelledby="pills-home-tab">
                                <div class="form-group">
                                <label for="select${i}">${player.color()}</label>
                                <input type="hidden" value="${i}"/>
                                <select multiple class="form-control" id="select${i}">
                                
                            `;
                            player.properties().forEach(function (property) {
                                text += `<option value="${property.id()}">${property.name()}</option>`;
                            });
                            text += `</select></div><div class="form-group">
                            <label for="money${i}">Money</label>
                            <input type="number" class="form-control" id="money${i}" value="0"/>
                            </div></div>`;
                            first = false;
                            content.append(text);

                        } else {
                            player.properties().forEach(function (property) {
                                selectActivePlayer.append(`<option value="${property.id()}">${property.name()}</option>`);
                            });
                        }
                    });

                    $('#trade').modal();
                }

            }
            movePlayers();
            play();
        });
        stage.addChild(labelText);
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

function finishTrade() {
    let player1 = {
        properties: $("#selectActivePlayer").val(),
        money: $("#moneyActivePlayer").val()
    };
    let player2 = {
        identity: players[$('.show.active input[type="hidden"]').val()],
        properties: $('.show.active select').val(),
        money: $('.show.active input[type="number"]').val()
    };

    player1.properties.forEach(function (property) {
        console.log(property);
        tabSquare[board.cells()[property].id()].circle.commandCircle.style = player2.identity.color();
    });
    player2.properties.forEach(function (property) {
        tabSquare[board.cells()[property].id()].circle.commandCircle.style = players[board.activePlayer()].color();
    });
    stage.update();
    console.log(player1);
    console.log(player2);
    board.finishTrade(player1, player2);
}

function finishAction() {

}

function squareOnClick(identifiant) {
    $("#id").val(identifiant);
    let cell = board.cells()[identifiant];
    if (cell.isBuyable() && cell.owner === players[board.activePlayer()]) {
        let action = $("#action");
        action.empty();
        let html = "";
        if (cell.isProperty()) {
            if (cell.houses() > 0) {
                console.log("sell houses");
            } else {
                html += '<button type="button" class="btn btn-primary" onclick="mortgage()">Mortgage</button>';
            }
        }
        console.log("Ah!");
        action.find(".modal-body").append(html);
        action.modal();
    }

}

function mortgage() {
    let id = $("#id").val();
    let cell = board.cells()[id].mortgage();
}