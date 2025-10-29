// Chat configuration
const socketUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

export const chatConfig = {
  // Socket server URL - Update this to match your backend
  socketUrl,
  
  // Chat history endpoint
  chatHistoryUrl: (userId: string, recipientId: string) => 
    `${socketUrl}/chat/history/${userId}/${recipientId}`,
  
  // File upload endpoint
  uploadUrl: `${socketUrl}/chat/upload`,
};

// Socket events
export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",
} as const;
