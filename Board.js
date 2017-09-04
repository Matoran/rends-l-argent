"use strict";

function Board() {
    function Cell() {
        return {
            isBuyable: () => false,
            isProperty: () => false,
            isTrain: () => false,
            isChance: () => false,
            isCommunityChest: () => false,
            isTax: () => false
        }
    }

    function Player(color) {
        let money = 1500;
        let position = 0;
        let jail = 0;
        let cards = 0;
        return {
            receive: x => money += x,
            pay: x => money -= x,
            position: () => position,
            forward: (nb) => position += nb,
            color: () => color,
            isInJail: () => jail > 0,
            goJail: () => jail = 3,
            jailTurn: () => jail -= 1,
            goOutJail: () => jail = 0,
            money: () => money,
            receiveCard: () => cards += 1,
            hasCard: () => cards > 0,
            useCard: () => cards -= 1,
        }
    }

    function Bank() {
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
        square.isBuyable = function () {
            return true
        };
        return square;
    }

    function Station(name, price) {
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

    function Chance() {
        let cell = Cell();
        cell.isChance = () => true;
        return cell;
    }

    function CommunityChest() {
        let cell = Cell();
        cell.isCommunityChest = () => true;
        return cell;
    }

    function Tax(name, price) {
        let square = Square(name);
        square.price = () => price;
        square.isTax = () => true;
        return square;
    }

    let players = [Player("red"), Player("blue"), Player("yellow"), Player("black")];
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
    let endTurn = false;
    let midTurn = false;
    let same = 0;
    let double = false;

    function jail() {
        players[activePlayer].goJail();
        console.log("jail");
    }

    function end() {
        activePlayer += 1;
        activePlayer %= 4;
        endTurn = false;
        same = 0;
        console.log("end, active player = " + (activePlayer + 1));
    }

    function play() {
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        double = dice1 === dice2;
        if (!players[activePlayer].isInJail() || double) {
            players[activePlayer].goOutJail();
            players[activePlayer].forward(dice1 + dice2);
        }
        console.log(dice1 + " " + dice2);
        if (dice1 === dice2) {
            same += 1;
            if (same === 3) {
                jail();
                end();
            }
        }
        let cell = squares[players[activePlayer].position()];
        if(cell.isTax()){
            players[activePlayer].pay(cell.price());
            console.log("Joueur " + (activePlayer+1) + " a payé " + cell.price() + " d'impôts");
            endTurn = true;
        }else if(cell.isBuyable()){
            midTurn = true;
        }else if(cell.isChance()){
            console.log("chance");
            endTurn = true;
        }else if(cell.isCommunityChest()){
            console.log("community chest");
            endTurn = true;
        }
        if(endTurn && double){
            endTurn = false;
        }
    }

    function payJail() {
        console.log("pay to go out of jail");
        players[activePlayer].pay(50);
        players[activePlayer].goOutJail();
    }

    function buy() {
        let position = players[activePlayer].position();
        console.log("player " + (activePlayer+1) + " bought case " + squares[position].name());
        players[activePlayer].pay(squares[position].price());
        squares[position].owner = players[activePlayer];
        midTurn = false;
        endTurn = !double;
    }

    function auction() {
        console.log("auction");
        midTurn = false;
        endTurn = true;
    }

    function pay() {
        console.log("pay");
    }

    function useCard() {
        console.log("use card  to go out of jail");
    }


    return {
        squares: () => squares,
        actions: () => {
            let actionsList = {};
            if (midTurn) {
                if (squares[players[activePlayer].position()].owner === bank) {
                    if (players[activePlayer].money() >= squares[players[activePlayer].position()].price()) {
                        actionsList.buy = buy;
                    }
                    actionsList.auction = auction;
                } else {
                    actionsList.pay = pay;
                }
            } else if (endTurn) {
                actionsList.end = end;
            } else if (players[activePlayer].isInJail()) {
                if (players[activePlayer].hasCard()) {
                    actionsList.useCard = useCard;
                } else if (players[activePlayer].money() > 50) {
                    actionsList.payJail = payJail;
                }
                actionsList.play = play;
            } else {
                actionsList.play = play;
            }
            return actionsList;
        },
        players: () => players
    }
}