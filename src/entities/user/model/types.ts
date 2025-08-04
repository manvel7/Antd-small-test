// Define the User interface to match your App requirements
export interface User {
  key: string;
  name: string;
  age: number;
  phone: string;
  country: string;
}

// Define the initial state
export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
