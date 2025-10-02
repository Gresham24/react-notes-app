import type { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { Note } from '../types/note';

interface LayoutProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onSelectNote: (note: Note) => void;
  selectedNoteId: number | null;
}

export const Layout = ({ 
  children, 
  isSidebarOpen, 
  onToggleSidebar, 
  onSelectNote, 
  selectedNoteId 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onSelectNote={onSelectNote} 
        selectedNoteId={selectedNoteId} 
      />

      {/* Header */}
      <Header 
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={onToggleSidebar} 
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          isSidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        {children}
      </main>
    </div>
  );
};
