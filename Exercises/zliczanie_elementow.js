var arr = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
var elementCount = function(arr, c)
{
  var counter = 0;
  for(var i = 0; i < arr.length; i++)
    {
      if(arr[i] == c)
        counter++;
    }
  return counter;
}
console.log(elementCount(arr, "a"));