const express = require("express");
const app = express();
const redis = require("redis");
const client = redis.createClient();
const port = 3000;

app.get("/order", (req, res) => {
  const orders = [
    {
      productId: 1,
      price: 5000,
    },
    {
      productId: 2,
      price: 10000,
    },
  ];

  // Step: Send order to both payment service and sendmail service
  client.publish("ORDER_SYSTEM", JSON.stringify(orders));

  res.status(200).json({
    status: "success",
    message: "Place order successfully!",
  });
});

app.listen(port, () => {
  console.log(`Service order is running on port ${port}`);
});
