"use strict";

function Property(name, price, color) {
    let square = Square(name);
    square.price = () => price;
    square.color = () => color;
    square.owner = undefined;
    return square;
}