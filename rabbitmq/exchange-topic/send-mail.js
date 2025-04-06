const amqplib = require("amqplib");

const amqp_url_docker = "amqp://localhost:5672";

const sendMail = async () => {
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

    const args = process.argv.slice(2);
    const topic = args[0];
    const msg = args[1] || "Hello World!";
    console.log(`topic: ${topic} :::: message: ${msg}`);

    // 4. Publish message to exchange
    await channel.publish(nameExchange, topic, Buffer.from(msg));

    console.log(`[x] Send OK::: ${msg}`);

    setTimeout(() => {
      conn.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.log("Error in sendQueue:", error);
  }
};

sendMail();
