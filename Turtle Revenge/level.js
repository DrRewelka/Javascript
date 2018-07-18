var currentLevel = 1;
var levelBottom;

var map;
var coins = [];
var enemies = [];

var changeMusic = false;

function LoadLevel(level, pl, music)
{
	if(stage != undefined)
		stage.removeChild(pl);
	stage = new Group();

	var data = LoadMap(level, game.assets['Graphics/blocks.png']);
	map = new Map(blockSize,blockSize);
	player = pl; 
	player.x = data.playerSpawn.x;
	player.y = data.playerSpawn.y;
	player.status = 'alive';
	playerCollision = new PlayerCollision(data.playerSpawn.x, data.playerSpawn.y + 31);
	updateScore();

    //Music
    stage.bgm = game.assets[music];
    stage.bgm.play();
    stage.jumpSound = game.assets['Music/jump.wav'];
    stage.coinSound = game.assets['Music/coin.wav'];
    stage.onionSound = game.assets['Music/onion.mp3'];
    stage.marioDeathSound = game.assets['Music/marioDeath.wav'];
    stage.marioKillSound = game.assets['Music/marioKill.mp3'];
    stage.buffedSound = game.assets['Music/buffed.mp3'];

	//Map
	map.image = game.assets['Graphics/blocks.png'];
	map.loadData(data.level);
	map.collisionData = data.collision;
	levelBottom = data.levelBottom;

	//Entrance
	if(data.entrance.nextLevel != -1)
	{
		var entranceImg = game.assets['Graphics/levelEntrance.png'];
		var entrance = new Sprite(entranceImg.width, entranceImg.height);
		entrance.image = entranceImg;
		entrance.x = data.entrance.x - entranceImg.width/2;
		entrance.y = data.entrance.y - entranceImg.height + 32;

		entrance.addEventListener('enterframe', function(e)
		{
			if(player.x > this.x + this.width/2 - 32)
				player.status = 'enteringLevel';
			if(player.status == 'enteringLevel')
			{
				player.opacity = Math.max(0, player.opacity - (e.elapsed/2)/1000);
				if(player.opacity == 0)
				{
					currentScore = player.score;
					NextLevel(data.entrance.nextLevel, player);
					changeMusic = true;
				}
			}
		});
		stage.addChild(entrance)
	}
	else if(data.end.x != -1)
	{
		var bowser = new Sprite(105, 96);
		bowser.image = game.assets['Graphics/bowser.png'];
		bowser.x = data.end.x - bowser.image.width/2;
		bowser.y = data.end.y - bowser.image.height/2;

		bowser.addEventListener('enterframe', function(e)
		{
			if(player.x > bowser.x)
			{
				var sc = player.score;
				NextLevel(1, new Player(0,0));
				screen(gameOverText, "score: " + sc, "Click to start the game");
			}
		});
		stage.addChild(bowser);
	}

    //Extras
    coins = data.coins;
    enemies = data.enemies;

	//Stage
    stage.addChild(map);

    for(var i = 0; i < coins.length; i++)
    	stage.addChild(data.coins[i]);

    for(var i = 0; i < enemies.length; i++)
    	stage.addChild(data.enemies[i]);

    stage.addChild(playerCollision);
    stage.addChild(player);
}

function NextLevel(lvl, pl)
{
	currentLevel = lvl;
    scene.removeChild(stage);
	stage.bgm.stop();
    if(lvl == 2)
    	LoadLevel(game.assets['Levels/level' + lvl + '.png'], pl, 'Music/factory.mp3');
    else
    	LoadLevel(game.assets['Levels/level' + lvl + '.png'], pl, 'Music/forest.mp3');
    scene.addChild(stage);
    scene.removeChild(ui);
    scene.addChild(ui);    
}