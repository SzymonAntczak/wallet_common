import { Subjects } from './subjects';

export interface WalletUpdatedEvent {
  subject: Subjects.WalletUpdated;
  data: {
    id: string;
    name: string;
    ownerId: string;
  };
}
