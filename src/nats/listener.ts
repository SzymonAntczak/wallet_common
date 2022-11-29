import { Message, Stan } from 'node-nats-streaming';

import { NATSEvent } from './events/nats-event';

export abstract class Listener<T extends NATSEvent> {
  public abstract subject: T['subject'];
  public abstract queueGroupName: string;
  public abstract onMessage(data: T['data'], msg: Message): void;

  protected ackWait = 5 * 1000;
  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  public listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  protected subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  private parseMessage(msg: Message) {
    const data = msg.getData();

    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
