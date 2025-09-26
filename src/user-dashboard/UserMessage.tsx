import { useState } from 'react';
import { Search, MoreHorizontal, Paperclip, Send } from 'lucide-react';

const UserMessage = () => {
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('Kate Morrison');

  const contacts = [
    {
      id: 1,
      name: 'Kate Morrison',
      avatar: 'https://thumbs.dreamstime.com/b/profile-picture-smiling-indian-young-businesswoman-look-camera-posing-workplace-headshot-portrait-happy-millennial-ethnic-190959731.jpg',
      lastMessage: 'You: I will send you...',
      isActive: true,
      isOnline: true
    },
    {
      id: 2,
      name: 'Jane Cooper',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format',
      lastMessage: 'You: I will send you...',
      isActive: false,
      isOnline: false
    },
    {
      id: 3,
      name: 'Albert Flores',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format',
      lastMessage: 'You: I will send you...',
      isActive: false,
      isOnline: true
    },
    {
      id: 4,
      name: 'Kristin Watson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format',
      lastMessage: 'You: I will send you...',
      isActive: false,
      isOnline: false
    }
  ];

  const chatMessages = [
    {
      id: 1,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: false
    },
    {
      id: 2,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: true
    },
    {
      id: 3,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: false
    },
    {
      id: 4,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: true
    },
    {
      id: 5,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: false
    },
    {
      id: 6,
      text: 'Hi Mike! Thanks for your proposal. I have a few questions about the timeline and materials.',
      timestamp: '10 min ago',
      isOutgoing: true
    }
  ];

  const activeContact = contacts.find(c => c.name === selectedContact);

  return (
    <div className="flex min-h-screen bg-white max-w-5xl mx-auto gap-x-5 mb-5 mt-5">
      {/* Left Sidebar - Contacts */}
      <div className="w-full md:w-80 lg:w-96 bg-white border-r flex flex-col rounded-lg border-1 border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search message"
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedContact(contact.name)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                contact.name === selectedContact ? 'bg-orange-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium text-gray-900 ${
                    contact.name === selectedContact ? 'text-orange-600' : ''
                  }`}>
                    {contact.name}
                  </h3>
                  <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 truncate mt-1">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-[#EFF2F7]  md:flex rounded-lg border-1 border-gray-100">
        {/* Chat Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={activeContact?.avatar}
                alt={activeContact?.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {activeContact?.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3">
              <h2 className="font-semibold text-gray-900">{activeContact?.name}</h2>
              <p className="text-sm text-green-500">Active Now</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}>
              <div className="max-w-xs lg:max-w-md">
                <div
                  className={`px-4 py-3 rounded-2xl ${
                    msg.isOutgoing
                      ? 'bg-orange-500 text-white rounded-br-md'
                      : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
                <div className={`mt-1 text-xs text-gray-500 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white px-6 py-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-lg">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            
            <button className="p-2 bg-orange-500 text-gray-200 rounded-lg hover:bg-orange-600 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Chat Overlay */}
      {selectedContact && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col md:hidden">
          {/* Mobile Chat Header */}
          <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
            <button 
              onClick={() => setSelectedContact('')}
              className="mr-3 text-gray-600"
            >
              ←
            </button>
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={activeContact?.avatar}
                  alt={activeContact?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {activeContact?.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="font-medium text-gray-900">{activeContact?.name}</h2>
                <p className="text-xs text-green-500">Active Now</p>
              </div>
            </div>
          </div>

          {/* Mobile Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isOutgoing ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-xs">
                  <div
                    className={`px-3 py-2 rounded-2xl ${
                      msg.isOutgoing
                        ? 'bg-orange-500 text-white rounded-br-md'
                        : 'bg-white text-gray-900 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <div className={`mt-1 text-xs text-gray-500 ${msg.isOutgoing ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Message Input */}
          <div className="bg-white px-4 py-3 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400">
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="p-2 bg-orange-500 text-white rounded-full">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMessage;