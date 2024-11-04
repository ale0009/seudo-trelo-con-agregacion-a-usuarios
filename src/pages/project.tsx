import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import type { Task } from '@/lib/types';

const MOCK_TASKS: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design User Interface',
    description: 'Create wireframes and mockups for the main dashboard',
    status: 'todo',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    title: 'Implement Authentication',
    description: 'Set up user authentication with JWT',
    status: 'in_progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    projectId: '1',
    title: 'Database Schema',
    description: 'Design and implement the initial database schema',
    status: 'done',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: 'todo',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateTask = () => {
    const task: Task = {
      id: Math.random().toString(),
      projectId: id!,
      ...newTask,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks([...tasks, task]);
    setNewTask({ title: '', description: '', status: 'todo' });
    setDialogOpen(false);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    reorderedItem.status = result.destination.droppableId as Task['status'];
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  };

  const columns = {
    todo: {
      title: 'To Do',
      tasks: tasks.filter((task) => task.status === 'todo'),
    },
    in_progress: {
      title: 'In Progress',
      tasks: tasks.filter((task) => task.status === 'in_progress'),
    },
    done: {
      title: 'Done',
      tasks: tasks.filter((task) => task.status === 'done'),
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Name</h1>
          <p className="text-muted-foreground">Manage project tasks</p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
              <DialogDescription>Add a new task to the board</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Task Title</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newTask.status}
                  onValueChange={(value) =>
                    setNewTask({ ...newTask, status: value as Task['status'] })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {Object.entries(columns).map(([columnId, column]) => (
            <div
              key={columnId}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <h3 className="mb-4 font-semibold">{column.title}</h3>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {column.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="rounded-lg border bg-background p-4 shadow-sm"
                          >
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {task.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}