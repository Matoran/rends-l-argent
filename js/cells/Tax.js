/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Tax
 * @param name of the cell
 * @param price of the cell
 * @returns Tax object
 * @constructor
 */
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