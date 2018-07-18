function LoadMap(level, blocks)
{
	var mapData = LoadBlocks(level, level.width, level.height);
	return mapData;
}

function LoadBlocks(lvl, sizeX, sizeY)
{
    var levelImage = new Surface(sizeX, sizeY);
    var mapData = {	level:[],
			    	collision:[],
			    	playerSpawn:{x:0,y:0},
			    	entrance:{nextLevel:-1, x:0, y:0},
			    	coins:[],
			    	enemies:[],
			    	levelBottom:0,
			    	end:{x:-1,y:0}};

	levelImage.draw(lvl);

	for(var y = 0; y < sizeY; y++)
	{
		mapData.level.push([]);
		mapData.collision.push([]);
		for(var x = 0; x < sizeX; x++)
		{
			var block = -1;											//Air
			var px = levelImage.getPixel(x,y);
			if(px[0] == 90 && px[1] == 180 && px[2] == 80)			//Grass
				block = 0;
			else if(px[0] == 180 && px[1] == 120 && px[2] == 80)	//Dirt
				block = 1;
			else if(px[0] == 0 && px[1] == 200 && px[2] == 255)		//Water Top
				block = 3;
			else if(px[0] == 0 && px[1] == 150 && px[2] == 255)		//Water
				block = 4;
			else if(px[0] == 120 && px[1] == 160 && px[2] == 120)	//Mossy Cobble
				block = 5;
			else if(px[0] == 100 && px[1] == 100 && px[2] == 100)	//Cobble
				block = 6;
			else if(px[0] == 0 && px[1] == 100 && px[2] == 150)		//Blocks
				block = 7;
			else if(px[0] == 255 && px[1] == 200 && px[2] == 0)		//Lava Top
				block = 8;
			else if(px[0] == 255 && px[1] == 150 && px[2] == 0)		//Lava
				block = 9;
			else if(px[0] == 0 && px[1] == 0 && px[2] == 255)		//Player
			{
				mapData.playerSpawn.x = x * blockSize;
				mapData.playerSpawn.y = y * blockSize;
			}
			else if(px[0] == 1 && px[1] == 1)						//Entrance
			{
				if(px[2] != 255)
				{
					mapData.entrance.nextLevel = px[2];
					mapData.entrance.x = x * blockSize;
					mapData.entrance.y = y * blockSize;
				}
				else
				{
					mapData.end.x = x * blockSize;
					mapData.end.y = y * blockSize;
				}
			}
			else if(px[0] == 100 && px[1] == 0 && px[2] == 150)		//Onion
				block = 2;
			else if(px[0] == 255 && px[1] == 255 && px[2] == 0)		//Coin
			{
				var coin = new Coin(x * blockSize, y * blockSize);
				mapData.coins.push(coin);
			}
			else if(px[0] == 250 && px[1] == 0 && px[2] == 150)		//Enemy
			{
				var enemy = new Enemy(x * blockSize, y * blockSize);
				mapData.enemies.push(enemy);
			}
			if(x == 0 && y == 0)									//Background color
        		scene.backgroundColor = 'rgb('+ px[0] +', '+ px[1] +', '+ px[2] +')';

			mapData.level[y].push(block);
			if(block == -1 || block == 3 || block == 4 || block == 8 || block == 9)
				mapData.collision[y].push(0);
			else
				mapData.collision[y].push(1);
		}
	}
	mapData.levelBottom = mapData.level.length * blockSize;
	return mapData;
}