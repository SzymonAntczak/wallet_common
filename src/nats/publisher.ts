import { Stan } from 'node-nats-streaming';

import { NATSEvent } from './nats-event';

export abstract class Publisher<T extends NATSEvent> {
  public abstract subject: T['subject'];

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  public publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) {
          return reject(err);
        }

        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}