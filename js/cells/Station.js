/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Station
 * @param name of the train station
 * @param price of the train station
 * @returns Station object
 * @constructor
 */
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