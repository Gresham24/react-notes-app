import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Plus, Search, Home, X } from 'lucide-react';
import notesLogo from '../assets/notes-logo.png';
import { notesApi } from '../services/notesApi';
import type { Note } from '../types/note';

interface SidebarProps {
  isOpen: boolean;
  onSelectNote: (note: Note) => void;
  selectedNoteId: number | null;
}

export const Sidebar = ({ isOpen, onSelectNote, selectedNoteId }: SidebarProps) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const isHomePage = location.pathname === '/';

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

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB');
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-60' : 'w-20'
        } flex flex-col z-10`}
      >
        {/* Header */}
        <Link
          to="/"
          className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} px-4 py-3.5 h-14 border-b border-gray-200 hover:bg-gray-100 transition-colors`}
        >
          {isOpen ? (
            <div className="flex items-center gap-2">
              <img src={notesLogo} alt="Notes" className="w-7 h-7 rounded-lg" />
              <span className="font-semibold text-gray-900">Notes</span>
            </div>
          ) : (
            <img src={notesLogo} alt="Notes" className="w-10 h-10 rounded-lg" />
          )}
        </Link>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {isOpen ? (
            <>
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                {/* Create Note Button */}
                <div className="p-4">
                  <button className="flex items-center gap-3 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                    <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                      <Plus size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium">Create Note</span>
                  </button>
                </div>

                {/* Search */}
                <div className="px-4 pb-4">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      placeholder="Search notes..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Home Button */}
                <div className="pb-2">
                  <Link
                    to="/"
                    className={`w-full flex items-center gap-3 px-4 py-3 text-gray-900 transition-colors ${
                      isHomePage
                        ? 'bg-purple-50 border-l-4 border-purple-600'
                        : 'hover:bg-gray-100 border-l-4 border-transparent'
                    }`}
                  >
                    <Home size={16} className="text-gray-900" />
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                </div>

                {/* Notes List */}
                <div className="space-y-1">
                  {loading ? (
                    <div className="px-4 py-3 text-sm text-gray-500">Loading notes...</div>
                  ) : notes.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500">No notes yet</div>
                  ) : (
                    notes.map((note) => (
                      <div
                        key={note.id}
                        onClick={() => onSelectNote(note)}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          selectedNoteId === note.id
                            ? 'bg-purple-50 border-l-4 border-purple-600'
                            : 'hover:bg-white border-l-4 border-transparent'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <FileText size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                              {note.note_title}
                            </h3>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                              {note.note_text}
                            </p>
                            <p className="text-xs text-gray-400">
                              {formatTimestamp(note.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Welcome Notification - Floating at bottom */}
              {isNotificationVisible && (
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-purple-600 font-bold text-sm">
                        Welcome to Notes!
                      </h3>
                      <button
                        onClick={() => setIsNotificationVisible(false)}
                        className="text-gray-400 hover:text-gray-600 -mt-1 -mr-1"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Capture your thoughts, organize your ideas, and bring your creativity to
                      life.
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            // Collapsed sidebar icons
            <div className="flex flex-col items-center gap-3 pt-4 px-4">
              {/* Create Note Icon */}
              <button className="w-12 h-12 bg-purple-600 rounded-2xl flex items-center justify-center hover:bg-purple-700 transition-colors">
                <Plus size={16} className="text-white" />
              </button>

              {/* Search Icon */}
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Search size={24} className="text-gray-700" />
              </button>

              {/* Home Icon */}
              <Link
                to="/"
                className={`p-2 rounded-lg transition-colors ${
                  isHomePage ? 'bg-purple-100' : 'hover:bg-gray-200'
                }`}
              >
                <Home size={16} className="text-gray-900" />
              </Link>

              {/* Note Icon */}
              <button className="p-2.5 bg-purple-50 rounded-lg">
                <FileText size={16} className="text-purple-600" />
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
