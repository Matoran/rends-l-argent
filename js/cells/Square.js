/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Square
 * @param name of the cell
 * @returns Square object
 * @constructor
 */
function Square(name) {
    let cell = Cell();
    cell.name = () => name;
    if (name === "Aller en prison") {
        cell.isGoToJail = () => true;
    }
    cell.toJSON = function () {
        return {
            type: "square",
            name
        };
    };
    return cell;
}