function Onion(x, y)
{
	var onion = new Sprite(32, 32);
			
	onion.image = game.assets['Graphics/onion.png'];

	onion.x = x;
	onion.y = y;
	onion.velX = 0;
	onion.velY = 0;
	onion.movementSpeed = 4.5;
	onion.airSpeed = 5;
	onion.maxJumpTime = 1200;
	onion.jumpTime = onion.maxJumpTime;
	onion.flying = true;
	onion.isJumping = true;
	onion.movingRight = true;
	onion.movingLeft = false;

	onion.pickedUp = false;

	onion.addEventListener('enterframe', function(e)
	{
		buffPlayer(this);
		moveOnion(this, e);
	});

	return onion;
}

function moveOnion(onion, e)
{
	var dirX = 0, dirY = 0;
	
	if(onion.isJumping == true)
	{
		if(onion.jumpTime <= 0)
		{
			onion.isJumping = false;
			onion.movingRight = true;
		}

		onion.velY = (onion.jumpTime/onion.maxJumpTime) * -onion.airSpeed + (1 - onion.jumpTime/onion.maxJumpTime) * onion.airSpeed;
		onion.jumpTime -= e.elapsed;
		onion.jumpTime = Math.max(0, onion.jumpTime);
		if(onion.velY >= 0) dirY = 1;
		else dirY = -1;
		if(!HitTest(-0.4, dirY*1.1) && !HitTest(0.4, dirY*1.1))
			onion.y += onion.velY;
	}
	if(onion.isJumping == false && onion.movingRight == true)
	{
		dirX = 1;
		onion.velX = onion.movementSpeed;
		if(!HitTest(dirX, -0.4) && !HitTest(dirX, 0.4))
		{
			onion.x += onion.velX;
			if(!map.hitTest(onion.x + 20, onion.y + 32))
				onion.y += onion.velY;
		}
		else
		{
			onion.scaleX = -1;
			onion.movingRight = false;
			onion.movingLeft = true;
		}
	}
	else if(onion.isJumping == false && onion.movingLeft == true)
	{
		dirX = -1;
		onion.velX = -onion.movementSpeed;
		if(!HitTest(dirX, -0.4) && !HitTest(dirX, 0.4))
		{
			onion.x += onion.velX;
			if(!map.hitTest(onion.x, onion.y + 32))
				onion.y += onion.velY;
		}
		else
		{
			onion.scaleX = 1;
			onion.movingRight = true;
			onion.movingLeft = false;
		}
	}

	function HitTest(xDir, yDir)
	{
		return map.hitTest(onion.x + blockSize/2 + blockSize/2 * xDir, onion.y + blockSize/2 + blockSize/2 * yDir);
	}
}

function buffPlayer(onion)
{
	if(player.within(onion, 26))
	{
		if(player.onions == 0)
		{
			stage.buffedSound.play();
			player.score += 300;
			player.invTime = 1500;
			player.movementSpeed = 7;
			player.maxJumpTime = 2000;
			player.airSpeed = 7;
		}
		else if(player.onions > 0)
		{
			stage.onionSound.play();
			player.score += 1000;
		}
		
		player.onions += 1;

		stage.removeChild(onion);
		updateScore();
	}
}