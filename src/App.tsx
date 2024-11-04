import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/auth-context';
import { Layout } from '@/components/layout';
import { AppRoutes } from '@/components/app-routes';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
        <Toaster position="top-center" />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;