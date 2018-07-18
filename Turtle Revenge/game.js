enchant();

var game;
var player;
var playerCollision;
var scene;
var ui;
var stage;
var scoreLabel = new Label("Score: 0");

var blockSize = 32;
var playerSize = 32;

var playerOffset = 190;
var windowSize = 460;

var currentScore = 0;

var turtleRevengeText;
var gameOverText;

window.onload = function() 
{
	game = new Game(windowSize,windowSize);
	game.fps = 30;

    game.preload('Graphics/bowser.png','Graphics/turtleRevenge.png','Graphics/gameOver.png','Graphics/blocks.png', 'Graphics/player.png', 'Graphics/playerBuffed.png', 'Graphics/heart.png', 'Graphics/coin.png', 'Graphics/onion.png', 'Graphics/levelEntrance.png', 'Graphics/mario.png', 
    'Music/forest.mp3', 'Music/factory.mp3', 'Music/coin.wav', 'Music/onion.mp3', 'Music/jump.wav', 'Music/marioKill.mp3', 'Music/marioDeath.wav', 'Music/buffed.mp3',
    'Levels/level1.png', 'Levels/level2.png',
    'Graphics/mainScreen.png');

    game.onload = function()
    {
        ui = new Group();
        scene = new Scene();
        LoadLevel(game.assets['Levels/level1.png'], new Player(0,0), 'Music/forest.mp3');

        turtleRevengeText = new Sprite(256,64);
        turtleRevengeText.image = game.assets['Graphics/turtleRevenge.png'];
        gameOverText = new Sprite(256,64);
        gameOverText.image = game.assets['Graphics/gameOver.png'];

        scoreLabel;
        scoreLabel.x = 100;
        scoreLabel.y = 20;
        scoreLabel.textAlign = 'right';
        ui.addChild(scoreLabel);

        var cameraMoveTime = 500;
        var cameraMoveTimer = cameraMoveTime;

        SetStage(0);
        game.addEventListener('enterframe', function(e) 
        {   
            if(stage.bgm.currentTime >= stage.bgm.duration)
                stage.bgm.play();
        	SetStage(e);
        });

        scene.addChild(stage);
        scene.addChild(ui);
        game.pushScene(scene);

        var sp = new Sprite(32,32);
        sp.image = game.assets['Graphics/onion.png'];
        screen(turtleRevengeText,"Click to start the game");

        function SetStage(e)
		{
			var left = -player.x + playerOffset;
			var right = -player.x + windowSize - playerOffset - playerSize;

    		stage.x = left * (cameraMoveTimer/cameraMoveTime) + right * (1-cameraMoveTimer/cameraMoveTime);

	    	if(player.velX > 0 && left < stage.x)
	    		cameraMoveTimer += e.elapsed;
	    	else if(player.velX < 0 && right > stage.x)
	    		cameraMoveTimer -= e.elapsed;

	    	if(cameraMoveTimer > cameraMoveTime) cameraMoveTimer = cameraMoveTime;
	    	else if(cameraMoveTimer < 0) cameraMoveTimer = 0;

	    	if(player.y <= levelBottom - 160)
	    		stage.y = -player.y + windowSize - 160;
		}
    };
    game.start();
}

function updateScore()
{
    scoreLabel.text = "Score: " + player.score;
}