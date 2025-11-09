export interface User {
  id: number
  name: string
  email: string
}

export interface Reminder {
  id: number
  title: string
  description?: string
  due_at: string // ISO format
  formatted_due: string // Human readable
}

export interface PageProps {
  user?: User;
  flash: {
    success?: string;
    error?: string;
  };
}