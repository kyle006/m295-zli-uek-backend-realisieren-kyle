async function simuliereVerzögerung(ms) {
  await new Promise(resolve => setTimeout(resolve, ms));
}

async function addiereNachVerzoegerung(a, b, ms) {
  await simuliereVerzögerung(ms);
  console.log(a + b);
}

addiereNachVerzoegerung(3, 7, 2000);

