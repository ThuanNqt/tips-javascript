const amqplib = require("amqplib");

const amqp_url_docker = "amqp://localhost:5672";

const notification = async () => {
  try {
    // 1. Create connection to RabbitMQ server
    const conn = await amqplib.connect(amqp_url_docker);

    // 2. Create a channel
    const channel = await conn.createChannel();

    // 3. Create exchange
    const nameExchange = "video";

    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });

    // 4. Create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true, // auto delete when consumer disconnects
    });

    console.log(`name queue: ${queue}`);

    // 5. Bind queue to exchange
    await channel.bindQueue(queue, nameExchange, "");

    await channel.consume(
      queue,
      (msg) => {
        console.log(`[x] Received::: ${msg.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.log("Error in sendQueue:", error);
  }
};

notification();
