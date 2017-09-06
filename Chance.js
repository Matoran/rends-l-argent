"use strict";

function Chance() {
    let cell = Cell();
    cell.isChance = () => true;
    return cell;
}