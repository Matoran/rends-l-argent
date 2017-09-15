/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * @param color
 * @returns {{receive: (function(*)), pay: (function(*)), position: (function(): number), forward: (function(*)), color: (function(): *), isInJail: (function(): boolean), goJail: (function()), jailTurn: (function()), goOutJail: (function()), money: (function(): number), receiveCard: (function()), hasCard: (function(): boolean), useCard: (function()), addProperty: (function(*=): Number), removeProperty: (function(*)), properties: (function(): Array)}}
 * @constructor
 */
function Player(color) {
    let money = 1500;
    let position = 0;
    let jail = 0;
    let cards = 0;
    let properties = [];
    return {
        receive(x) {
            money += x;
        },
        pay(x) {
            money -= x;
        },
        position: () => position,
        forward(nb) {
            position += nb;
            if (position >= 40) {
                position %= 40;
                money += 200;
            }
        },
        color: () => color,
        isInJail: () => jail > 0,
        goJail() {
            jail = 3;
            position = 10;
        },
        jailTurn() {
            jail -= 1;
        },
        goOutJail() {
            jail = 0;
        },
        money: () => money,
        receiveCard() {
            cards += 1;
        },
        hasCard: () => cards > 0,
        useCard() {
            cards -= 1;
            goOutJail();
        },
        addProperty: (id) => properties.push(id),
        removeProperty(id) {
            properties = properties.filter((element) => element !== id);
        },
        properties: () => properties
    };
}

let players = [Player("red"), Player("blue"), Player("green"), Player("black")];