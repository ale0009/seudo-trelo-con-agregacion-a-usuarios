export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'scrum_master' | 'developer';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  objectives: string;
  createdAt: string;
  updatedAt: string;
  members: User[];
}

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'active' | 'completed';
}

export interface Task {
  id: string;
  projectId: string;
  sprintId?: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  projectId: string;
  userId: string;
  action: string;
  details: string;
  timestamp: string;
}