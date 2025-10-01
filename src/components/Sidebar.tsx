import { useState } from 'react';
import { FileText, Plus, Search, Home, Pin, X } from 'lucide-react';
import notesLogo from '../assets/notes-logo.png';

interface Note {
  id: number;
  title: string;
  preview: string;
  timestamp: string;
  isPinned?: boolean;
}

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);

  // Mock notes data
  const notes: Note[] = [
    {
      id: 2,
      title: 'Note 2',
      preview: 'We are delighted to have you join us in our quest to',
      timestamp: '4 days ago',
      isPinned: true,
    },
    {
      id: 1,
      title: 'Note 1',
      preview: 'lead a life with less urgent tasks',
      timestamp: '2 days ago',
    },
    {
      id: 3,
      title: 'Note 3',
      preview: 'We are delighted to have you join us in our quest to lead a life with less urgent tasks, and more',
      timestamp: '2 days ago',
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out ${
          isOpen ? 'w-60' : 'w-20'
        } flex flex-col z-10`}
      >
        {/* Header */}
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} px-4 py-3.5 h-14 border-b border-gray-200`}>
          {isOpen ? (
            <div className="flex items-center gap-2">
              <img src={notesLogo} alt="Notes" className="w-7 h-7 rounded-lg" />
              <span className="font-semibold text-gray-900">Notes</span>
            </div>
          ) : (
            <img src={notesLogo} alt="Notes" className="w-10 h-10 rounded-lg" />
          )}
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col">
          {isOpen ? (
            <>
              <div className="flex-1 overflow-y-auto">
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
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 transition-colors bg-purple-50 border-l-4 border-purple-600">
                    <Home size={16} className="text-gray-900" />
                    <span className="text-sm font-medium">Home</span>
                  </button>
                </div>

                {/* Notes List */}
                <div className="space-y-1">
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        note.id === 3
                          ? 'bg-purple-50 border-l-4 border-purple-600'
                          : 'hover:bg-white border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {note.isPinned ? (
                          <Pin size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                        ) : (
                          <FileText size={16} className="text-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            {note.title}
                          </h3>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                            {note.preview}
                          </p>
                          <p className="text-xs text-gray-400">
                            {note.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Welcome Notification - Stuck at bottom */}
              {isNotificationVisible && (
                <div className="p-4 border-t border-gray-200">
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
              <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                <Home size={16} className="text-gray-900" />
              </button>

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
