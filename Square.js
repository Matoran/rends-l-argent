"use strict";

function Square(name) {
    let cell = Cell();
    cell.name = () => name;
    return cell;
}