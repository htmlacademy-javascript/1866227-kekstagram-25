const getRandomNumber = (firstNumber, secondNumber) => {
  if (secondNumber < firstNumber) {return 0;}
  const min = Math.ceil(firstNumber);
  const max = Math.floor(secondNumber);
  return Math.floor(Math.random() * (max - min + 1)) + min;

};

getRandomNumber(9, 15);

const checkStrLength = (string, maxLength) => string.length <= maxLength;

checkStrLength('aaa', 5);
