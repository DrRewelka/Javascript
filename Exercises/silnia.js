var n = prompt("Podaj liczb�: ");
var factorialAdd = function(n)
{
  var factorial = 1;
  for(var i = 2; i <= n; i++)
      factorial *= i;
  return factorial;
}
console.log(factorialAdd(n));

var factorialRec = function(n)
{
  if(n <= 1) return 1;
  else return n * factorialRec(n - 1);
}
console.log(factorialRec(n));