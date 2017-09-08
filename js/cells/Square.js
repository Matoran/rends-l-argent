"use strict";

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