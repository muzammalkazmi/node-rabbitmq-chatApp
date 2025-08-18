import ampq from 'amqplib'

async function notification_service (routingKey, message){
    try{
        const connection = await ampq.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const exchange = "sending_notification_service"
        const exchangeType = "topic"
        
        await channel.assertExchange(exchange, exchangeType,{durable:true})

        await channel.publish(exchange, routingKey,Buffer.from(JSON.stringify(message)))
        console.log("data published successfully", message)
        setTimeout(()=>{
            connection.close()
        },500)
    }catch(error){
        console.log(error)
    }
    
}

notification_service("order.placed", {orderID: 3458, status: "placed"})
notification_service("payment.received", {paymentID: 8523458, status: "paid"})