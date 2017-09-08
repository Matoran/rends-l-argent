"use strict";
let id = 0;

function Cell() {
    id += 1;
    return {
        isBuyable: () => false,
        isProperty: () => false,
        isTrain: () => false,
        isChance: () => false,
        isCommunityChest: () => false,
        isTax: () => false,
        isGoToJail: () => false,
        id: () => id
    };
}