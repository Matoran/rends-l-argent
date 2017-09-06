"use strict";

function Tax(name, price) {
    let square = Square(name);
    square.price = () => price;
    square.isTax = () => true;
    return square;
}