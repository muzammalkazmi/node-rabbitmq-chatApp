import amqp from 'amqplib'

async function send_push_notification(product){
    try{
          const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchange = "push_notification"
    const exchangeType = "fanout"
    const message = JSON.stringify(product)

    await channel.assertExchange(exchange, exchangeType, {durable:true})

    await channel.publish(exchange, "", Buffer.from(message) ,{persistent:true})
    console.log("sent ==>", message)
    setTimeout(()=>{
        connection.close()
    },500)

    }catch(error){
        console.log("error sending push notificatoin", error)
    }
  
}

send_push_notification({product: "Samsung Glaxy S7 edge", price: 80000, status: "available"})