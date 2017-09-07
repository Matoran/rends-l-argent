"use strict";

function Cell() {
    return {
        isBuyable: () => false,
        isProperty: () => false,
        isTrain: () => false,
        isChance: () => false,
        isCommunityChest: () => false,
        isTax: () => false,
        isGoToJail: () => false
    };
}