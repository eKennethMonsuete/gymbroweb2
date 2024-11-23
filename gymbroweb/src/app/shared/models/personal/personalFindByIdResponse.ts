import { StudentResponseSimple } from '../student/studentResponseSimple';

export interface PersonalFindByIdResponse {
  name: string;
  email: string;
  password: string;
  lastName: string;
  phone: string;
  students: StudentResponseSimple[];
}
