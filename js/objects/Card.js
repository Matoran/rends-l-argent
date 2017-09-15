/**
 * @author Marco Rodrigues Lopes
 * @date august and september 2017
 */
"use strict";

/**
 *
 * @param text
 * @param action
 * @returns {{text: (function(): *), action: *}}
 * @constructor
 */
function Card(text, action) {
    return {
        text: () => text,
        action
    };
}