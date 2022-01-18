import Controller from './Controller';
class View {
  /** @type {HTMLCanvasElement}*/grid;
  /** @type {CanvasRenderingContext2D}*/gridCtx;
  tokens;
  tokensCtx;
  constructor(){
    this.grid = document.getElementById('grid');
    this.gridCtx = this.grid.getContext('2d');
    this.tokens = document.getElementById('gridTokens');
    this.tokensCtx = this.tokens.getContext('2d');
  }

  drawGrid(){
    this.gridCtx.clearRect(0, 0, 10000, 1000);
    this.gridCtx.rect(0, 0, 800, 700);
    this.gridCtx.fillStyle = 'blue';
    this.gridCtx.fill();
    

    let x = 100;
    let y;
    this.gridCtx.globalCompositeOperation = 'destination-out';
    for (let v = 0; v < 7; v++) {
      y=100;
      for (let h = 0; h < 6; h++) {
        
        this.gridCtx.beginPath();
        this.gridCtx.arc(x, y, 40, 0, Math.PI*2, true);
        this.gridCtx.closePath();
        this.gridCtx.fillStyle = "rgba(255,255,255,1)";
        this.gridCtx.fill();
        y += 100;
      }
      x += 100;
    }
    this.grid.globalCompositeOperation = 'source-over';

  }

  drawCircle(){
    let x = 100;
    let y;
    for (let v = 0; v < 7; v++) {
      y=100;
      for (let h = 0; h < 6; h++) {
        this.gridCtx.beginPath();
        this.gridCtx.arc(x, y, 40, 0, Math.PI*2, true);
        this.gridCtx.closePath();
        this.gridCtx.fillStyle = 'white';
        this.gridCtx.fill();
        y += 100;
      }
      x += 100;
      console.log(x,y);
    }
  }

  bindFindFirstEmptySpot(callback){
    this.FindFirstEmptySpot = callback;
  }

  moveToken(y, row, color){
    this.tokensCtx.beginPath();
    this.tokensCtx.clearRect(0, 0, 10000, 10000);
    this.tokensCtx.closePath();
    this.tokensCtx.fillStyle = 'white';
    this.tokensCtx.fill();

    this.tokensCtx.beginPath();
    this.tokensCtx.arc(100*(1+row), y + 10, 40, 0, Math.PI*2, true);
    this.tokensCtx.closePath();
    this.tokensCtx.fillStyle = color;
    this.tokensCtx.fill();
  }
  
  async addToken(row, line, player){
    let color;
    if (player == 1) color = 'red';
    else color = 'yellow';
    let y = 100;
    this.tokensCtx.beginPath();
    this.tokensCtx.arc(100*(1 + row), 100 + 10 * line, 40, 0, Math.PI*2, true);
    this.tokensCtx.closePath();
    this.tokensCtx.fillStyle = color;
    this.tokensCtx.fill();

    while (y <= (line + 1) * 100 - 10){
      await sleep(10);
      this.moveToken(y, row, color);
      y += 10;
    }
    
  }
  testViewClick(){
    console.log("Click");
  }

  initEvents(){
    let b0 = document.getElementById("b0");
    b0.addEventListener('click', () => {
      let line = Controller.callFindFirstEmptySpot(Controller.getBoard(), 0);

    });
    let b1 = document.getElementById("b1");
    b1.addEventListener('click', () => {
      this.testViewClick();
    });
    let b2 = document.getElementById("b2");
    b2.addEventListener('click', () => {
      this.testViewClick();
    });
    let b3 = document.getElementById("b3");
    b3.addEventListener('click', () => {
      this.testViewClick();
    });
    let b4 = document.getElementById("b4");
    b4.addEventListener('click', () => {
      this.testViewClick();
    });
    let b5 = document.getElementById("b5");
    b5.addEventListener('click', () => {
      this.testViewClick();
    });
    let b6 = document.getElementById("b6");
    b6.addEventListener('click', () => {
      this.testViewClick();
    });
}
}


function sleep(time){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

let view = new View()
view.drawGrid();
//view.drawCircle();
view.initEvents();
view.addToken(0, 4, 1);


export default class{};