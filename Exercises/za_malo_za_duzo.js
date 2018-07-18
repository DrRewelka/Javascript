var number = Math.floor(Math.random() * 100 + 1);
var lower = 1;
var higher = 100;
do
  {
    if(userNumber < number)
      {
        console.log("Za mało!");
        lower = lower < userNumber ? userNumber : lower;
      }
    else if(userNumber > number)
      {
        console.log("Za dużo!");
        higher = higher > userNumber ? userNumber : higher;
      }
    var userNumber = prompt("Podaj liczbę całkowitą z zakresu " + lower + " do " + higher);
  }
while (userNumber != number)
console.log("Moja liczba: " + number);
console.log("Brawo! Liczbą jest " + userNumber);