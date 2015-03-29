(function(){

  var canvas = document.getElementsByTagName('canvas')[0],
      ctx = canvas.getContext('2d'),
      info = document.getElementById('data'),
      radius = 10;


  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;


  ctx.translate(canvas.width/2, canvas.height);

  ctx.fillStyle = "rgba(0,0,0,0.9)";
  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 5;

  function draw(frame) {

    var data = [],
        pos, i, len;

   
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.fillRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);

    ctx.fillStyle = "rgba(0,0,0,0.9)";

 
    for (i=0, len=frame.pointables.length; i<len; i++) {
 
      pos = frame.pointables[i].tipPosition;

   
      data.push(pos);

  
      ctx.beginPath();
      ctx.arc(pos.x-radius/2 ,-(pos.y-radius/2),radius,0,2*Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    
    info.innerHTML = data.join(', ');
  };

 
  Leap.loop(draw);
})();
