if (process.env.NODE_ENV != 'production') {
    const dotenv = require("dotenv")
    dotenv.config({ path: __dirname + '../../.env' });
}

export const ENV = {
    BOT_TOKEN: process.env.BOT_TOKEN, // Discord Bot Token
}