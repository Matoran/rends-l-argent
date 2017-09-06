"use strict";

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