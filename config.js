module.exports = {
    port: process.env.PORT || 3101,
    db: process.env.MONGODB || 'mongodb+srv://lbernhardt:pKAfT8VSR9uzYvF@cluster0.zjut7.mongodb.net/stickies?retryWrites=true&w=majority',
    SECRET_TOKEN: 'JNGsdfjknndfjbhbjhf3483289234ybvh',
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}