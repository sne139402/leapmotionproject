(function(){
  
  var canvas = document.getElementsByTagName('canvas')[0],
      ctx = canvas.getContext('2d'),
      lastPosition, toolId;


  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  
  ctx.translate(canvas.width/2, canvas.height);

  ctx.strokeStyle = "rgba(255,0,0,0.9)";
  ctx.lineWidth = 2;

  function draw(frame){
    var tool, currentPosition, i, len;
    if(toolId !== undefined){
     
      tool = frame.tool(toolId);
   
      if(tool.valid){

        currentPosition = tool.tipPosition;
  
        if(currentPosition.z < 0){
         
          ctx.beginPath();
          ctx.moveTo(lastPosition.x, -lastPosition.y);
          ctx.lineTo(currentPosition.x, -currentPosition.y);
          ctx.stroke();
        }
      
        lastPosition = currentPosition;
      }else{
   
        toolId = undefined;
        lastPosition = undefined;
      }
    }else{
      if(frame.tools.length > 0){
        tool = frame.tools[0];
        toolId = tool.id;
        lastPosition = tool.tipPosition;
      }

      if(frame.gestures.length > 0){
        for(i=0, len=frame.gestures.length; i<len; i++){
          if(frame.gestures[i].type === 'swipe' && frame.gestures[i].state === 'stop'){
            ctx.clearRect(-canvas.width/2,-canvas.height,canvas.width,canvas.height);
          }
        }
      }
    }
  }


  Leap.loop({ enableGestures: true }, draw);
})();

