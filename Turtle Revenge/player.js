function Player(x,y,lives)
{	
	var player = new Sprite(playerSize,playerSize);
	//settings
	player.movementSpeed = 5;
	player.airSpeed = 6;
	player.maxJumpTime = 1400;
	player.status = 'alive';
    //position
    player.x = x;
    player.y = y;
    //velocity
    player.velY = 0;
	player.dirX = 0;
	player.dirY = 0;
    //image
    player.pose = 0;
    player.image = game.assets['Graphics/player.png'];
    //jump
	player.isJumping = false;
	player.jumpTime = 0;
	//death
	player.deathAnimationTime = 1200;
	player.deathAnimationTimer = 0;
	//points
	player.score = currentScore;
	//onions
	player.onions = 0;
	player.invTime = 0;
	//hp
	player.maxLives = 3;
	player.lives = lives == undefined ? player.maxLives : lives;
	player.hearts = [];

    for(var i = 0; i < player.maxLives; i++)
    {
        player.hearts[i] = new Sprite(16,16);
        player.hearts[i].image = game.assets['Graphics/heart.png'];
        player.hearts[i].x = (i + 1) * 20;
        player.hearts[i].y = 20;
        player.hearts[i].frame = player.lives > i ? 0 : 1;
        ui.addChild(player.hearts[i]);
    }


    player.addEventListener('enterframe', function(e)
    {
    	if(player.status == 'alive')
    	{
    		//Input
	    	if (game.input.left) this.dirX = -1;
	        else if (game.input.right) this.dirX = 1;
	        else this.dirX = 0;

	        if(game.input.up && (HitTest(-0.4,1) || HitTest(0.4,1))) 
	        {
	        	stage.jumpSound.play();
	        	stage.jumpSound.volume = 0.15;
	    		this.jumpTime = this.maxJumpTime;
	        }

	        var prizeBlockHit = false;
	        var pos = {x:0,y:0}
	    	if(map.hitTest(this.x + 4, this.y - 16))
	    	{
	    		pos.x = Math.floor((this.x + 4)/blockSize);
	    		prizeBlockHit = map.checkTile(this.x + 4, this.y - 16) == 2;
	    	}
	    	else if(map.hitTest(this.x + 20, this.y - 16))
	    	{
	    		pos.x = Math.floor((this.x + 20)/blockSize);
				prizeBlockHit = map.checkTile(this.x + 20, this.y - 16) == 2;
	    	}

	    	pos.y = Math.floor((this.y - 16)/32);

	    	if(prizeBlockHit)
	    	{
	    		map._data[0][pos.y][pos.x] = 7;
    			map.loadData(map._data[0]);
    			var onion = new Onion(pos.x * 32, pos.y * 32 - 32);
    			stage.addChild(onion);
	    	}

	    	//Air Velocity
			this.velY = (this.jumpTime/this.maxJumpTime) * -this.airSpeed + (1 - this.jumpTime/this.maxJumpTime) * this.airSpeed;
			this.jumpTime -= e.elapsed;
			this.jumpTime = Math.max(0, this.jumpTime);
			if(this.velY >= 0) this.dirY = 1;
		    else this.dirY = -1;

	        if (this.dirX != 0) this.scaleX = this.dirX;

	        //Animation
	        if(game.frame % 5 == 0)
	        {
	        	this.pose++;
	        	this.pose %= 2;
		    }

		    this.frame = this.pose;				//idle
	    	this.frame += 						
	    		(this.dirX != 0 ? 2 : 0) + 		//movement
	    		(this.onions > 0 ? 5 : 0);		//buffed

		    //Collision
		    if(!HitTest(this.dirX, -0.4) && !HitTest(this.dirX, 0.4))
		    {
		    	this.x += this.movementSpeed * this.dirX;
		    	playerCollision.x = this.x;
		    }
		    if(!HitTest(-0.4, this.dirY) && !HitTest(0.4, this.dirY))
		    {
				this.y += this.velY;
				playerCollision.y = this.y + playerSize;
		    }
			else
				jumpTime = 0;

	    	//Death cases
	    	if(this.y > levelBottom - 64)
	    		this.status = 'dead';
		}
		else if (this.status == 'dead')
		{
			player.hearts[Math.max(0,player.lives-1)].frame = 1;
			if(this.deathAnimationTimer < this.deathAnimationTime)
			{
				this.deathAnimationTimer += e.elapsed;
				this.y += 20*((this.deathAnimationTimer - this.deathAnimationTime/2.3)/this.deathAnimationTime);
				this.frame = this.onions > 0 ? 9 : 4;
			}
			else
			{
				if(--player.lives <= 0)
				{
					NextLevel(1, new Player(0,0));
					screen(gameOverText, "score: " + this.score, "Click to start the game");
				}
				else
					NextLevel(currentLevel, new Player(0,0,player.lives));
			}
		}
    });

	function HitTest(dirX, dirY)
	{
		return map.hitTest(player.x + playerSize/2 + playerSize/2 * dirX, player.y + playerSize/2 + playerSize/2 * dirY);
	}

    return player;
}

function PlayerCollision(x, y)
{
	var playerCollision = new Sprite(34, 1);

	playerCollision.x = x;
	playerCollision.y = y;

	return playerCollision;
}