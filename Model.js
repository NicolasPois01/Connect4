class Model {
    matrix = new Array(7);
    constructor(){
        for (let i = 0; i < 7; ++i){
            this.matrix[i] = new Array(7);
        }
        for (let i = 0; i < 7; ++i){
            for (let j = 0; j < 6; ++j){
                this.matrix[i][j] = 0;
            }
        }
    }

    showMatrix(){
        for (let i = 0; i < 7; ++i){
            for (let j = 0; j < 6; ++j){
                console.log(this.matrix[i][j]);
            }
        }
    }
}

const model = new Model();
model.showMatrix();