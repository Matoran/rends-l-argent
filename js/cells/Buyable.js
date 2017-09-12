"use strict";

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