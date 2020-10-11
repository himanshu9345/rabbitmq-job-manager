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
      console.log(`Received jobs with input ${data.number}`);
      // To remove a job form the queue, we have to send ack msg to server
      if (data.number == 19) {
        channel.ack(message);
      }
    });
  } catch (error) {
    console.log(error);
  }
}
