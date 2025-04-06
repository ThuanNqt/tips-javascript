const amqplib = require("amqplib");

const amqp_url_docker = "amqp://localhost:5672";

const postVideo = async ({ msg }) => {
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

    // 4. Publish message to exchange
    await channel.publish(nameExchange, "", Buffer.from(msg));

    console.log(`[x] Send OK::: ${msg}`);

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log("Error in sendQueue:", error);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello World!";
postVideo({ msg });
