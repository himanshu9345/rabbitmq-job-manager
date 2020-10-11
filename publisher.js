const amqp = require("amqplib");

connect();
async function connect() {
  const msgToSend = { number: process.argv[2] };

  try {
    // connecting to rabbitmq server
    const connection = await amqp.connect("amqp://localhost:5672");
    // creating channels
    const channel = await connection.createChannel();
    // create a channel queue
    const result = await channel.assertQueue("myjobsqueue");
    channel.sendToQueue("myjobsqueue", Buffer.from(JSON.stringify(msgToSend)));
    console.log("Job sent to myjobsqueue");
  } catch (error) {
    console.log(error);
  }
}
