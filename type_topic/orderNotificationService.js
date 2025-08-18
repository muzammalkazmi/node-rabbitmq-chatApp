import amqp from 'amqplib'

async function orderNotificationService (){
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const exchange = "sending_notification_service"
        const queue = "order_queue"

        await channel.assertExchange(exchange,"topic",{durable:true})
        await channel.assertQueue(queue,{durable:true})

        await channel.bindQueue(queue, exchange, "order.*")
        console.log("waiting for messages")

        channel.consume(queue,(message)=>{
            if(message!==null){
                console.log("new order received", JSON.parse(message.content))
                channel.ack(message)
            }
        },
    {
        noAck:false
    })
    }catch(error){
        console.log("No new order", error)
    }
}

orderNotificationService()