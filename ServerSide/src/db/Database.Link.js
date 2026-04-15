import mongoose from 'mongoose'
import dotenv from 'dotenv'
import dns from 'dns'

dotenv.config()

dns.setDefaultResultOrder('ipv4first')
dns.promises.setServers(['8.8.8.8', '1.1.1.1'])  // this prevent dns issue by forcing it ran into some windwos dns issue that cause the connection to fail

const ConnectDb = async () => {
    const maxRetries = 3;
    const retryDelay = 2000;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Database connection attempt ${attempt}/${maxRetries}`);
            await mongoose.connect(process.env.MONGODB_URL);
            console.log("Database connected successfully");
            return;
        } catch (error) {
            console.error(`Database connection attempt ${attempt} failed:`, error.message);

            if (attempt === maxRetries) {
                console.error("All database connection attempts failed");
                console.error("Error details:", error);
                process.exit(1);
            }

            console.log(`Retrying in ${retryDelay}ms...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }
}

export default ConnectDb