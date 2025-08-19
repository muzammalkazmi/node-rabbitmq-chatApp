import amqp from 'amqplib'

async function receive_pushNOtification(){
try{
      const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "push_notification"
    const exchangeType = "fanout"

    await channel.assertExchange(exchange, exchangeType,{durable:true})
    const queue = await channel.assertQueue("",{exclusive:true})

    await channel.bindQueue(queue.queue, exchange, "")
    console.log("waiting for message")
channel.consume(queue.queue, (message)=>{
    console.log("NOtification received : ",JSON.parse(message.content.toString()))
    channel.ack(message)
})
}catch(err){
console.log("error receiving push notification", err)
}
  
}

receive_pushNOtification()