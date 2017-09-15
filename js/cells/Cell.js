/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";
let id = 0;

/**
 * base class of all cells
 * @returns Cell object
 * @constructor
 */
function Cell() {
    let localId = id;
    id += 1;
    return {
        isBuyable: () => false,
        isProperty: () => false,
        isTrain: () => false,
        isChance: () => false,
        isCommunityChest: () => false,
        isTax: () => false,
        isGoToJail: () => false,
        isUtility: () => false,
        id: () => localId
    };
}