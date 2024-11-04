import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  LayoutDashboard,
  ListTodo,
  LogOut,
  Menu,
  Settings,
  Sprout,
  Users,
} from 'lucide-react';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-card transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-6 w-6" />
              <span className="text-lg font-semibold">Agile PM</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            <Link
              to="/dashboard"
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/projects"
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
            >
              <ListTodo className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            {user.role === 'admin' && (
              <Link
                to="/users"
                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
              >
                <Users className="h-4 w-4" />
                <span>Users</span>
              </Link>
            )}
            <Link
              to="/settings"
              className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
            >
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`min-h-screen transition-all duration-200 ${
          sidebarOpen ? 'pl-64' : 'pl-0'
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{user.name}</span>
              <div className="h-8 w-8 rounded-full bg-primary/10" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
      </div>
    </div>
  );
}