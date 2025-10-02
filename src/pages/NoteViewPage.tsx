import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { NoteView } from '../components/NoteView';
import { notesApi } from '../services/notesApi';
import type { Note } from '../types/note';

interface OutletContext {
  notes: Note[];
  loading: boolean;
}

export const NoteViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { notes } = useOutletContext<OutletContext>();
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;

      // First try to find note in cached notes
      const cachedNote = notes.find(n => n.id === Number(id));
      if (cachedNote) {
        setNote(cachedNote);
        setLoading(false);
        return;
      }

      // If not in cache, fetch from API
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
  }, [id, notes]);

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
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading note...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">{error || 'Note not found'}</p>
      </div>
    );
  }

  return (
    <NoteView
      note={note}
      onEdit={handleEdit}
      onTogglePin={handleTogglePin}
      onDuplicate={handleDuplicate}
      onDelete={handleDelete}
      isPinned={note.is_pinned || false}
    />
  );
};
