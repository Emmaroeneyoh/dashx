// Function to capture the order time
function captureOrderTime() {
  return Date.now(); // Returns the current timestamp
}

// Function to check if it's been more than 12 hours since the order
function isOrderExpired(orderTime) {
  var currentTimestamp = Date.now();
  var twelveHoursInMillis = 12 * 60 * 60 * 1000; // 12 hours in milliseconds

  // Check if the difference between the current time and order time is greater than 12 hours
  return currentTimestamp - orderTime > twelveHoursInMillis;
}

// Example usage
var orderTime = captureOrderTime(); // Capture the order time when the user places an order

// ... some time later ...

var isExpired = isOrderExpired(orderTime);

if (isExpired) {
  console.log("The order is expired. Cancel the order." , isExpired);
} else {
  console.log("The order is still valid." , isExpired);
}
