class Game {
  constructor(){
  
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,200);
    player1.addImage("player1",car1_img);
    player2 = createSprite(300,200);
    player2.addImage("player2",car2_img);
    player3 = createSprite(500,200);
    player3.addImage("player3",car3_img);
    player4 = createSprite(700,200);
    player4.addImage("player4",car4_img);
    players = [player1, player2, player3, player4];

   
    
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

     

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;
       // console.log(index, player.index)

       
   
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y;
          fill ("black");
          textSize(20);
          text(allPlayers[plr].name, x-25, y+65);

          //textSize(25);
       //fill("white");
       //text("player 1 :" +allPlayers.player1.score, x-25, y+85);
       //text("player 2 :" +allPlayers.player2.score, x-25, y+105);
       //text("player 3 :" +allPlayers.player3.score, x-25, y+125);
       //text("player 4 :" +allPlayers.player4.score, x-25, y+145);
        }
      
        fill ("black");
        textSize(20);
        text(allPlayers[plr].score, x-5, y+85);
        
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
      //carSound.play();
    }

    if(keyIsDown(RIGHT_ARROW) ){
       player.velocityX=-9;
       player.velocityY=0;
    }
   
    if(keyIsDown(LEFT_ARROW) ){
      player.velocityX=+10;
      player.velocityY=0;
    }

    if (frameCount%200===0){
      obstacle=createSprite(random(100,1000),100, 100,);
      obstacle.velocityY=15;
      var rand=Math.round(random(1,2));
      switch(rand){
      case 1:obstacle.addImage("obstacle1",obstacle1_img);
      break;
      case 2:obstacle.addImage("obstacle2",obstacle2_img);
      break;
      
      }
      player.depth = obstacle.depth +1;
      obstacle.scale=0.1;
     obstacleGroup.add(obstacle);
      
      }

     
      if (player.index !==null){
        for (var i=0; i < obstacleGroup.length; i++){
          if (obstacleGroup.get(i).isTouching(players)){
            obstacleGroup.get(i).destroy();
            //coinGroup.destroyEach();
            //obstacleGroup.destroyEach();
            //textSize(30);
            //fill("blue");
            //text("Game Over!", 300,220);
          crashSound.play();
          //gameState=2;
          }
        }
      } 



if (frameCount%200===0){
  coin=createSprite(random(100,1000),100, 100,);
  coin.velocityY=15;
  var rand=Math.round(random(1,1));
  switch(rand){
  case 1:coin.addImage("coin",coin_img);
  break;

  }
  player.depth = coin.depth +1;
  coin.scale=0.3;
 coinGroup.add(coin);
  
  }

  if (player.index !==null){
    for (var i=0; i < coinGroup.length; i++){
      if (coinGroup.get(i).isTouching(players)){
        coinGroup.get(i).destroy();
        player.score=player.score+1;
        player.update();
        coinSound.play();
      }
    }
  }
  
  
      
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
      
    }
    
    drawSprites();
  }


  end(){
  
    player.visible=false;
        
    console.log("Game Ended");
    console.log(player.rank);
  }
  
  }


