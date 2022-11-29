import { Subjects } from '../subjects';

export interface WalletCreatedEvent {
  subject: Subjects.WalletCreated;
  data: {
    id: string;
    name: string;
    ownerId: string;
  };
}
