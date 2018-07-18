function Enemy(x, y)
{
	var enemy = new Sprite(32, 32);

	enemy.frame = 0;
	enemy.image = game.assets['Graphics/mario.png'];

	enemy.x = x;
	enemy.y = y;

	enemy.velX = 0;
	enemy.movementSpeed = 4;
	enemy.movingRight = true;
	enemy.movingLeft = false;

	enemy.addEventListener('enterframe', function(e)
	{
		moveEnemy(this);
		damagePlayer(this, e);
	});

	return enemy;
}

function moveEnemy(enemy, e)
{
	var dirX = 0, dirY = 0;
	if(enemy.movingRight == true)
	{
		dirX = 1;
		if(game.frame % 5 == 0)
		{
			enemy.frame++;
			enemy.frame %= 2;
		}
		enemy.velX = enemy.movementSpeed;
		if(!HitTest(dirX, -0.4) && !HitTest(dirX, 0.4))
		{
			enemy.x += enemy.velX;
			if(!map.hitTest(enemy.x + 20, enemy.y + 32))
			{
				enemy.scaleX = -1;
				enemy.movingRight = false;
				enemy.movingLeft = true;
			}
		}
		else
		{
			enemy.scaleX = -1;
			enemy.movingRight = false;
			enemy.movingLeft = true;
		}
	}
	else if(enemy.movingLeft == true)
	{
		dirX = -1;
		if(game.frame % 5 == 0)
		{
			enemy.frame++;
			enemy.frame %= 2;
		}
		enemy.velX = -enemy.movementSpeed;
		if(!HitTest(dirX, -0.4) && !HitTest(dirX, 0.4))
		{
			enemy.x += enemy.velX;
			if(!map.hitTest(enemy.x, enemy.y + 32))
			{
				enemy.scaleX = 1;
				enemy.movingRight = true;
				enemy.movingLeft = false;
			}
		}
		else
		{
			enemy.scaleX = 1;
			enemy.movingRight = true;
			enemy.movingLeft = false;
		}
	}

	function HitTest(xDir, yDir)
	{
		return map.hitTest(enemy.x + blockSize/2 + blockSize/2 * xDir, enemy.y + blockSize/2 + blockSize/2 * yDir);
	}
}

function damagePlayer(enemy, e)
{
	if(player.status == 'alive')
	{
		if(enemy.within(player, 32))
		{
			if(enemy.within(playerCollision, 26) && player.invTime <= 0)
			{
				stage.marioDeathSound.play();
				stage.removeChild(enemy);
				player.score += 200;
				updateScore();
				player.jumpTime = player.maxJumpTime;
			}
			else
			{
				if(player.onions > 0)
				{
					player.onions = 0;
					player.invTime = 2500;
					player.movementSpeed = 5;
					player.maxJumpTime = 1400;
					player.airSpeed = 6;
				}
				else if(player.onions == 0 && player.invTime <= 0)
				{
					stage.marioKillSound.play();
					player.status = 'dead';
				}
			}
		}
		player.invTime--;
		if(player.invTime > 0)
			player.opacity = 0.5;
		else
			player.opacity = 1;
	}
}