/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 * class CommunityChest
 * @returns CommunityChest object
 * @constructor
 */
function CommunityChest() {
    let cell = Cell();
    cell.isCommunityChest = () => true;
    cell.toJSON = function () {
        return {
            type: "communitychest"
        };
    };
    return cell;
}