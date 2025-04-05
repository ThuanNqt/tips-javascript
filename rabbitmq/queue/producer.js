const amqplib = require("amqplib");
const amqp_url_cloud =
  "amqps://utvngvvb:SIR1FFmfAJ4UXcqkWWjIKw6Z3mOcJppP@chameleon.lmq.cloudamqp.com/utvngvvb";
const amqp_url_docker = "amqp://localhost:5672";

const sendQueue = async ({ msg }) => {
  try {
    // 1. Create connection to RabbitMQ server
    const conn = await amqplib.connect(amqp_url_docker);

    // 2. Create a channel
    const channel = await conn.createChannel();

    // 3. Declare a queue (if it doesn't exist RabbitMQ will create it)
    const nameQueue = "q2";

    // 4. Create a queue
    await channel.assertQueue(nameQueue, {
      durable: true,
    });

    // 5. Send message to the queue
    await channel.sendToQueue(nameQueue, Buffer.from(msg), {
      expiration: 10000, // time to live
      persistent: true, // make the message persistent cache or disk
    });

    // 6. Close the channel and connection
  } catch (error) {
    console.log("Error in sendQueue:", error);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello World!";

sendQueue({ msg });
