import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { NoteCard } from './NoteCard';
import { Sun, User, Clock, Plus } from 'lucide-react';
import notesLogo from '../assets/notes-logo.png';
import { notesApi } from '../services/notesApi';
import type { Note } from '../types/note';

export const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await notesApi.getAllNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError('Failed to load notes');
        console.error('Error fetching notes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          isSidebarOpen ? 'ml-60' : 'ml-20'
        }`}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between">
          {/* Left side - Hamburger menu */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
                stroke="#09090B"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 2V14"
                stroke="#09090B"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right side - Theme toggle and profile */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Sun size={16} className="text-gray-900" />
            </button>
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-8 py-16 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <img src={notesLogo} alt="Notes" className="w-10 h-10" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Hi tembogresham, what would you like to jot?
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Capture your thoughts, ideas, and inspiration in beautiful,
              organized notes.
            </p>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium inline-flex items-center gap-2">
              <Plus size={20} className="text-white" />
              Take Some Notes
            </button>
          </div>
        </section>

        {/* Recent Notes Section */}
        <section className="bg-gray-50 border-t border-gray-200 px-8 py-10 flex-1">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock size={20} className="text-gray-900" />
                <h2 className="text-xl font-bold text-gray-900">Recent Notes</h2>
              </div>
              <button className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-white transition-colors">
                View All
              </button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {loading ? (
                <p className="text-gray-500">Loading notes...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : notes.length === 0 ? (
                <p className="text-gray-500">No notes yet. Create your first note!</p>
              ) : (
                notes.slice(0, 5).map((note) => (
                  <NoteCard
                    key={note.id}
                    title={note.note_title}
                    preview={note.note_text}
                    date={new Date(note.created_at).toLocaleDateString('en-GB')}
                  />
                ))
              )}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};
