import { useState, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

interface Message {
  id?: number;
  senderId: string;
  reciverId?: string;
  content?: string;
  message?: string;
  file?: string;
  read: boolean;
  timestamp: string;
  createdAt?: string;
}

interface ApiMessage {
  id?: number;
  senderId: string;
  reciverId?: string;
  message?: string;
  content?: string;
  file?: string;
  createdAt?: string;
}

interface SocketMessage {
  id?: number;
  senderId: string;
  message?: string;
  content?: string;
  file?: string;
  createdAt?: string;
}

interface UseChatProps {
  userId: string;
  recipientId: string;
  socketUrl?: string;
}

export const useChat = ({ userId, recipientId, socketUrl = "http://10.10.10.54:7000" }: UseChatProps) => {
  const [chatLog, setChatLog] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  // Format timestamp
  const formatTime = (dateInput: string | number | Date) => {
    return new Date(dateInput).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Fetch chat history
  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${socketUrl}/chat/history/${userId}/${recipientId}`);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        const messagesArray = Array.isArray(data) ? data : data?.data || [];

        const formatted = messagesArray.map((msg: ApiMessage) => ({
          id: msg.id,
          senderId: msg.senderId,
          content: msg.message || msg.content,
          file: msg.file,
          read: msg.senderId === userId,
          timestamp: formatTime(msg.createdAt || Date.now()),
        }));
        setChatLog(formatted);
      } catch (err) {
        console.error("❌ Error loading messages:", err);
        setChatLog([]);
      } finally {
        setLoading(false);
      }
    };

    if (userId && recipientId) {
      fetchMessages();
    }
  }, [userId, recipientId, socketUrl]);

  // Setup Socket.IO
  useEffect(() => {
    if (!userId) return;

    socketRef.current = io(socketUrl, { query: { userId } });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected:", socketRef.current?.id);
      setConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      console.log("⚠️ Disconnected");
      setConnected(false);
    });

    socketRef.current.on("receive_message", (msg: SocketMessage) => {
      setChatLog((prev) => [
        ...prev,
        {
          id: msg.id || Date.now(),
          senderId: msg.senderId,
          content: msg.message || msg.content,
          file: msg.file,
          read: msg.senderId === userId,
          timestamp: formatTime(msg.createdAt || Date.now()),
        },
      ]);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [userId, socketUrl]);

  // Upload file
  const uploadFile = async (file: File): Promise<string | undefined> => {
    if (!file) return undefined;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${socketUrl}/chat/upload`, { method: "POST", body: formData });
      const data = await res.json();
      return data.url || data.data?.url;
    } catch (err) {
      console.error("❌ File upload failed:", err);
      return undefined;
    }
  };

  // Send message
  const sendMessage = async (message: string, file?: File) => {
    if (!message.trim() && !file) return;

    let fileUrl: string | undefined;
    if (file) {
      fileUrl = await uploadFile(file);
      if (!fileUrl) return;
    }

    const messageData = {
      senderId: userId,
      reciverId: recipientId,
      message: message || undefined,
      file: fileUrl,
    };

    socketRef.current?.emit("send_message", messageData);
  };

  return {
    chatLog,
    loading,
    connected,
    sendMessage,
    uploadFile,
  };
};
