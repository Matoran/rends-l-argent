"use strict";

function Buyable(name, price) {
    let square = Square(name);
    square.price = () => price;
    square.owner = undefined;
    return square;
}