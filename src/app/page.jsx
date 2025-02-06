'use client';
import { Toaster } from '@/components/ui/toaster';
import TodoList from './components/todoList';
import { ToastProvider } from '@/components/ui/toast';

export default function Home() {
  return (
    <ToastProvider>
      <TodoList />
      <Toaster />
    </ToastProvider>
  );
}
