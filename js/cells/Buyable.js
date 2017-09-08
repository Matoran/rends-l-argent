"use strict";

function Buyable(name, price) {
    let square = Square(name);
    square.price = () => price;
    square.owner = bank;
    square.isBuyable = () => true;
    return square;
}