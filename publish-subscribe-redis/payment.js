const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const port = 3001;

client.subscribe("ORDER_SYSTEM");
client.on("message", (chanel, message) => {
  console.log("The chanel for payment is: ", chanel);
  console.log("The message for payment is: ", JSON.parse(message));
});

app.listen(port, () => {
  console.log(`Service payment is running on port ${port}`);
});
