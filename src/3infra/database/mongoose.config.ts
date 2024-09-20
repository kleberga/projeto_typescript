import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export async function connectDatabase(): Promise<void> {
    try {
        const CHAVEMONGO = process.env.MONGO_DB_KEY;
        if(!CHAVEMONGO){
            throw new Error("A chave do DB não foi encontrada.")
        }
        const ConnectOptions: ConnectOptions = {
            connectTimeoutMS: 5000
        }
        await mongoose.connect(CHAVEMONGO, ConnectOptions);
        console.log('Conectado ao mongoDB');
    } catch (error) {
        console.error('Erro ao se conectar ao MongoDB: ' + error);
        process.exit();
    }
}