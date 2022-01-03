import 'Model.js';
import 'View.js';
class Controller {
    constructor(model, view){
        this.model = model;
        this.view = view;
    }
}

const app = new Controller(new Model(), new View());


function grid(){
    var canvas = document.getElementById('canvas');
    // canvas.beginPath();
    canvas.rect(10, 10, 800, 800);


}
