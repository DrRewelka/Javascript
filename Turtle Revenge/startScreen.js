function screen()
{
	var startScene = new Scene();
	var currentPosY = 20;

	var bg = new Sprite(windowSize, windowSize);
	bg.image = game.assets['Graphics/mainScreen.png'];
	startScene.addChild(bg);
	for (var i = 0; i < arguments.length; i++)
	{
		if(!(arguments[i] instanceof Sprite))
		{
			var text = new Label(arguments[i]);
			text.textAlign = 'center';
			text.x = 80;
			text.y = currentPosY;
			text.color = 'white';
			currentPosY = text.y + 20;
			startScene.addChild(text);
		}
		else
		{
			arguments[i].x = windowSize/2 - arguments[i].width/2;
			arguments[i].y = currentPosY;
			currentPosY += arguments[i].height;
			startScene.addChild(arguments[i]);
		}
	}

	startScene.addEventListener('touchend', function() {
  		game.popScene();
	});
	game.pushScene(startScene);
}