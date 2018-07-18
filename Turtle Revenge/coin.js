function Coin(x, y)
{
	var coin = new Sprite(24, 24);
			
	coin.image = game.assets['Graphics/coin.png'];

	coin.x = x;
	coin.y = y;

	coin.pickedUp = false;

	coin.addEventListener('enterframe', function(e)
    {
    	coin.scaleX = Math.sin(coin.age * 0.1);
    	if(player.within(this, 20))
		{
			if(this.pickedUp == false)
			{
				stage.coinSound.play();
				player.score += 100;
				updateScore();
				stage.removeChild(this);
				this.pickedUp = true;
			}
		}
    })

	return coin;
}