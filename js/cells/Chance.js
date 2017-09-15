/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class Chance
 * @returns Chance object
 * @constructor
 */
function Chance() {
    let cell = Cell();
    cell.isChance = () => true;
    cell.toJSON = function () {
        return {
            type: "chance"
        };
    };
    return cell;
}