/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  Search,
  MoreHorizontal,
  Paperclip,
  Send,
  ArrowLeft,
  X,
} from "lucide-react";
import { useChat } from "../hooks/useChat";
import {
  useGetChatHistoryQuery,
  useGetChatListQuery,
} from "@/redux/features/message/messageApi";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const TradeMessage = () => {
  const user = useSelector(selectCurrentUser);
  console.log("Current User:", user.id);
  // User IDs - Replace with actual user data from auth context/redux
  const USER_ID = user.id; // Current logged-in user (sender)
  const [selectedRecipientId, setSelectedRecipientId] = useState("");

  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState("Kate Morrison");
  const [showChat, setShowChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: chatLists,
    isLoading: isLoadingChatLists,
    refetch: refetchChatLists,
  } = useGetChatListQuery({});
  const {
    data: chatConversations,
    isLoading: isLoadingChatConversations,
    refetch: refetchChatConversations,
  } = useGetChatHistoryQuery({ userA: USER_ID, userB: selectedRecipientId });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Use chat hook for real-time messaging
  const {
    chatLog,
    loading,
    connected,
    sendMessage: sendChatMessage,
  } = useChat({
    userId: USER_ID,
    recipientId: selectedRecipientId,
    socketUrl: "http://10.10.10.54:7000", // Change to your backend URL
  });

  console.log(connected);

  console.log("Chat Lists:", chatLists);
  const contacts = chatLists?.data || [];

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact: any) =>
    contact.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Chat Contacts:", contacts);
  console.log("Chat Conversations:", chatConversations);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const activeContact = contacts.find((c: any) => c.id == selectedRecipientId);

  const handleContactSelect = (contact: (typeof contacts)[0]) => {
    setSelectedContact(contact.name);
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
    refetchChatConversations();
    setMessage("");
    setSelectedFile(null);
    chatInputRef.current?.focus();
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoadingChatLists || isLoadingChatConversations) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen mb-20 bg-white">
      {/* Desktop and Tablet Layout */}
      <div className="hidden sm:flex min-h-screen bg-white max-w-5xl mx-auto gap-x-2 sm:gap-x-3 lg:gap-x-5 p-2 sm:p-4 lg:p-5">
        {/* Left Sidebar - Contacts */}
        <div className="w-full sm:w-72 md:w-80 lg:w-96 xl:w-[400px] bg-white border-r flex flex-col rounded-lg border border-gray-100">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-gray-100">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Messages
            </h1>

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
                  onClick={() => setSearchQuery("")}
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
                {searchQuery ? "No contacts found" : "No contacts yet"}
              </div>
            ) : (
              filteredContacts.map((contact: any) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
                    contact.name === selectedContact ? "bg-orange-50" : ""
                  }`}
                >
                  <div className="relative">
                    <img
                      src={contact.profile_image}
                      alt={contact.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    {contact.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`font-medium text-gray-900 text-sm sm:text-base ${
                          contact.name === selectedContact
                            ? "text-orange-600"
                            : ""
                        }`}
                      >
                        {contact.name}
                      </h3>
                      <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 truncate mt-1">
                      {typeof contact.lastMessage === "string"
                        ? contact.lastMessage
                        : contact.lastMessage?.message || "No messages"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-[#EFF2F7] rounded-lg border border-gray-100 min-w-0">
          {/* Chat Header */}
          <div className="bg-white px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 rounded-t-lg">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={activeContact?.profile_image}
                  alt={activeContact?.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <h2 className="font-semibold text-gray-900 text-sm sm:text-base">
                  {activeContact?.name}
                </h2>
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
                <p className="text-gray-400">
                  No messages yet. Start the conversation!
                </p>
              </div>
            ) : (
              chatLog.map((msg, idx) => (
                <div
                  key={msg.id || idx}
                  className={`flex ${
                    msg.senderId === USER_ID ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-[250px] sm:max-w-xs lg:max-w-md xl:max-w-lg">
                    <div
                      className={`px-3 sm:px-4 py-2 sm:py-3 rounded-2xl ${
                        msg.senderId === USER_ID
                          ? "bg-orange-500 text-white rounded-br-md"
                          : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                      }`}
                    >
                      {msg.content && (
                        <p className="text-sm leading-relaxed wrap-break-word">
                          {msg.content}
                        </p>
                      )}
                      {msg.file && (
                        <img
                          src={msg.file}
                          alt="attachment"
                          className="mt-2 max-h-60 rounded-lg object-cover"
                        />
                      )}
                    </div>
                    <div
                      className={`mt-1 text-xs text-gray-500 ${
                        msg.senderId === USER_ID ? "text-right" : "text-left"
                      }`}
                    >
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
                <p className="text-sm text-gray-500">
                  Selected file: {selectedFile.name}
                </p>
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  className="mt-1 max-h-32 rounded-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden min-h-screen">
        {/* Mobile Contacts List */}
        {!showChat && (
          <div className="flex flex-col h-screen bg-white">
            {/* Mobile Header */}
            <div className="p-4 border-b border-gray-100 bg-white">
              <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>

              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search message"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Contacts List */}
            <div className="flex-1 overflow-y-auto bg-[#F8F9FA]">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  {searchQuery ? "No contacts found" : "No contacts yet"}
                </div>
              ) : (
                filteredContacts.map((contact: any) => (
                  <div
                    key={contact.id}
                    onClick={() => handleContactSelect(contact)}
                    className="flex items-center p-4 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b border-gray-100"
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
                        <h3 className="font-medium text-gray-900">
                          {contact.name}
                        </h3>
                        <MoreHorizontal className="w-4 h-4 text-gray-400 shrink-0" />
                      </div>
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {typeof contact.lastMessage === "string"
                          ? contact.lastMessage
                          : contact.lastMessage?.message || "No messages"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Mobile Chat View */}
        {showChat && (
          <div className="flex flex-col h-screen bg-white">
            {/* Mobile Chat Header */}
            <div className="bg-white px-4 py-3 border-b border-gray-200 flex items-center">
              <button
                onClick={handleBackToContacts}
                className="mr-3 text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
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
                  <h2 className="font-medium text-gray-900">
                    {activeContact?.name}
                  </h2>
                  <p className="text-xs text-green-500">Active Now</p>
                </div>
              </div>
            </div>

            {/* Mobile Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#EFF2F7]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading messages...</p>
                </div>
              ) : chatLog.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                chatLog.map((msg, idx) => (
                  <div
                    key={msg.id || idx}
                    className={`flex ${
                      msg.senderId === USER_ID ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[280px]">
                      <div
                        className={`px-3 py-2 rounded-2xl ${
                          msg.senderId === USER_ID
                            ? "bg-orange-500 text-white rounded-br-md"
                            : "bg-white text-gray-900 rounded-bl-md border border-gray-200"
                        }`}
                      >
                        {msg.content && (
                          <p className="text-sm leading-relaxed wrap-break-word">
                            {msg.content}
                          </p>
                        )}
                        {msg.file && (
                          <img
                            src={msg.file}
                            alt="attachment"
                            className="mt-2 max-h-60 rounded-lg object-cover"
                          />
                        )}
                      </div>
                      <div
                        className={`mt-1 text-xs text-gray-500 ${
                          msg.senderId === USER_ID ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Mobile Message Input */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 safe-area-bottom">
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
                  className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent min-w-0"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() && !selectedFile}
                  className="p-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              {selectedFile && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Selected file: {selectedFile.name}
                  </p>
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="mt-1 max-h-32 rounded-lg object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradeMessage;
