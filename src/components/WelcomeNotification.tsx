import { useState } from 'react';
import { X } from 'lucide-react';

export const WelcomeNotification = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-4 bg-purple-50 rounded-lg border border-purple-200 p-4 max-w-[240px] z-20">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-purple-600 font-bold text-sm">
          Welcome to Notes!
        </h3>
        <button
          onClick={() => setIsVisible(false)}
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
  );
};
