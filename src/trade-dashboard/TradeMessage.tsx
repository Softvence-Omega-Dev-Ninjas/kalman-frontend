/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Search, MoreHorizontal, Paperclip, Send, ArrowLeft, X, User, Briefcase } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useGetChatListQuery } from '@/redux/features/message/messageApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/features/auth/authSlice';

const TradePersonMessage = () => {
  const user = useSelector(selectCurrentUser);
  console.log("Current Tradesperson:", user.id);
  
  const TRADESPERSON_ID = user.id;
  const [selectedRecipientId, setSelectedRecipientId] = useState("");
  const [message, setMessage] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'customers' | 'leads'>('all');
  
  const { data: chatLists, isLoading: isLoadingChatLists, refetch: refetchChatLists } = useGetChatListQuery({});
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Use chat hook for real-time messaging
  const { chatLog, loading, connected, sendMessage: sendChatMessage } = useChat({
    userId: TRADESPERSON_ID,
    recipientId: selectedRecipientId,
    socketUrl: "http://10.10.10.54:7000",
  });

  console.log("Connected:", connected);
  console.log("Chat Lists:", chatLists);
  
  const contacts = chatLists?.data || [];
  
  // Filter contacts based on active tab and search query
  const filteredContacts = contacts.filter((contact: any) => {
    const contactName = contact.name || contact.email || 'Unknown User';
    const matchesSearch = contactName.toLowerCase().includes(searchQuery.toLowerCase());
    
    // You can add additional filtering logic based on contact type here
    // For example, if you have a contact.type field
    if (activeTab === 'customers') {
      return matchesSearch && contact.isCustomer; // Assuming you have isCustomer field
    } else if (activeTab === 'leads') {
      return matchesSearch && contact.isLead; // Assuming you have isLead field
    }
    
    return matchesSearch;
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

  const handleBackToContacts = () => {
    setShowChat(false);
  };

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

  // Get contact type badge
  const getContactTypeBadge = (contact: any) => {
    if (contact.isCustomer) {
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Customer</span>;
    }
    if (contact.isLead) {
      return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Lead</span>;
    }
    return null;
  };

  if (isLoadingChatLists) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Briefcase className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <div className="text-gray-500">Loading your messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop and Tablet Layout */}
      <div className="hidden sm:flex min-h-screen bg-white max-w-6xl mx-auto gap-x-2 sm:gap-x-3 lg:gap-x-5 p-2 sm:p-4 lg:p-5">
        {/* Left Sidebar - Contacts */}
        <div className="w-full sm:w-80 md:w-96 lg:w-[420px] bg-white border-r flex flex-col rounded-lg border border-gray-200 shadow-sm">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Briefcase className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Business Messages</h1>
                <p className="text-sm text-gray-600">Manage your customer communications</p>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All Chats' },
                { key: 'customers', label: 'Customers' },
                { key: 'leads', label: 'Leads' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
              <div className="p-6 text-center text-gray-500">
                <User className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </p>
                <p className="text-sm">
                  {searchQuery ? 'Try adjusting your search' : 'Your customer conversations will appear here'}
                </p>
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
                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors ${
                      isSelected ? 'bg-orange-50 border-orange-200' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      {contact.profile_image ? (
                        <img
                          src={contact.profile_image}
                          alt={displayName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center border-2 border-white shadow-sm">
                          <User className="w-5 h-5 text-orange-600" />
                        </div>
                      )}
                      {/* Online status indicator */}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="ml-4 flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`font-semibold text-gray-900 text-sm truncate ${
                            isSelected ? 'text-orange-600' : ''
                          }`}>
                            {displayName}
                          </h3>
                          {getContactTypeBadge(contact)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {contact.lastMessage?.createdAt ? 
                              new Date(contact.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : ''
                            }
                          </span>
                          <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 truncate leading-relaxed">
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
        <div className="flex-1 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm min-w-0">
          {activeContact ? (
            <>
              {/* Chat Header */}
              <div className="bg-white px-6 py-4 border-b border-gray-200 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      {activeContact.profile_image ? (
                        <img
                          src={activeContact.profile_image}
                          alt={getContactDisplayName(activeContact)}
                          className="w-12 h-12 rounded-full object-cover border-2 border-orange-100"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center border-2 border-orange-100">
                          <User className="w-6 h-6 text-orange-600" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="ml-4">
                      <h2 className="font-semibold text-gray-900 text-lg">
                        {getContactDisplayName(activeContact)}
                      </h2>
                      <div className="flex items-center space-x-3 mt-1">
                        <div className="flex items-center space-x-1">
                          <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                          <span className="text-sm text-gray-600">
                            {connected ? 'Online' : 'Offline'}
                          </span>
                        </div>
                        {getContactTypeBadge(activeContact)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Additional actions for tradesperson */}
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50 to-gray-100">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
                      <p className="text-gray-500">Loading messages...</p>
                    </div>
                  </div>
                ) : chatLog.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-gray-500">
                      <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-3 shadow-sm">
                        <Send className="w-8 h-8 text-gray-300 mx-auto" />
                      </div>
                      <p className="text-lg font-medium text-gray-900 mb-1">No messages yet</p>
                      <p className="text-sm">Start the conversation with your customer</p>
                    </div>
                  </div>
                ) : (
                  chatLog.map((msg, idx) => (
                    <div key={msg.id || idx} className={`flex ${msg.senderId === TRADESPERSON_ID ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-[70%]">
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            msg.senderId === TRADESPERSON_ID
                              ? 'bg-orange-500 text-white rounded-br-md shadow-sm'
                              : 'bg-white text-gray-900 rounded-bl-md border border-gray-200 shadow-sm'
                          }`}
                        >
                          {msg.content && <p className="text-sm leading-relaxed break-words">{msg.content}</p>}
                          {msg.file && (
                            <img 
                              src={msg.file} 
                              alt="attachment" 
                              className="mt-2 max-h-60 rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                              onClick={() => window.open(msg.file, '_blank')} 
                            />
                          )}
                        </div>
                        <div className={`mt-1 text-xs text-gray-500 ${msg.senderId === TRADESPERSON_ID ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp}
                          {msg.senderId === TRADESPERSON_ID && (
                            <span className="ml-2">• {msg.read ? 'Read' : 'Delivered'}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Message Input */}
              <div className="bg-white px-6 py-4 border-t border-gray-200 rounded-b-lg">
                {selectedFile && (
                  <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={URL.createObjectURL(selectedFile)} 
                          alt="preview" 
                          className="w-12 h-12 rounded object-cover" 
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                          <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedFile(null)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
                
                <div className="flex items-center space-x-3">
                  <label className="p-2 cursor-pointer text-gray-400 hover:text-orange-600 transition-colors bg-gray-100 rounded-lg shrink-0 hover:bg-orange-50">
                    <Paperclip className="w-5 h-5" />
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
                      placeholder="Type your message... (Press Enter to send)"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button 
                    onClick={handleSendMessage}
                    disabled={!message.trim() && !selectedFile}
                    className="px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center space-x-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg">
              <div className="text-center text-gray-500 max-w-sm">
                <div className="bg-white rounded-full p-6 w-24 h-24 mx-auto mb-6 shadow-lg">
                  <Briefcase className="w-12 h-12 text-orange-500 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to Business Messages</h3>
                <p className="text-gray-600 mb-6">
                  Select a conversation to start messaging with your customers and leads. 
                  Manage your business communications efficiently.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <User className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900">Customers</p>
                  </div>
                  <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Briefcase className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900">Leads</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout - You can adapt the mobile layout from UserMessage */}
      <div className="sm:hidden min-h-screen bg-gray-50">
        {/* Mobile implementation similar to UserMessage but with tradesperson styling */}
        {/* You can copy the mobile layout from UserMessage and adjust styling */}
      </div>
    </div>
  );
};

export default TradePersonMessage;
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState, useRef, useEffect } from 'react';
// import type { ChangeEvent } from 'react';
// import { Search, MoreHorizontal, Paperclip, Send, ArrowLeft, X } from 'lucide-react';
// import { useChat } from '../hooks/useChat';
// import { useGetChatHistoryQuery, useGetChatListQuery } from '@/redux/features/message/messageApi';
// import { useSelector } from 'react-redux';
// import { selectCurrentUser } from '@/redux/features/auth/authSlice';

// const TradeMessage = () => {
//   const user = useSelector(selectCurrentUser);
//   console.log("Current User:", user.id);
//   // User IDs - Replace with actual user data from auth context/redux
//   const USER_ID = user.id; // Current logged-in user (sender)
//   const [selectedRecipientId, setSelectedRecipientId] = useState("");
  
//   const [message, setMessage] = useState('');
//   const [selectedContact, setSelectedContact] = useState('Kate Morrison');
//   const [showChat, setShowChat] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const { data: chatLists, isLoading: isLoadingChatLists, refetch: refetchChatLists } = useGetChatListQuery({});
//   const { data: chatConversations, isLoading: isLoadingChatConversations, refetch: refetchChatConversations } = useGetChatHistoryQuery({userA: USER_ID, userB: selectedRecipientId});

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const chatInputRef = useRef<HTMLInputElement>(null);
//   const chatEndRef = useRef<HTMLDivElement>(null);

//   // Use chat hook for real-time messaging
//   const { chatLog, loading, connected, sendMessage: sendChatMessage } = useChat({
//     userId: USER_ID,
//     recipientId: selectedRecipientId,
//     socketUrl: "http://10.10.10.54:7000", // Change to your backend URL
//   });

//   console.log(connected);

//   console.log("Chat Lists:", chatLists);
//   const contacts = chatLists?.data || [];

//   // Filter contacts based on search query
//   const filteredContacts = contacts.filter((contact: any) =>
//     contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   console.log("Chat Contacts:", contacts);
//   console.log("Chat Conversations:", chatConversations);

//   // Auto-scroll to bottom when new messages arrive
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatLog]);

//   const activeContact = contacts.find((c: any) => c.id == selectedRecipientId);

//   const handleContactSelect = (contact: typeof contacts[0]) => {
//     setSelectedContact(contact.name);
//     setSelectedRecipientId(contact.id);
//     setShowChat(true);
//   };

//   const handleBackToContacts = () => {
//     setShowChat(false);
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim() && !selectedFile) return;

//     await sendChatMessage(message, selectedFile || undefined);
//     refetchChatLists();
//     refetchChatConversations();
//     setMessage('');
//     setSelectedFile(null);
//     chatInputRef.current?.focus();
//   };

//   const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     setSelectedFile(e.target.files?.[0] || null);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };


//     if (isLoadingChatLists || isLoadingChatConversations) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Desktop and Tablet Layout */}
//       <div className="hidden sm:flex min-h-screen bg-white max-w-5xl mx-auto gap-x-2 sm:gap-x-3 lg:gap-x-5 p-2 sm:p-4 lg:p-5">
//         {/* Left Sidebar - Contacts */}
//         <div className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[400px] bg-white border-r flex flex-col rounded-lg border border-gray-100">
//           {/* Header */}
//           <div className="p-4 sm:p-6 border-b border-gray-100">
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Messages</h1>
            
//             {/* Search */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search message"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full pl-10 pr-10 py-2 sm:py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery('')}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Contacts List */}
//           <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
//             {filteredContacts.length === 0 ? (
//               <div className="p-4 text-center text-gray-500">
//                 {searchQuery ? 'No contacts found' : 'No contacts yet'}
//               </div>
//             ) : (
//               filteredContacts.map((contact: any) => (
//                 <div
//                   key={contact.id}
//                   onClick={() => handleContactSelect(contact)}
//                   className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
//                     contact.name === selectedContact ? 'bg-orange-50' : ''
//                   }`}
//                 >
//                 <div className="relative">
//                   <img
//                     src={contact.profile_image}
//                     alt={contact.name}
//                     className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
//                   />
//                   {contact.isOnline && (
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
                
//                 <div className="ml-3 flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className={`font-medium text-gray-900 text-sm sm:text-base ${
//                       contact.name === selectedContact ? 'text-orange-600' : ''
//                     }`}>
//                       {contact.name}
//                     </h3>
//                     <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
//                   </div>
//                   <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
//                     {typeof contact.lastMessage === 'string' ? contact.lastMessage : contact.lastMessage?.message || 'No messages'}
//                   </p>
//                 </div>
//               </div>
//               ))
//             )}
//           </div>
//         </div>

//         {/* Right Chat Area */}
//         <div className="flex-1 flex flex-col bg-[#EFF2F7] rounded-lg border border-gray-100 min-w-0">
//           {/* Chat Header */}
//           <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 rounded-t-lg">
//             <div className="flex items-center">
//               <div className="relative">
//                 <img
//                   src={activeContact?.profile_image}
//                   alt={activeContact?.name}
//                   className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
//                 />
//               </div>
//               <div className="ml-3">
//                 <h2 className="font-semibold text-gray-900 text-sm sm:text-base">{activeContact?.name}</h2>
//               </div>
//             </div>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
//             {loading ? (
//               <div className="flex items-center justify-center h-full">
//                 <p className="text-gray-500">Loading messages...</p>
//               </div>
//             ) : chatLog.length === 0 ? (
//               <div className="flex items-center justify-center h-full">
//                 <p className="text-gray-400">No messages yet. Start the conversation!</p>
//               </div>
//             ) : (
//               chatLog.map((msg, idx) => (
//                 <div key={msg.id || idx} className={`flex ${msg.senderId === USER_ID ? 'justify-end' : 'justify-start'}`}>
//                   <div className="max-w-[250px] sm:max-w-xs lg:max-w-md xl:max-w-lg">
//                     <div
//                       className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
//                         msg.senderId === USER_ID
//                           ? 'bg-orange-500 text-white rounded-br-md'
//                           : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
//                       }`}
//                     >
//                       {msg.content && <p className="text-sm leading-relaxed wrap-break-word">{msg.content}</p>}
//                       {msg.file && (
//                         <img src={msg.file} alt="attachment" className="mt-2 max-h-60 rounded-lg object-cover" />
//                       )}
//                     </div>
//                     <div className={`mt-1 text-xs text-gray-500 ${msg.senderId === USER_ID ? 'text-right' : 'text-left'}`}>
//                       {msg.timestamp}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             )}
//             <div ref={chatEndRef} />
//           </div>

//           {/* Message Input */}
//           <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200 rounded-b-lg">
//             <div className="flex items-center space-x-2 sm:space-x-3">
//               <label className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-lg shrink-0">
//                 <Paperclip className="w-4 h-4 sm:w-5 sm:h-5" />
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleFileSelect}
//                 />
//               </label>
              
//               <div className="flex-1 relative min-w-0">
//                 <input
//                   ref={chatInputRef}
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="w-full px-3 sm:px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//               </div>
              
//               <button 
//                 onClick={handleSendMessage}
//                 disabled={!message.trim() && !selectedFile}
//                 className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <Send className="w-4 h-4 sm:w-5 sm:h-5" />
//               </button>
//             </div>
//             {selectedFile && (
//               <div className="mt-2">
//                 <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
//                 <img src={URL.createObjectURL(selectedFile)} alt="preview" className="mt-1 max-h-32 rounded-lg object-cover" />
//               </div>
//             )}
           
//           </div>
//         </div>
//       </div>

//       {/* Mobile Layout */}
//       <div className="sm:hidden min-h-screen">
//         {/* Mobile Contacts List */}
//         {!showChat && (
//           <div className="flex flex-col h-screen bg-white">
//             {/* Mobile Header */}
//             <div className="p-4 border-b border-gray-100 bg-white">
//               <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
              
//               {/* Mobile Search */}
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search message"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery('')}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Mobile Contacts List */}
//             <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
//               {filteredContacts.length === 0 ? (
//                 <div className="p-4 text-center text-gray-500">
//                   {searchQuery ? 'No contacts found' : 'No contacts yet'}
//                 </div>
//               ) : (
//                 filteredContacts.map((contact: any) => (
//                   <div
//                     key={contact.id}
//                     onClick={() => handleContactSelect(contact)}
//                     className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100"
//                   >
//                   <div className="relative">
//                     <img
//                       src={contact.avatar}
//                       alt={contact.name}
//                       className="w-12 h-12 rounded-full object-cover"
//                     />
//                     {contact.isOnline && (
//                       <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
//                     )}
//                   </div>
                  
//                   <div className="ml-3 flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-medium text-gray-900">
//                       {contact.name}
//                     </h3>
//                     <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
//                   </div>
//                     <p className="text-sm text-gray-600 truncate mt-1">
//                       {typeof contact.lastMessage === 'string' ? contact.lastMessage : contact.lastMessage?.message || 'No messages'}
//                     </p>
//                   </div>
//                 </div>
//                 ))
//               )}
//             </div>
//           </div>
//         )}

//         {/* Mobile Chat View */}
//         {showChat && (
//           <div className="flex flex-col h-screen bg-white">
//             {/* Mobile Chat Header */}
//             <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
//               <button 
//                 onClick={handleBackToContacts}
//                 className="mr-3 text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
//               >
//                 <ArrowLeft className="w-5 h-5" />
//               </button>
//               <div className="flex items-center">
//                 <div className="relative">
//                   <img
//                     src={activeContact?.avatar}
//                     alt={activeContact?.name}
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   {activeContact?.isOnline && (
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white"></div>
//                   )}
//                 </div>
//                 <div className="ml-3">
//                   <h2 className="font-medium text-gray-900">{activeContact?.name}</h2>
//                   <p className="text-xs text-green-500">Active Now</p>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFF2F7]">
//               {loading ? (
//                 <div className="flex items-center justify-center h-full">
//                   <p className="text-gray-500">Loading messages...</p>
//                 </div>
//               ) : chatLog.length === 0 ? (
//                 <div className="flex items-center justify-center h-full">
//                   <p className="text-gray-400">No messages yet. Start the conversation!</p>
//                 </div>
//               ) : (
//                 chatLog.map((msg, idx) => (
//                   <div key={msg.id || idx} className={`flex ${msg.senderId === USER_ID ? 'justify-end' : 'justify-start'}`}>
//                     <div className="max-w-[280px]">
//                       <div
//                         className={`px-3 py-2 rounded-2xl ${
//                           msg.senderId === USER_ID
//                             ? 'bg-orange-500 text-white rounded-br-md'
//                             : 'bg-white text-gray-900 rounded-bl-md border border-gray-200'
//                         }`}
//                       >
//                         {msg.content && <p className="text-sm leading-relaxed wrap-break-word">{msg.content}</p>}
//                         {msg.file && (
//                           <img src={msg.file} alt="attachment" className="mt-2 max-h-60 rounded-lg object-cover" />
//                         )}
//                       </div>
//                       <div className={`mt-1 text-xs text-gray-500 ${msg.senderId === USER_ID ? 'text-right' : 'text-left'}`}>
//                         {msg.timestamp}
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//               <div ref={chatEndRef} />
//             </div>

//             {/* Mobile Message Input */}
//             <div className="bg-white px-4 py-3 border-t border-gray-200 safe-area-bottom">
//               <div className="flex items-center space-x-2">
//                 <label className="p-2 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-lg shrink-0">
//                   <Paperclip className="w-4 h-4" />
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileSelect}
//                   />
//                 </label>
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={handleKeyPress}
//                   placeholder="Type your message..."
//                   className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-0"
//                 />
//                 <button 
//                   onClick={handleSendMessage}
//                   disabled={!message.trim() && !selectedFile}
//                   className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </div>
//               {selectedFile && (
//                 <div className="mt-2">
//                   <p className="text-sm text-gray-500">Selected file: {selectedFile.name}</p>
//                   <img src={URL.createObjectURL(selectedFile)} alt="preview" className="mt-1 max-h-32 rounded-lg object-cover" />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TradeMessage;