import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Plus } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import type { Project } from '@/lib/types';

// Mock projects data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    objectives: 'Create a scalable and user-friendly e-commerce solution',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    members: [],
  },
  {
    id: '2',
    name: 'Mobile App Redesign',
    description: 'Redesigning the mobile app UI/UX for better user engagement',
    objectives: 'Improve user experience and increase app usage metrics',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z',
    members: [],
  },
];

export function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    objectives: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateProject = () => {
    const project: Project = {
      id: Math.random().toString(),
      ...newProject,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members: [user!],
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', objectives: '' });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage and track all your projects
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>
                Add a new project to your workspace
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) =>
                    setNewProject({ ...newProject, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({ ...newProject, description: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="objectives">Objectives</Label>
                <Textarea
                  id="objectives"
                  value={newProject.objectives}
                  onChange={(e) =>
                    setNewProject({ ...newProject, objectives: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>Create Project</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="group relative overflow-hidden rounded-lg border bg-card p-6 hover:border-primary/50"
          >
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <span>
                Created{' '}
                {new Date(project.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}