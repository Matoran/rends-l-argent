"use strict";

function Board() {
    let cells = [Square("Départ"), Property("Rue Ptur", 60, "red"),
        Property("Chemin Fou", 60, "red"), Station("Gare Toila", 200),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare Atoi", 200), Chance(),
        Property("Rue de Marine", 60, "red"), Property("Rue Tule", 60, "red"),
        Square("Prison"), Property("Rue des pommes", 60, "red"),
        Property("Rue Everlor", 60, "blue"), Property("Rue Tiland", 60, "blue"),
        Station("Gare Toi-A-Gauche", 200), Chance(),
        Property("Rue Rahl", 60, "blue"), Station("Gare Oloux", 200),
        CommunityChest(), Tax("Impôts", 200),
        Square("Aller en prison"), Property("Rue Pert-Grint", 60, "yellow"),
        Property("Rue de la Fortune ", 60, "yellow"), Station("Gare Avoux", 200),
        Property("Rue Bixcube", 60, "yellow"), Property("Avenue Noussome", 60, "yellow"),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare de Lyon", 200), Chance(),
        Square("Parking"), Property("Rue des pommes", 60, "green"),
        Property("Rue Minet", 60, "green"), Station("Gare Houx", 200),
        Property("Rue Bicon", 60, "red"), Property("Gust Avenue", 60, "green"),
        CommunityChest(), Tax("Impôts", 200),
        Station("Gare Gamel", 200), Chance()
    ];

    function goToNearestStation() {
    }

    function goToNearestUtility() {

    }

    let chanceCards = [
        Card("Avancez de 3 cases", (player) => player.forward(3)),
        Card("Reculez de 3 cases", (player) => player.forward(-3)),
        Card("Allez à la gare la plus proche", goToNearestStation()),
        Card("Allez à l'entreprise publique la plus proche", goToNearestUtility()),
    ];

    let communityChestCards = [
        Card("Payez votre assurance maladie 500$", (player) => player.pay(500)),
        Card("Votre employeur a doublé votre salaire ce mois, recevez 2000$", (player) => player.pay(2000)),
        Card("Accident de moto payez les réparations 300$", (player) => player.pay(300)),
        Card("Vous gagnez un prix dans un jeu à gratter, recevez 800$", (player) => player.receive(800))
    ];
    let activePlayer = 0;
    let endTurn = false;
    let midTurn = false;
    let same = 0;
    let double = false;

    function jail() {
        players[activePlayer].goJail();
        players[activePlayer].position();
        let text = "jail";
        console.log("jail");
        return {
            text: text
        };
    }

    function end() {
        activePlayer += 1;
        activePlayer %= players.length;
        endTurn = false;
        same = 0;
        console.log("end, active player = " + (activePlayer + 1));
    }

    function random(max) {
        return Math.floor(Math.random() * max);
    }

    function play() {
        let dice1 = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        double = dice1 === dice2;
        console.log(!players[activePlayer].isInJail() || double);
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
        let cell = cells[players[activePlayer].position()];
        let text = "";
        if (cell.isTax()) {
            players[activePlayer].pay(cell.price());
            text = players[activePlayer].color() + " pay " + cell.price() + " tax";
            console.log("Joueur " + (activePlayer + 1) + " a payé " + cell.price() + " d'impôts");
            endTurn = !double;
        } else if (cell.isBuyable() && cell.owner !== players[activePlayer]) {
            midTurn = true;
        } else if (cell.isChance()) {
            console.log("chance");
            let rand = random(chanceCards.length);
            text = chanceCards[rand].text();
            console.log(chanceCards[rand].text());
            chanceCards[rand].action(players[activePlayer]);
            endTurn = !double;
        } else if (cell.isCommunityChest()) {
            console.log("community chest");
            let rand = random(communityChestCards.length);
            text = communityChestCards[rand].text();
            console.log(communityChestCards[rand].text());
            communityChestCards[rand].action(players[activePlayer]);
            endTurn = !double;
        } else if (cell.isGoToJail()) {
            jail();
            end();
        } else {
            endTurn = !double;
        }

        return {
            text: text,
            dice1: dice1,
            dice2: dice2
        };
    }

    function payJail() {
        let text = "pay to go out of jail";
        console.log("pay to go out of jail");
        players[activePlayer].pay(50);
        players[activePlayer].goOutJail();
        return {
            text: text
        };
    }

    function buy() {
        let position = players[activePlayer].position();
        let text = "player " + (activePlayer + 1) + " bought case " + cells[position].name();
        console.log("player " + (activePlayer + 1) + " bought case " + cells[position].name());
        players[activePlayer].pay(cells[position].price());
        cells[position].owner = players[activePlayer];
        players[activePlayer].addProperty(cells[position]);
        midTurn = false;
        endTurn = !double;
        return {
            text: text
        };
    }

    function auction() {
        console.log("auction");
        midTurn = false;
        endTurn = !double;
    }

    function pay() {
        let position = players[activePlayer].position();
        let price = cells[position].price();
        players[activePlayer].pay(price);
        cells[position].owner.receive(price);
        let text = players[activePlayer].color() + " pay " + price + " to " + cells[position].owner.color();
        console.log(players[activePlayer].color() + " pay " + price + " to " + cells[position].owner.color());
        midTurn = false;
        endTurn = !double;
        return {
            text: text
        }
    }

    function useCard() {
        console.log("use card  to go out of jail");
    }

    function surrender() {
        console.log("surrender");

        players.splice(activePlayer, 1);
        activePlayer -= 1;
        end();
    }

    function trade() {
        console.log("trade");
    }

    function win() {
        console.log("win motherfucker");
    }


    return {
        cells: () => cells,
        actions: () => {
            let actionsList = [];
            if (players.length === 1) {
                actionsList.push(win);
                return actionsList;
            }
            if (players[activePlayer].money() < 0) {
                actionsList.push(surrender);
                actionsList.push(trade);

            } else {
                if (midTurn) {
                    if (cells[players[activePlayer].position()].owner === bank) {
                        if (players[activePlayer].money() >= cells[players[activePlayer].position()].price()) {
                            actionsList.push(buy);
                        }
                        actionsList.push(auction);
                    } else if (players[activePlayer].money() >= cells[players[activePlayer].position()].rent()) {
                        actionsList.push(pay);
                    } else {
                        actionsList.push(surrender);
                    }
                } else if (endTurn) {
                    actionsList.push(end);
                } else if (players[activePlayer].isInJail()) {
                    if (players[activePlayer].hasCard()) {
                        actionsList.push(useCard);
                    } else if (players[activePlayer].money() > 50) {
                        actionsList.push(payJail);
                    }
                    actionsList.push(play);
                } else {
                    actionsList.push(play);
                }
                actionsList.push(trade);
            }

            return actionsList;
        },
        players: () => players,
        activePlayer: () => activePlayer,
        toJSON: () => JSON.stringify(cells),
        fromJSON(json) {
            cells = [];
            id = 0;
            let test = JSON.parse(json);
            test.forEach(function (cell) {
                if (cell.type === "square") {
                    cells.push(Square(cell.name));
                } else if (cell.type === "property") {
                    cells.push(Property(cell.name, cell.price, cell.color));
                } else if (cell.type === "station") {
                    cells.push(Station(cell.name, cell.price));
                } else if (cell.type === "chance") {
                    cells.push(Chance());
                } else if (cell.type === "communitychest") {
                    cells.push(CommunityChest());
                } else if (cell.type === "tax") {
                    cells.push(Tax(cell.name, cell.price));
                }
            });

        },
        finishAuction(buyer, price) {
            cells[players[activePlayer].position()].owner = players[buyer];
            players[buyer].pay(price);
        },
        finishTrade(player1, player2) {
            players[activePlayer].pay(parseInt(player1.money));
            players[activePlayer].receive(parseInt(player2.money));
            player2.identity.pay(parseInt(player2.money));
            player2.identity.receive(parseInt(player1.money));
            player1.properties.forEach(function (property) {
                cells[property].owner = player2.identity;
            });
            player2.properties.forEach(function (property) {
                cells[property].owner = players[activePlayer];
            });
        }
    };
}