function square(x)
{ 
  return (x * x); 
}

function double(x)
{ 
  return (x * 2); 
}

function f(f1, f2)
{
  return function val(a)
  {
    return f1(f2(a));
  }
}

var preTest = f(square, double);
var test = preTest(3);
console.log(test);