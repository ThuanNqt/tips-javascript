const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const port = 3002;

client.subscribe("ORDER_SYSTEM");
client.on("message", (chanel, message) => {
  console.log("The chanel for sendmail is: ", chanel);
  console.log("The message for sendmail is: ", JSON.parse(message));
});

app.listen(port, () => {
  console.log(`Service sendmail is running on port ${port}`);
});
