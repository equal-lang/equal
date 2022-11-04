function fib(n) {
  if (n < 2) return n;
  return (fib(n-2) + fib(n-1));
}

var i = 0;
while (i < 20) {
  console.log(fib(i));
  i = i + 1;
}