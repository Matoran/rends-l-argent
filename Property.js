"use strict";

function Property(name, price, color) {
    let square = Buyable(name, price);
    square.color = () => color;
    return square;
}