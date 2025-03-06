// src/infrastructure/message-broker/kafka/kafka-producer.ts
import { Kafka, Producer } from 'kafkajs';
import { env } from '../../config/env';

export class KafkaProducer {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: 'client-service',
      brokers: [env.kafkaBroker],
    });
    this.producer = kafka.producer();
    this.connect();
  }

  private async connect() {
    try {
      await this.producer.connect();
      console.log('Conectado ao Kafka Producer');
    } catch (error) {
      console.error('Erro ao conectar ao Kafka Producer', error);
    }
  }

  async produce(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log(`Mensagem enviada para o tópico ${topic}: ${message}`);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o Kafka', error);
    }
  }

  async disconnect() {
    await this.producer.disconnect();
  }
}