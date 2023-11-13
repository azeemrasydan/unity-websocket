import WebSocket from 'ws';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'ball-event-producer',
  brokers: ['kafka:9092'],
});

const producer = kafka.producer();

const ballSelectedEvent = {
  eventType: 'ballSelected',
  ballId: '1',
  timestamp: new Date().toISOString(),
};

const topic = 'ball_event_topic';

const produce = async () => {
  await producer.connect();

  const message: ProducerRecord = {
    topic,
    messages: [
      {
        value: JSON.stringify(ballSelectedEvent),
      },
    ],
  };

  await producer.send(message);

  await producer.disconnect();
};

produce().catch((err) => {
  console.error('Error producing to Kafka:', err);
  process.exit(1);
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws: WebSocket) => {
  console.log('New client connected');

  ws.on('message', (message: string) => {
    ws.send(`Server received your message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});