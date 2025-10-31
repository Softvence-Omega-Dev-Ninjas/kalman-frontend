/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Search, MoreHorizontal, Paperclip, Send, X, User } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useGetChatListQuery } from '@/redux/features/message/messageApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

const UserMessage = () => {

        useEffect(()=>{
          document.title = `Chat | User Dashboard | Stavbar`
        }, [])

  const user = useSelector(selectCurrentUser);
  console.log("Current User:", user.id);
  
  const USER_ID = user.id;
  const [selectedRecipientId, setSelectedRecipientId] = useState("");
  const [message, setMessage] = useState('');
  const [, setSelectedContact] = useState('');
  const [, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { data: chatLists, isLoading: isLoadingChatLists, refetch: refetchChatLists } = useGetChatListQuery({});
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Use chat hook for real-time messaging
  const { chatLog, loading, connected, sendMessage: sendChatMessage } = useChat({
    userId: USER_ID,
    recipientId: selectedRecipientId,
    socketUrl: "http://10.10.10.54:7000",
  });

  console.log("Connected:", connected);
  console.log("Chat Lists:", chatLists);
  
  const contacts = chatLists?.data || [];
  
  // Filter contacts based on search query - handle null names
  const filteredContacts = contacts.filter((contact: any) => {
    const contactName = contact.name || contact.email || 'Unknown User';
    return contactName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const activeContact = contacts.find((c: any) => c.id === selectedRecipientId);

  const handleContactSelect = (contact: any) => {
    const contactName = contact.name || contact.email || 'Unknown User';
    setSelectedContact(contactName);
    setSelectedRecipientId(contact.id);
    setShowChat(true);
  };

  // const handleBackToContacts = () => {
  //   setShowChat(false);
  // };

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;

    await sendChatMessage(message, selectedFile || undefined);
    refetchChatLists();
    setMessage('');
    setSelectedFile(null);
    chatInputRef.current?.focus();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get display name for contact
  const getContactDisplayName = (contact: any) => {
    return contact.name || contact.email || 'Unknown User';
  };

  // Get last message text
  const getLastMessage = (contact: any) => {
    if (!contact.lastMessage) return 'No messages';
    return contact.lastMessage.message || 'No messages';
  };

  if (isLoadingChatLists) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-gray-500">Loading messages...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Desktop and Tablet Layout */}
      <div className="hidden sm:flex min-h-screen bg-white max-w-5xl mx-auto gap-x-2 sm:gap-x-3 lg:gap-x-5 p-2 sm:p-4 lg:p-5">
        {/* Left Sidebar - Contacts */}
        <div className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[400px] bg-white border-r flex flex-col rounded-lg border border-gray-100">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Messages</h1>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search message"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
            {filteredContacts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                {searchQuery ? 'No contacts found' : 'No contacts yet'}
              </div>
            ) : (
              filteredContacts.map((contact: any) => {
                const displayName = getContactDisplayName(contact);
                const lastMessage = getLastMessage(contact);
                const isSelected = contact.id === selectedRecipientId;
                
                return (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                      isSelected ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="relative">
                      {contact.profile_image ? (
                        <img
                          src={contact.profile_image}
                          alt={displayName}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                        </div>
                      )}
                      {/* You can add online status here if available in your API */}
                      {/* {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )} */}
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium text-gray-900 text-sm sm:text-base ${
                          isSelected ? 'text-orange-600' : ''
                        }`}>
                          {displayName}
                        </h3>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
                        {lastMessage}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-[#EFF2F7] rounded-lg border border-gray-100 min-w-0">
          {/* Chat Header */}
          {activeContact ? (
            <>
              <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center">
                  <div className="relative">
                    {activeContact.profile_image ? (
                      <img
                        src={activeContact.profile_image}
                        alt={getContactDisplayName(activeContact)}
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {getContactDisplayName(activeContact)}
                    </h2>
                    <div className="flex items-center space-x-1 mt-1">
                      <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-500">
                        {connected ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500">Loading messages...</p>
                  </div>
                ) : chatLog.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400">No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  chatLog.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex ${msg.senderId === USER_ID ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[250px] sm:max-w-xs lg:max-w-md xl:max-w-lg">
                        <div
                          className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                            msg.senderId === USER_ID
                              ? 'bg-orange-500 text-white rounded-br-md'
                              : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
                          }`}
                        >
                          {msg.content && <p className="text-sm leading-relaxed break-words">{msg.content}</p>}
                          {msg.file && (
                            <img src={msg.file} alt="attachment" className="mt-2 max-h-60 rounded-lg object-cover cursor-pointer" onClick={() => window.open(msg.file, '_blank')} />
                          )}
                        </div>
                        <div className={`mt-1 text-xs text-gray-500 ${msg.senderId === USER_ID ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 rounded-b-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <label className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-lg shrink-0">
                    <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileSelect}
                    />
                  </label>
                  
                  <div className="flex-1 relative min-w-0">
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      className="w-full px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    onClick={handleSendMessage}
                    disabled={!message.trim() && !selectedFile}
                    className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                {selectedFile && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
                    <img src={URL.createObjectURL(selectedFile)} alt="preview" className="mt-1 max-h-32 rounded-lg object-cover" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#EFF2F7] rounded-lg">
              <div className="text-center text-gray-500">
                <User className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm mt-1">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - You'll need to apply similar fixes here */}
      {/* ... */}
    </div>
  );
};

export default UserMessage;