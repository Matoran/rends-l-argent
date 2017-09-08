"use strict";

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