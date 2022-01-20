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

    getBoard(){
        return this.board;
    }
}

const app = new Controller(new Model(), new View());


export default class{};
