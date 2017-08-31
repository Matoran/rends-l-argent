"use strict";

function Board() {
    let players =[Player()];
    let squares = [Square("Départ"),
        Property("Rue des pommes", 60, "red"), Property("Rue des poires", 60, "red"),
        Property("Rue des bananes", 60, "red"), Property("Rue des ", 60, "red"),
        Station("Gare de Cornavin", 200),
    ];
    let activePlayer = 0;
    return {
        launch: function(){
            while (players.length > 1){
                players[activePlayer].play();
                activePlayer += 1;
                activePlayer %= 4;
            }
        }
    }
    var stage = new createjs.Stage("demoCanvas");

    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;

    circle.on("click", function() {
        alert("clicked");
    });

    stage.addChild(circle);
    stage.update();

}