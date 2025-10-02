import { useState } from 'react';
import { Edit, Share2, MoreVertical, Pin } from 'lucide-react';
import type { Note } from '../types/note';

interface NoteViewProps {
  note: Note;
  onEdit: (note: Note) => void;
  onTogglePin: (note: Note) => void;
  onDuplicate: (note: Note) => void;
  onDelete: (note: Note) => void;
  isPinned: boolean;
}

export const NoteView = ({
  note,
  onEdit,
  onTogglePin,
  onDuplicate,
  onDelete,
  isPinned,
}: NoteViewProps) => {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/notes/${note.id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const wordCount = note.note_text.trim().split(/\s+/).length;

  return (
    <div className="flex-1 bg-white">
      {/* Content */}
      <div className="px-8 py-8 max-w-5xl mx-auto">
        {/* Header with title and actions */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{note.note_title}</h1>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onEdit(note)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit size={16} />
                Edit
              </button>

              <button
                onClick={() => onTogglePin(note)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors flex items-center gap-2 ${
                  isPinned
                    ? 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Pin size={16} className={isPinned ? 'fill-current' : ''} />
                {isPinned ? 'Unpin' : 'Pin'}
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 relative"
              >
                <Share2 size={16} />
                Share
                {copySuccess && (
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </span>
                )}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowMoreOptions(!showMoreOptions)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MoreVertical size={16} />
                </button>

                {showMoreOptions && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMoreOptions(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                      <button
                        onClick={() => {
                          onDuplicate(note);
                          setShowMoreOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-gray-700"
                        >
                          <path
                            d="M13.3333 6H7.33333C6.59695 6 6 6.59695 6 7.33333V13.3333C6 14.0697 6.59695 14.6667 7.33333 14.6667H13.3333C14.0697 14.6667 14.6667 14.0697 14.6667 13.3333V7.33333C14.6667 6.59695 14.0697 6 13.3333 6Z"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M3.33333 10H2.66667C2.31304 10 1.97391 9.85952 1.72386 9.60947C1.47381 9.35943 1.33333 9.02029 1.33333 8.66667V2.66667C1.33333 2.31304 1.47381 1.97391 1.72386 1.72386C1.97391 1.47381 2.31304 1.33333 2.66667 1.33333H8.66667C9.02029 1.33333 9.35943 1.47381 9.60947 1.72386C9.85952 1.97391 10 2.31304 10 2.66667V3.33333"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Duplicate
                      </button>
                      <button
                        onClick={() => {
                          onDelete(note);
                          setShowMoreOptions(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-red-600"
                        >
                          <path
                            d="M2 4H3.33333H14"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M5.33333 4V2.66667C5.33333 2.31304 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31304 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31304 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31304 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4H12.6667Z"
                            stroke="currentColor"
                            strokeWidth="1.33333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <span>Created: {formatDate(note.created_at)}</span>
            <span>•</span>
            <span>Updated: {formatDate(note.created_at)}</span>
            <span>•</span>
            <span>{wordCount} words</span>
          </div>

          {/* Separator */}
          <div className="border-b border-gray-200 mb-8"></div>
        </div>

        {/* Note Content */}
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
            {note.note_text}
          </p>
        </div>
      </div>
    </div>
  );
};
