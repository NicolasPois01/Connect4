import Model from './Model.js';
import View from './View.js';
class Controller {
    model;
    view;
    board;
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.bindFindFirstEmptySpot = this.bindFindFirstEmptySpot.bind(this);
        this.view.bindFindFirstEmptySpot(this.bindFindFirstEmptySpot);
    }

    bindFindFirstEmptySpot(board, row){
        return this.model.findFirstEmptySpot(board, row);
    }

    updateBoard(board){
        this.board = board;
    }
    getBoard(){
        return this.board;
    }

    callFindFirstEmptySpot(board, row){
        return this.model.findFirstEmptySpot(board, row);
    }
}

const model = new Model();
const view = new View();
const app = new Controller(model, view);

export default class{};
