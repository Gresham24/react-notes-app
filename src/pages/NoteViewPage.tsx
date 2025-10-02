import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { NoteView } from '../components/NoteView';
import { notesApi } from '../services/notesApi';
import type { Note } from '../types/note';
import { Sun, User } from 'lucide-react';

export const NoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      try {
        const fetchedNote = await notesApi.getNoteById(Number(id));
        setNote(fetchedNote);
      } catch (err) {
        setError('Failed to load note');
        console.error('Error fetching note:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  const handleSelectNote = (selectedNote: Note) => {
    navigate(`/notes/${selectedNote.id}`);
  };

  const handleEdit = (note: Note) => {
    console.log('Edit note:', note);
    // TODO: Implement edit functionality
  };

  const handleTogglePin = async (note: Note) => {
    try {
      // TODO: Implement pin/unpin API call
      const updatedNote = { ...note, is_pinned: !note.is_pinned };
      setNote(updatedNote);
      console.log('Toggle pin:', note);
    } catch (err) {
      console.error('Failed to toggle pin:', err);
    }
  };

  const handleDuplicate = async (note: Note) => {
    try {
      const duplicatedNote = await notesApi.createNote({
        note_title: `${note.note_title} (Copy)`,
        note_text: note.note_text,
      });
      console.log('Duplicated note:', duplicatedNote);
      navigate(`/notes/${duplicatedNote.id}`);
    } catch (err) {
      console.error('Failed to duplicate note:', err);
    }
  };

  const handleDelete = async (note: Note) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await notesApi.deleteNote(note.id);
        console.log('Deleted note:', note);
        navigate('/');
      } catch (err) {
        console.error('Failed to delete note:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar
          isOpen={isSidebarOpen}
          onSelectNote={handleSelectNote}
          selectedNoteId={Number(id)}
        />
        <div
          className={`transition-all duration-300 flex flex-col min-h-screen ${
            isSidebarOpen ? 'ml-60' : 'ml-20'
          } flex-1`}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading note...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex min-h-screen bg-white">
        <Sidebar
          isOpen={isSidebarOpen}
          onSelectNote={handleSelectNote}
          selectedNoteId={null}
        />
        <div
          className={`transition-all duration-300 flex flex-col min-h-screen ${
            isSidebarOpen ? 'ml-60' : 'ml-20'
          } flex-1`}
        >
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">{error || 'Note not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onSelectNote={handleSelectNote}
        selectedNoteId={note.id}
      />
      <div
        className={`transition-all duration-300 flex flex-col min-h-screen ${
          isSidebarOpen ? 'ml-60' : 'ml-20'
        } flex-1`}
      >
        <header className="bg-white border-b border-gray-200 px-8 h-14 flex items-center justify-between">
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
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Sun size={16} className="text-gray-900" />
            </button>
            <button className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </button>
          </div>
        </header>
        <NoteView
          note={note}
          onEdit={handleEdit}
          onTogglePin={handleTogglePin}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          isPinned={note.is_pinned || false}
        />
      </div>
    </div>
  );
};
