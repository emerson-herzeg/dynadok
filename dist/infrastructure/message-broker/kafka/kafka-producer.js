"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaProducer = void 0;
// src/infrastructure/message-broker/kafka/kafka-producer.ts
const kafkajs_1 = require("kafkajs");
const env_1 = require("../../config/env");
class KafkaProducer {
    constructor() {
        const kafka = new kafkajs_1.Kafka({
            clientId: 'client-service',
            brokers: [env_1.env.kafkaBroker],
        });
        this.producer = kafka.producer();
        this.connect();
    }
    async connect() {
        try {
            await this.producer.connect();
            console.log('Conectado ao Kafka Producer');
        }
        catch (error) {
            console.error('Erro ao conectar ao Kafka Producer', error);
        }
    }
    async produce(topic, message) {
        try {
            await this.producer.send({
                topic,
                messages: [{ value: message }],
            });
            console.log(`Mensagem enviada para o tópico ${topic}: ${message}`);
        }
        catch (error) {
            console.error('Erro ao enviar mensagem para o Kafka', error);
        }
    }
    async disconnect() {
        await this.producer.disconnect();
    }
}
exports.KafkaProducer = KafkaProducer;
