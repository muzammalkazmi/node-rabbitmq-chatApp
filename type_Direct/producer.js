import ampq from 'amqplib'

async function send_mail (){
    try{
        const connection = await ampq.connect("amqp://localhost")
        const channel = await connection.createChannel()
        const exchange = "mail_exchange"
        const routerFOrSubUser = "send_mail_to_subscribers"
        const routerFOrAll = "send_mail_to_all_users"
        const message = {
            to: "mkz@gmail.com",
            from: "ali@gmail.com",
            subject: "Greetings",
            body: "Hello Muzammal"
        }
        await channel.assertExchange(exchange, "direct",{durable:false})
        await channel.assertQueue("mail_queue_for_subscribers",{durable:false})
         await channel.assertQueue("mail_queue_for_all",{durable:false})


        await channel.bindQueue("mail_queue_for_subscribers",exchange,routerFOrSubUser)
        await channel.bindQueue("mail_queue_for_all",exchange,routerFOrAll)


        await channel.publish(exchange, routerFOrAll,Buffer.from(JSON.stringify(message)))
        console.log("data published successfully", message)
        setTimeout(()=>{
            connection.close()
        },500)
    }catch(error){
        console.log(error)
    }
    
}

send_mail()