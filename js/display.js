"use strict";

function strcutSquare(posx, posy, w, h, color, id, dx, dy, cell) {
    return {
        posx: posx,
        posy: posy,
        width: w,
        heigth: h,
        color: color,
        id: id,
        directionX: dx,
        directionY: dy,
        cell: cell
    };
}

function square(squareParam) {
    let square = new createjs.Shape();
    let commandSquare = square.graphics.beginFill("black").command;
    square.graphics.drawRect(0, 0, squareParam.width, squareParam.heigth);
    square.x = squareParam.posx;
    square.y = squareParam.posy;
    commandSquare.style = squareParam.color;
    if (squareParam.id !== 0 && squareParam.id !== 10 && squareParam.id !== 20 && squareParam.id !== 30) {
        square.on("click", function () {
            squareOnClick(squareParam.id);
        });
    }
    let label = new createjs.Text("", "12px Arial", "#000000");
    stage.addChild(square);
    return {
        square: square,
        commandeSquare: commandSquare,
        label: label,
        struct: squareParam,
        rectangle: undefined,
        circle: undefined,
        img: undefined
    };
}

function circle(posx, posy, r, color) {
    let circle = new createjs.Shape();
    let commandeCircle = circle.graphics.beginFill(color).command;
    circle.graphics.drawCircle(0, 0, r);
    circle.x = posx;
    circle.y = posy;
    stage.addChild(circle);
    return {
        circle: circle,
        commandCircle: commandeCircle
    };
}

function image(src, posx, posy) {
    let img = new Image();
    img.src = src;
    img.onload = function (event) {
        let image = event.target;
        let bitmap = new createjs.Bitmap(image);
        bitmap.x = posx;
        bitmap.y = posy;
        stage.addChild(bitmap);
        stage.update();
    };
    return img;
}

function text(txt, posx, posy, id) {
    tabSquare[id].label.text = txt;
    tabSquare[id].label.x = posx;
    tabSquare[id].label.y = posy;
    tabSquare[id].label.alpha = 0.5;
    stage.addChild(tabSquare[id].label);
    stage.update();
}

//draw background
let background = new createjs.Shape();
background.graphics.beginFill("#79BD9A").drawRect(0, 0, 700, 700);
stage.addChild(background);


//draw board
let tabSquare = [];
let color;
const squareSize = 90;
const rectangleWidth = 58;
let y = 0;
let x = 0;
let directionX = 1;
let directionY = 0;
board.cells().forEach(function (cell, i) {
    if (i % 2 === 0) {
        color = "#3B8686";
    } else {
        color = "#0B486B";
    }

    if (i % 10 === 0) {
        if (directionX === -1) {
            x -= squareSize - rectangleWidth;
        }
        tabSquare.push(square(strcutSquare(x, y, squareSize, squareSize, color, i, directionX, directionY, cell)));
        color = "black";
        text(cell.name(), x, y + 20, i);
        if (directionX === 1 && i !== 0) {
            directionX = 0;
            directionY = 1;
            y += squareSize;
        } else if (directionY === 1) {
            directionX = -1;
            directionY = 0;
            x -= rectangleWidth;
        } else if (directionX === -1) {
            directionX = 0;
            directionY = -1;
            y -= rectangleWidth;
        } else if (directionX === 1) {
            x += squareSize;
        }
    } else {
        if (directionX === 1 || directionX === -1) {
            tabSquare.push(square(strcutSquare(x, y, rectangleWidth, squareSize, color, i, directionX, directionY, cell)));
            if (cell.isBuyable()) {
                if (directionX === 1) {
                    color = cell.owner.color();
                    tabSquare[i].circle = circle(x + rectangleWidth / 2, y + squareSize + 10, 5, color);
                } else {
                    color = cell.owner.color();
                    tabSquare[i].circle = circle(x + rectangleWidth / 2, y - 10, 5, color);
                }
            }
            if (cell.isProperty()) {
                if (directionX === 1) {
                    color = cell.color();
                    tabSquare[i].rectangle = square(strcutSquare(x + 10, y + squareSize - 20, rectangleWidth - 20, 10, color, i, directionX, directionY, cell));
                } else {
                    color = cell.color();
                    tabSquare[i].rectangle = square(strcutSquare(x + 10, y + 10, rectangleWidth - 20, 10, color, i, directionX, directionY, cell));
                }
            } else if (cell.isTrain()) {
                tabSquare[i].img = image("img/train.png", x, y);
            } else if (cell.isChance()) {
                tabSquare[i].img = image("img/chance.png", x, y);
            } else if (cell.isCommunityChest()) {
                tabSquare[i].img = image("img/chest.png", x, y);
            } else if (cell.isTax()) {
                tabSquare[i].img = image("img/tax.png", x, y);
            }

            x += rectangleWidth * directionX;
            y += squareSize * directionY;

        } else if (directionY === 1 || directionY === -1) {
            tabSquare.push(square(strcutSquare(x, y, squareSize, rectangleWidth, color, i, directionX, directionY, cell)));
            if (cell.isBuyable()) {
                if (directionY === 1) {
                    color = cell.owner.color();
                    tabSquare[i].circle = circle(x - 10, y + rectangleWidth / 2, 5, color);
                } else {
                    color = cell.owner.color();
                    tabSquare[i].circle = circle(x + squareSize + 10, y + rectangleWidth / 2, 5, color);
                }
            }
            if (cell.isProperty()) {
                if (directionY === 1) {
                    color = cell.color();
                    tabSquare[i].rectangle = square(strcutSquare(x + 10, y + 10, 10, rectangleWidth - 20, color, i, directionX, directionY, cell));
                } else {
                    color = cell.color();
                    tabSquare[i].rectangle = square(strcutSquare(x + squareSize - 20, y + 10, 10, rectangleWidth - 20, color, i, directionX, directionY, cell));
                }
            } else if (cell.isTrain()) {
                tabSquare[i].img = image("img/train.png", x, y);
            } else if (cell.isChance()) {
                tabSquare[i].img = image("img/chance.png", x, y);
            } else if (cell.isCommunityChest()) {
                tabSquare[i].img = image("img/chest.png", x, y);
            } else if (cell.isTax()) {
                tabSquare[i].img = image("img/tax.png", x, y);
            }
            x += squareSize * directionX;
            y += rectangleWidth * directionY;
        }
    }
});


tabSquare.forEach(function (s) {
    stage.addChild(s.label);
});
stage.update();