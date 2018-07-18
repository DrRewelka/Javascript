function square(x)
{
  try
  {
    if(x % 2 == 1)
      return console.log(x * x);
    else throw x + " Funkcja nie obs³uguje liczb parzystych."
    
  }
  catch(err){
    console.log(err);
  }
}

for(var i = 0; i < 100; i++)
  square(i);