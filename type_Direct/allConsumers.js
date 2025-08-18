import amqp from 'amqplib'

async function receivedEmail (){
    try{
        const connection = await amqp.connect("amqp://localhost")
        const channel = await connection.createChannel()
        await channel.assertQueue("mail_queue_for_all",{durable:false})
        channel.consume("mail_queue_for_all",(message)=>{
            if(message!==null){
                console.log("message received", JSON.parse(message.content))
                channel.ack(message)
            }
        })
    }catch(error){
        console.log("unable to receive email at subscribed consumers", error)
    }
}

receivedEmail()