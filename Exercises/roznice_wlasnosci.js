var a = { x: 1, y: 1, z: 1 };
var b = { w: 2, x: 2, z: 2 };

var propertyDiff = function(a, b)
{
  var counter = 0;
  var propDiff = [];
  var i = 0;
  for(var propA in a)
    {
      for(var propB in b)
        {
          if(propA == propB)
              counter++;
        }
      if(counter == 0)
        {
          propDiff[i] = propA;
          i++;
        }
      counter = 0;
    }
  return propDiff;
}

console.log(propertyDiff(a, b).concat(propertyDiff(b,a)));