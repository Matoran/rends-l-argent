"use strict";

function Square(name) {
    let cell = Cell();
    cell.name = () => name;
    cell.toJSON = function () {
        return {
            type: "square",
            name
        };
    };
    return cell;
}