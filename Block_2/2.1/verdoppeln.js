function verdoppeln(number, callback){
    number *= 2;
    callback(number);
}
verdoppeln(5, function(result) {
    console.log('Das Ergebnis ist:', result);
  });