var presentYear = prompt("Podaj bie��cy rok:");
var birthYear = prompt("Podaj rok urodzenia. Je�eli nie chcesz go podawa�, wpisz '0'");

var ageCalculator = function(presentYear, birthYear)
{
  if(birthYear == null)
    return "Masz 18 lat!";
  else if(birthYear > presentYear)
    return "B��dny rok!";
  else
    return "Masz " + (presentYear - birthYear) + " lat!";
}
if(birthYear == 0)
  console.log(ageCalculator(presentYear));
else
  console.log(ageCalculator(presentYear, birthYear));