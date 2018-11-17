export interface SIGNIN {
  email: string;
  password: string;
}


export interface USER {
  _id?: number;
  first_name: string;
  last_name: string;
  email: string;
  roles: Array<string>;
}
