import { Stan } from 'node-nats-streaming';

import { CustomEvent } from './types/custom-event';

export abstract class Publisher<T extends CustomEvent> {
  public abstract subject: T['subject'];

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  public publish(data: T['data']) {
    return new Promise<void>((resolve, reject) => {
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
