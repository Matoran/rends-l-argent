"use strict";

function Station(name, price) {
    let square = Buyable(name, price);
    square.isTrain = () => true;
    return square;
}