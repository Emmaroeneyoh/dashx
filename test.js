function generateRandomNumber(length) {
  let result = '';
  const characters = '0123456789';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }

  // Parse the result as an integer before returning
  return parseInt(result, 10);
}

// Example usage
const randomNum = generateRandomNumber(6);
console.log(randomNum);
