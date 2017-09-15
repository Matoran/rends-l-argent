/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Buyable manage mortgage of property
 * @param name of the cell
 * @param price price of the cell
 * @returns Buyable object
 * @constructor
 */
function Buyable(name, price) {
    let cell = Square(name);
    let mortgaged = false;
    cell.price = () => price;
    cell.owner = bank;
    cell.isBuyable = () => true;
    cell.mortgage = function () {
        if (!mortgaged) {
            mortgaged = true;
            cell.owner.receive(price / 2);
        }
    };
    cell.isMortgaged = () => mortgaged;
    return cell;
}