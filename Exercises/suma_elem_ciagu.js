var n = prompt("Podaj liczbê:");
var sumOfSequenceAdd = function(n)
{
  var suma = 0;
  if(n == 0)
    return 0;
  else
    {
      for(var i = 1; i <= n; i++)
        {
          if(i > 0 && i <= 10)
            suma += 100;
          else if(i > 10 && i < 100)
            suma += (i - 2);
          else if(i >= 100 && i % 2 == 0)
            suma += (i / 2);
          else
            suma += 1;
        }
      return suma;
    }
}
console.log(sumOfSequenceAdd(n));

var m = n;
var sumOfSequenceRec = function(n, m)
{
  var suma = 0;
  if(n == 0)
    return 0;
  if(m != 0)
  {
    if(m > 0 && m <= 10)
      {
        suma += 100;
        return suma + sumOfSequenceRec(n, m - 1);
      }
    else if(m > 10 && m < 100)
      {
        suma += (m - 2);
        return suma + sumOfSequenceRec(n, m - 1);
      }
    else if(m >= 100 && m % 2 == 0)
      {
        suma += (m / 2);
        return suma + sumOfSequenceRec(n, m - 1);
      }
    else
      {
        suma += 1;
        return suma + sumOfSequenceRec(n, m - 1);
      }
  }
  else
    return 0;
}
console.log(sumOfSequenceRec(n, m));