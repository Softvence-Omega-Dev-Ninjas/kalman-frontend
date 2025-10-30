// components/ChatMinimized.tsx
import { MessageCircle, X } from 'lucide-react';

interface ChatMinimizedProps {
  recipientName: string;
  recipientImage?: string;
  onOpen: () => void;
  onClose: () => void;
}

const ChatMinimized = ({ recipientName, recipientImage, onOpen, onClose }: ChatMinimizedProps) => {
  return (
    <div className="fixed bottom-4 right-4 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-3 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={recipientImage || "https://randomuser.me/api/portraits/men/60.jpg"}
            alt={recipientName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-medium text-sm text-gray-900">{recipientName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onOpen}
            className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatMinimized;