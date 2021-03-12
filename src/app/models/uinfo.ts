import { from } from "rxjs";
import {Company} from './company';

export interface Uinfo{
  id: number;
  username: string;
  email: string;
  country: string;
  telephone: string;
  created: Date;
  age: number;
  photo: string;
}
