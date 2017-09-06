"use strict";

function Tax(name, price) {
    let square = Square(name);
    square.price = () => price;
    square.isTax = () => true;
    square.toJSON = function () {
        return {
            type: "tax",
            name,
            price
        };
    };
    return square;
}