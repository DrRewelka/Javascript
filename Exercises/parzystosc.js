var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var checkParity = function(a) { return a % 2 == 0; };
console.log(arr.filter(checkParity));