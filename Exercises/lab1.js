var checker = function(size)
{
  var line;
  var symbol;
  for(var x = 0; x < size; x++)
  {
    symbol = x % 2 == 0 ? '#' : ' ';
    line = '';
    for(var y = 0; y < size; y++)
      {
        line += symbol;
        symbol = symbol == '#' ? ' ' : '#';
      }
    console.log(line);
  }
}

console.log(checker(8));
console.log(checker(15));

var minimum = function (a, b)
{
  if(a < b)
    return a;
  if(b < a)
    return b;
}
console.log(minimum(5, 10));
console.log(minimum(15, 7));

var parity = function(a)
{
  if(a == 2)
    return true;
  else if(a == 1)
    return false;
  else
    return parity(a - 2);
}

console.log(parity(2));
console.log(parity(15));
console.log(parity(24));

var charCounter = function(s)
{
  var counter = 0;
  while(s.charAt(counter) != '')
    counter++;
  return counter;
}

console.log(charCounter("qwert"));
console.log(charCounter("1234567890"));
console.log(charCounter("a"));

function range(start, end)
{
  var array = [];
  var numb = start;
  while(numb <= end)
    {
      array.push(numb);
      numb++;
    }
  function sum()
  {
    var suma = 0;
    for(var i = start; i <= end; i++)
      suma += i;
    return suma;
  }
  return array;
}

console.log(range(1,10)());

var a = [
  [1, 2],
  [3],
  [],
  [4, 5, 6]
];

console.log(a.reduce((a,b) => a.concat(b), []));