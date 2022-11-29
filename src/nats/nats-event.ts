import { Subjects } from './subjects';

export interface NATSEvent {
  subject: Subjects;
  data: any;
}
