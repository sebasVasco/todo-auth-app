export interface Todo {
  id?: string;
  title: string;
  description: string;
  status: Status;
  uid?: string;
}

export type Status = 'todo' | 'active' | 'completed';
