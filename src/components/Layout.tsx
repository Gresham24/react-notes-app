import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { notesApi } from '../services/notesApi';
import type { Note } from '../types/note';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine selected note ID from URL
  const selectedNoteId = location.pathname.startsWith('/notes/')
    ? Number(location.pathname.split('/')[2])
    : null;

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesApi.getAllNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  const handleSelectNote = (note: Note) => {
    navigate(`/notes/${note.id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onSelectNote={handleSelectNote}
        selectedNoteId={selectedNoteId}
        notes={notes}
        loading={loading}
      />

      {/* Header */}
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          isSidebarOpen ? 'ml-72' : 'ml-20'
        }`}
      >
        <Outlet context={{ notes, loading }} />
      </main>
    </div>
  );
};
