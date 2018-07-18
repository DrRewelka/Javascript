var currentArray = [1, 2, 3, 4, 5, [12, 23, [56, 67]], [34, 45]];

var arrayCopy = function(arr)
{
  var newArray = [];
  for(var i = 0; i < arr.length; i++)
    {
      if(Array.isArray(arr[i]))
        newArray[i] = arrayCopy(arr[i]);
      else
        newArray[i] = arr[i];
    }
  return newArray;
}

var newArr = arrayCopy(currentArray);

console.log(currentArray);
console.log("==========");
console.log(newArr);