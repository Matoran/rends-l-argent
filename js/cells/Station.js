"use strict";

function Station(name, price) {
    let square = Buyable(name, price);
    square.isTrain = () => true;
    square.rent = () => price;
    square.toJSON = function () {
        return {
            type: "station",
            name,
            price
        };
    };
    return square;
}