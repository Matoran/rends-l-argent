"use strict";

function Player() {
    let money = 1500;
    let position = 0;
    return {
        receive: x => money += x,
        pay: x => money -= x,
        play: () => Math.floor(Math.random() * 12 - 2 + 1) + 2,
        position: () => position
    }
}