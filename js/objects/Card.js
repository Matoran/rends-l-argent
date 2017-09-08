"use strict";

function Card(text, action) {
    return {
        text: () => text,
        action
    };
}