const amqp = require("amqplib");

connect();

async function connect() {
  try {
    // connecting to rabbitmq server
    const connection = await amqp.connect("amqp://localhost:5672");
    // creating channels
    const channel = await connection.createChannel();
    // create a channel queue
    const result = await channel.assertQueue("myjobsqueue");
    // consuming the jobs from a jobsqueue
    channel.consume("myjobsqueue", (message) => {
      var data = JSON.parse(message.content.toString());
      console.log(`Received jobs with input ${data}`);
    });
  } catch (error) {
    console.log(error);
  }
}
