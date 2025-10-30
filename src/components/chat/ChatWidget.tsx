// components/ChatWidget.tsx
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, Minimize2 } from 'lucide-react';
// import { useChat } from '../hooks/useChat';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';
import { useChat } from '@/hooks/useChat';

interface ChatWidgetProps {
  recipientId: string;
  recipientName: string;
  recipientImage?: string;
  onClose: () => void;
  onMinimize: () => void;
}

const ChatWidget = ({ 
  recipientId, 
  recipientName, 
  recipientImage, 
  onClose, 
  onMinimize 
}: ChatWidgetProps) => {
  const user = useSelector(selectCurrentUser);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const { chatLog, loading, connected, sendMessage } = useChat({
    userId: user.id,
    recipientId: recipientId,
    socketUrl: "http://10.10.10.54:7000",
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;

    await sendMessage(message, selectedFile || undefined);
    setMessage('');
    setSelectedFile(null);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        alert('Please select an image file');
      }
    }
    // Reset input to allow selecting same file again
    e.target.value = '';
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className="fixed bottom-4 right-4 w-80 h-96 bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col z-50">
      {/* Chat Header */}
      <div className="bg-orange-500 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img
            src={recipientImage || "/default-avatar.png"}
            alt={recipientName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <div>
            <span className="font-semibold text-sm">{recipientName}</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
              <span className="text-xs opacity-75">
                {connected ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={onMinimize}
            className="p-1 hover:bg-orange-600 rounded transition-colors"
            title="Minimize"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-orange-600 rounded transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-sm">Loading messages...</p>
          </div>
        ) : chatLog.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-sm text-center">
              No messages yet.<br />
              Start the conversation!
            </p>
          </div>
        ) : (
          chatLog.map((msg, idx) => (
            <div 
              key={msg.id || idx} 
              className={`flex ${msg.senderId === user.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className="max-w-[85%]">
                <div
                  className={`px-3 py-2 rounded-2xl text-sm ${
                    msg.senderId === user.id
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                  }`}
                >
                  {msg.content && (
                    <p className="leading-relaxed break-words">{msg.content}</p>
                  )}
                  {msg.file && (
                    <div className="mt-1">
                      <img 
                        src={msg.file} 
                        alt="attachment" 
                        className="max-h-32 rounded-lg object-cover cursor-pointer"
                        onClick={() => window.open(msg.file, '_blank')}
                      />
                    </div>
                  )}
                </div>
                <div className={`mt-1 text-xs text-gray-500 ${msg.senderId === user.id ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-200 bg-white">
        {/* File Preview */}
        {selectedFile && (
          <div className="mb-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 truncate flex-1">
                {selectedFile.name}
              </span>
              <button
                onClick={removeSelectedFile}
                className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <img 
              src={URL.createObjectURL(selectedFile)} 
              alt="Preview" 
              className="mt-1 max-h-20 rounded object-cover"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <label className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-lg shrink-0">
            <Paperclip className="w-4 h-4" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
          </label>
          
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
          <button 
            onClick={handleSendMessage}
            disabled={(!message.trim() && !selectedFile) || loading}
            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;