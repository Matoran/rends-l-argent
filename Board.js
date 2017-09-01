"use strict";

function Board() {
    function Cell(){
        return {
            isBuyable: () => false,
            isProperty: () => false,
            isTrain: () => false,
            isChance: () => false,
            isCommunityChest: () => false,
            isTax: () => false
        }
    }

    function Player() {
        let money = 1500;
        let position = 0;
        let color = "red";
        return {
            receive: x => money += x,
            pay: x => money -= x,
            play: () => Math.floor(Math.random() * 12 - 2 + 1) + 2,
            position: () => position,
            color: () => color
        }
    }

    function Bank(){
        return {
            color: () => "yellow"
        }
    }

    let bank = Bank();

    function Square(name) {
        let cell = Cell();
        cell.name = () => name;
        return cell;
    }

    function Buyable(name, price) {
        let square = Square(name);
        square.price = () => price;
        square.owner = bank;
        square.isBuyable = function() { return true };
        return square;
    }

    function Station(name, price){
        let square = Buyable(name, price);
        square.isTrain = () => true;
        return square;
    }

    function Property(name, price, color) {
        let square = Buyable(name, price);
        let houses = 0;
        let hotel = 0;
        square.color = () => color;
        square.isProperty = () => true;
        square.houses = () => houses;
        square.buyHouse = () => houses += 1;
        square.hotel = () => hotel;
        square.buyHotel = () => hotel = 1;
        return square;
    }

    function Chance(){
        let cell = Cell();
        cell.isChance = () => true;
        return cell;
    }

    function CommunityChest(){
        let cell = Cell();
        cell.isCommunityChest = () => true;
        return cell;
    }

    function Tax(name, price){
        let square = Square(name);
        square.price = () => price;
        square.isTax = () => true;
        return square;
    }

    let players =[Player()];
    let squares = [Square("Départ"), Property("Rue des pommes", 60, "red"),
        Property("Rue des figues", 60, "red"), Station("Gare de Cornavin", 200),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare de Coppet", 200), Chance(),
        Property("Rue des poires", 60, "red"), Property("Rue des bananes", 60, "red"),
        Square("Prison"), Property("Rue des pommes", 60, "red"),
        Property("Rue des poires", 60, "blue"), Property("Rue des bananes", 60, "blue"),
        Station("Gare de Carouge", 200), Chance(),
        Property("Rue des figues", 60, "blue"), Station("Gare de Lancy", 200),
        CommunityChest(), Tax("Impôts", 200),
        Square("Aller en prison"), Property("Rue des pommes", 60, "yellow"),
        Property("Rue des figues", 60, "yellow"), Station("Gare de Lancy", 200),
        Property("Rue des poires", 60, "yellow"), Property("Rue des bananes", 60, "yellow"),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare de Carouge", 200), Chance(),
        Square("Parking"), Property("Rue des pommes", 60, "green"),
        Property("Rue des figues", 60, "green"), Station("Gare de Balexert", 200),
        Property("Rue de loin", 60, "red"), Property("Rue des bananes", 60, "green"),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare de Genève", 200), Chance()
    ];
    let activePlayer = 0;
    return {
        launch: function(){
            while (players.length > 1){
                players[activePlayer].play();
                activePlayer += 1;
                activePlayer %= 4;
            }
        },
        squares: () => squares
    }

}