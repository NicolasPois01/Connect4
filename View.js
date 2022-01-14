class View {
    constructor(){}
}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


function drawgrid() {
  ctx.rect(10, 100, 780, 680);
  ctx.fillStyle = 'blue';
  ctx.fill();
}




function drawcircle() {
  let x = 100;
  let y = 200;
  for (let v = 0; v < 7; v++) {
    y=200;
    for (let h = 0; h < 6; h++) {
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fillStyle = 'white';
      ctx.fill();
      y=y+100;
    }
    x=x+100;
    console.log(x,y)

  }
}

drawgrid();
drawcircle();