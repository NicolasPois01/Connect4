import {Model} from './Model.js';
import {View} from './View.js';
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.bindFindFirstEmptySpot = this.bindFindFirstEmptySpot.bind(this);
        this.view.bindFindFirstEmptySpot(this.bindFindFirstEmptySpot);

        this.bindGetMatrix = this.bindGetMatrix.bind(this);
        this.view.bindGetMatrix(this.bindGetMatrix);

        this.bindIsRowFull = this.bindIsRowFull.bind(this);
        this.view.bindIsRowFull(this.bindIsRowFull);

        this.bindGetFirstPlayerToPlay = this.bindGetFirstPlayerToPlay.bind(this);
        this.view.bindGetFirstPlayerToPlay(this.bindGetFirstPlayerToPlay);

        this.bindSetMatrixElement = this.bindSetMatrixElement.bind(this);
        this.view.bindSetMatrixElement(this.bindSetMatrixElement);

        this.bindPlayTurn = this.bindPlayTurn.bind(this);
        this.view.bindPlayTurn(this.bindPlayTurn);

        this.bindAddToken = this.bindAddToken.bind(this);
        this.model.bindAddToken(this.bindAddToken);

        this.bindResetGame = this.bindResetGame.bind(this);
        this.view.bindResetGame(this.bindResetGame);

        this.bindSetBotTurn = this.bindSetBotTurn.bind(this);
        this.view.bindSetBotTurn(this.bindSetBotTurn);

        this.bindApplyOptions = this.bindApplyOptions.bind(this);
        this.model.bindApplyOptions(this.bindApplyOptions);
    }

    bindFindFirstEmptySpot(board, row){
        return this.model.findFirstEmptySpot(board, row);
    }

    bindGetMatrix(){
        return this.model.getMatrix();
    }

    bindIsRowFull(board, row){
        return this.model.isRowFull(board, row)
    }

    bindGetFirstPlayerToPlay(){
        return this.model.getFirstPlayerToPlay();
    }

    bindSetMatrixElement(line, row, value){
        this.model.setMatrixElement(line, row, value);
    }

    bindPlayTurn(row){
        this.model.playTurn(row);
    }

    bindAddToken(row, line, player){
        this.view.addToken(row, line, player);
    }

    bindResetGame(){
        this.model.resetGame();
    }

    bindSetBotTurn(turn){
        this.model.setBotTurn(turn);
    }

    bindApplyOptions(){
        this.view.applyOptions();
    }
}

const app = new Controller(new Model(), new View());


export default class{};
