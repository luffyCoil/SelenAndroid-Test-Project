
    var canvas = UI.makeCanvas();//.css('background-color', 'red');
    var ctx = UI.get2DContext(canvas);
    var bgReady = false;
    var heroReady = false;
    var monsterReady =  false;
    var bgImgjq = UI.makeImg('image-elemente', "resources/background/background.png").load(function(){ bgReady = true; });
    var heroSpriteImgjq = UI.makeImg('image-elemente', "resources/sprites/hero.png").load(function(){ heroReady = true; });
    var monsterSpriteImgjq = UI.makeImg('image-elemente', "resources/sprites/monster.png").load(function(){ monsterReady = true; });
      
    $('body').append(canvas)
    
    var hero = {
      speed: 256, // movement in pixels per second
      x: 0,
      y: 0
    };
    var monster = {
      x: 0,
      y: 0
    };
    var monstersCaught = 0;
    var reset = function(){
      hero.x = canvas.width / 2;
      hero.y = canvas.height / 2;
      
      //Throw the monster somewhere on the screen randomly
      monster.x = 32 + (Math.random() * (canvas.width - 64));
      monster.y = 32 + (Math.random() * (canvas.height  - 64));
    };
    
    var keysDown = {};
    $(document)
    .keydown(function(e){
      keysDown[e.keyCode] = true;
    })
    .keyup(function(e){
      delete keysDown[e.keyCode];
    });
    
    // modifier is a time-based number based on 1
    var update = function(modifier){
      if(38 in keysDown) { //player holding up key
        hero.y -= hero.speed * modifier;
      }
      if (40 in keysDown) { // Player holding down key
        hero.y += hero.speed * modifier;
      }
      if (37 in keysDown) { // Player holding left key
        hero.x -= hero.speed * modifier;
      }
      if (39 in keysDown) { // Player holding right key
        hero.x += hero.speed * modifier;
      }

      // Are they touching?
      if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
      ) {
        ++monstersCaught;
        reset();
      }
      
    };
    
    // Draw everything
    var render = function () {
      
        console.log("calling render");
        if (bgReady) {
          
          ctx.drawImage(bgImgjq[0], 0, 0);
        }

        if (heroReady) {
          
          ctx.drawImage(heroSpriteImgjq[0], hero.x, hero.y);
        }

        if (monsterReady) {
          ctx.drawImage(monsterSpriteImgjq[0], monster.x, monster.y);
        }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
    };
    
    // The main game loop
    var main = function () {
      var now = Date.now();
      var delta = now - then;

      update(delta / 1000);
      render();

      then = now;

      // Request to do this again ASAP
      requestAnimationFrame(main);
    };
    
    // Cross-browser support for requestAnimationFrame
    var w = window;
    requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

    // Let's play this game!
    var then = Date.now();
    reset();
    main();
