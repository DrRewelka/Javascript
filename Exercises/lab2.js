var object = {};
console.log(object.toString);
console.log(object.toString());

var a = {};
a.property1 = 1;
a.property2 = 2;
Object.defineProperty(a, "hiddenProperty", {enumerable: true, value: 99});
for(var key in a)
  {
    console.log(key);
  }
console.log("property1" in a);
console.log("toString" in a);

function Vector(x, y)
{
  return
  {
    get distance()
    {
      return Math.sqrt(this.x * this.y + this.y * this.y);
    },
     
    x: x,
    y: y,
   
    this.plus = function(vector)
    {
      return new Vector(this.x + vector.x, this.y + vector.y);
    },
  
    this.minus = function(vector)
    {
      return new Vector(this.x - vector.x, this.y - vector.y);
    }
  }
}