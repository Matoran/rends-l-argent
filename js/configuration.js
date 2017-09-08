"use strict";

function squareOnClick(identifiant) {
    cleanForm();
    let type = document.getElementById("blocType");
    let name = document.getElementById("blocName");
    let price = document.getElementById("blocPrice");
    let color = document.getElementById("blocColor");
    let id = document.getElementById("id");
    id.value = identifiant;
    type.style.display = "block";
    name.style.display = "block";
    price.style.display = "block";
    color.style.display = "block";
    let card = document.getElementById('typeCarte');
    card.selectedIndex = "Propriete";
    $('#configuration').modal();
}

//----------Form--------------------
const card = document.getElementById('typeCarte');
// change the form
card.addEventListener('change', function () {
    let name = document.getElementById("blocName");
    let price = document.getElementById("blocPrice");
    let color = document.getElementById("blocColor");
    let service = document.getElementById("blocService");
    let taxe = document.getElementById("blocTaxe");

    let value = card.options[card.selectedIndex].value;

    name.style.display = "none";
    price.style.display = "none";
    color.style.display = "none";
    service.style.display = "none";
    taxe.style.display = "none";

    if (value === "Propriete") {
        name.style.display = "block";
        price.style.display = "block";
        color.style.display = "block";
    } else if (value === "Gare") {
        name.style.display = "block";
        price.style.display = "block";
    } else if (value === "Services publiques") {
        service.style.display = "block";
    } else if (value === "Impots et taxe") {
        taxe.style.display = "block";
        price.style.display = "block";
    }
});

function cleanForm() {
    let type = document.getElementById("blocType");
    let name = document.getElementById("blocName");
    let price = document.getElementById("blocPrice");
    let color = document.getElementById("blocColor");
    let id = document.getElementById("id");
    let service = document.getElementById("blocService");
    let taxe = document.getElementById("blocTaxe");
    id.value = 0;
    type.style.display = "none";
    name.style.display = "none";
    price.style.display = "none";
    color.style.display = "none";
    service.style.display = "none";
    taxe.style.display = "none";
}

function send() {
    let id = document.getElementById("id").value;
    let value = card.options[card.selectedIndex].value;
    let name = document.getElementById("name").value;
    let color = document.getElementById("color").value;
    let price = document.getElementById("price").value;
    let service = document.getElementById("service");
    service = service.options[service.selectedIndex].value;
    let taxe = document.getElementById("taxe");
    taxe = taxe.options[taxe.selectedIndex].value;

    if (tabSquare[id].rectangle !== undefined) {
        stage.removeChild(tabSquare[id].rectangle.square);
    }

    if (tabSquare[id].circle !== undefined) {
        stage.removeChild(tabSquare[id].circle.circle);
        tabSquare[id].circle = undefined;
    }

    if (tabSquare[id].img !== undefined) {
        stage.removeChild(tabSquare[id].img.src = "");
    }


    let x = tabSquare[id].struct.posx;
    let y = tabSquare[id].struct.posy;
    let dx = tabSquare[id].struct.directionX;
    let dy = tabSquare[id].struct.directionY;
    let cell = tabSquare[id].struct.cell;
    if (dx === 1 || dx === -1) {
        if (value === "Propriete" || value === "Gare") {
            if (dx === 1) {
                tabSquare[id].circle = circle(x + rectangleWidth / 2, y + squareSize + 10, 5, "yellow");
            } else {
                tabSquare[id].circle = circle(x + rectangleWidth / 2, y - 10, 5, "yellow");
            }
        }
        if (value === "Propriete") {
            if (dx === 1) {
                tabSquare[id].rectangle = square(strcutSquare(x + 10, y + squareSize - 20, rectangleWidth - 20, 10, color, id, dx, dy, cell));
            } else {
                tabSquare[id].rectangle = square(strcutSquare(x + 10, y + 10, rectangleWidth - 20, 10, color, id, dx, dy, cell));
            }
        }
    } else if (dy === 1 || dy === -1) {
        if (value === "Propriete" || value === "Gare") {
            if (dy === 1) {
                tabSquare[id].circle = circle(x - 10, y + rectangleWidth / 2, 5, "yellow");
            } else {
                tabSquare[id].circle = circle(x + squareSize + 10, y + rectangleWidth / 2, 5, "yellow");
            }
        }
        if (value === "Propriete") {
            if (dy === 1) {
                tabSquare[id].rectangle = square(strcutSquare(x + 10, y + 10, 10, rectangleWidth - 20, color, id, dx, dy, cell));
            } else {
                tabSquare[id].rectangle = square(strcutSquare(x + squareSize - 20, y + 10, 10, rectangleWidth - 20, color, id, dx, dy, cell));
            }
        }
    }

    if (value === "Gare") {
        tabSquare[id].img = image("img/train.png", x, y);
        board.squares()[id] = Station(name, price);
    } else if (value === "Impots et taxe") {
        tabSquare[id].img = image("img/tax.png", x, y);
        board.squares()[id] = Tax(name, price);
    } else if (value === "Caisse de communaute") {
        tabSquare[id].img = image("img/chest.png", x, y);
        board.squares()[id] = CommunityChest();
    } else if (value === "Chance") {
        tabSquare[id].img = image("img/chance.png", x, y);
        board.squares()[id] = Chance();
    } else if (value === "Propriete") {
        board.squares()[id] = Property(name, price, color);
    }
    /*else if(value === "Services publiques"){

            }*/


    stage.update();
    cleanForm();
}

function start() {
    localStorage.setItem("config", board.toJSON());
    $("#configForm").submit();
}