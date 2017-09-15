/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Property
 * @param name of the cell
 * @param price of the cell
 * @param color of the cell family
 * @returns Property object
 * @constructor
 */
function Property(name, price, color) {
    let square = Buyable(name, price);
    let houses = 0;
    let hotel = 0;
    square.color = () => color;
    square.isProperty = () => true;
    square.houses = () => houses;
    square.buyHouse = () => houses += 1;
    square.hotel = () => hotel;
    square.buyHotel = () => hotel = 1;
    square.rent = () => price * (hotel + houses);
    square.toJSON = () => {
        return {
            type: "property",
            name,
            price,
            color
        };
    };
    return square;
}