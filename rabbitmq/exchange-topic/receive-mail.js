const amqplib = require("amqplib");

const amqp_url_docker = "amqp://localhost:5672";

const receiveEmail = async () => {
  try {
    // 1. Create connection to RabbitMQ server
    const conn = await amqplib.connect(amqp_url_docker);

    // 2. Create a channel
    const channel = await conn.createChannel();

    // 3. Create exchange
    const nameExchange = "send-receive-mail";

    await channel.assertExchange(nameExchange, "topic", {
      durable: false,
    });

    // 4. Create queue
    const { queue } = await channel.assertQueue("", {
      exclusive: true, // auto delete when consumer disconnects
    });

    console.log(`name queue: ${queue}`);

    // 5. Bind queue to exchange
    const args = process.argv.slice(2);

    if (!args.length) process.exit(0);

    args.forEach(async (topic) => {
      await channel.bindQueue(queue, nameExchange, topic);
    });

    await channel.consume(queue, (msg) => {
      console.log(
        `Routing key: ${
          msg.fields.routingKey
        } ::: message: ${msg.content.toString()}`
      );
    });
  } catch (error) {
    console.log("Error in sendQueue:", error);
  }
};

/*
  * Phu hop voi bat ky ky tu nao
  # Khop voi mot hoac nhieu ky tu
 */
receiveEmail();
