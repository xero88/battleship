import Sea from '../../src/objects/Sea.js';
import Ship from '../../src/objects/Ship.js';
import ShipType from '../../src/objects/ShipType.js';
import Orientation from '../../src/objects/Orientation.js';
import Position from '../../src/objects/Position.js';
import CellState from '../../src/objects/CellState.js';
import Game from '../../src/objects/Game.js';
import Player from '../../src/objects/Player.js';

let game;
let sea;
let littleShip;
let bigShip;
let player1;
let player2;
beforeEach(() => {
    player1 = new Player(1001, 'Anthony');
    player2 = new Player(1002, 'Patrice');
    game = new Game(player1, player2, 10);
    /*game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(2, 4)); // todo player has to place all ships
    game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 1));
    game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(2, 4)); // todo player has to place all ships
    game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 1));
    game.playerReady(player1);
    game.playerReady(player2); // wait until all players are ready
    game.whichPlayerTurn();
    game.playerFirePosition(player1, new Position(0, 0));
    game.playerFirePosition(player1, new Position(0, 0));
    game.playerFirePosition(player1, new Position(0, 0));
    game.playerFirePosition(player2, new Position(0, 0));
    game.playerFirePosition(player2, new Position(0, 0));
    game.playerFirePosition(player2, new Position(0, 0)); // todo player has x hit to make, then change state, player2 turn
    */
});

describe('Game()', () => {
    test('throw error when set 2 same players', () => {
        expect(() => {
            game = new Game(player1, player1);
        }).toThrow('2 differents players needed');
    });
});    

describe('placeShip()', () => {

  test('dont throw error if players place ship on the same place on their sea', () => {
    expect(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
        game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
    }).not.toThrow();
  });

  test('throw error if player place 2 times the LITTLE ship', () => {
    expect(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
        game.placeShip(player1, ShipType.LITTLE, Orientation.HORIZONTAL, new Position(4, 4)); 
    }).toThrow('player cannot place this boat on more time');
  });

  test('throw error if player place 2 times the BIG ship', () => {
    expect(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
        game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
        game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
        game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 
        game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(5, 0)); 
    }).toThrow('player cannot place this boat on more time');
  });

  test('when player try to place a ship when game state is not SETUP, throw exception', () => {
    expect(() => {
        game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
        game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
        game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
        game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 

        game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
        game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
        game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
        game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 

      game.startGame();
      game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
    }).toThrow('you cannot place ship, game has started');
  });

});

describe('startGame()', () => {
    test('players place all the ships, so the game can begin', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 

            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
            game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
            game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
            game.placeShip(player2, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 

            game.startGame();
        }).not.toThrow();
        });

    test('throw error if players have missed a ship', () => {
        expect(() => {
            game.placeShip(player1, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
            game.placeShip(player1, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
            game.placeShip(player1, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3)); 
            game.placeShip(player1, ShipType.BIG, Orientation.HORIZONTAL, new Position(0, 5)); 
            
            game.placeShip(player2, ShipType.LITTLE, Orientation.VERTICAL, new Position(0, 0)); 
            game.placeShip(player2, ShipType.MEDIUM, Orientation.HORIZONTAL, new Position(4, 4)); 
            game.placeShip(player2, ShipType.MEDIUM, Orientation.VERTICAL, new Position(5, 3));
            /// players2 miss the BIG 

            game.startGame();
        }).toThrow('The players have not placed all the ships');
    });

    test('at start, the game state must be SETUP', () => {
        pending('pending test');
    });

    test('when game has been launch, the game state must be STARTED', () => {
        pending('pending test');
    });
});

describe('fireAtPosition()', () => {
    test('when player try to fire when game state is not STARTED, throw exception', () => {
        expect(() => {
            game.fireAtPosition(player1, new Position(0, 0));
        }).toThrow('you cannot fire at position, game has not started');
    });
});