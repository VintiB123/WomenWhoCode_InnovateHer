import { useEffect, useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Smile } from "lucide-react";
// import { useSocket } from "@/context/SocketContext.jsx";
import moment from "moment";

const ChatMessage = ({ message, selectedContact, isOutgoing }) => {
  let contactName =
    selectedContact?.name ||
    selectedContact?.volunteerName ||
    selectedContact?.ngoName ||
    selectedContact?.corporateName;

  return (
    <div
      className={`flex ${isOutgoing ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex items-end gap-2 max-w-[70%] ${
          isOutgoing ? "" : "flex-row-reverse"
        }`}
      >
        {!isOutgoing && (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {contactName
                ?.split(" ")
                ?.map((n) => n[0])
                ?.join("")}
            </AvatarFallback>
          </Avatar>
        )}
        <div
          className={`rounded-2xl p-3 ${
            isOutgoing
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-gray-100 rounded-bl-none"
          }`}
        >
          <p className="text-sm leading-relaxed">{message?.content}</p>
          <span
            className={`text-xs ${
              isOutgoing ? "text-blue-100" : "text-gray-500"
            } mt-1 block`}
          >
            {moment(message?.timestamp).format("h:mm A")}
          </span>
        </div>
      </div>
    </div>
  );
};

const DateSeparator = ({ date }) => (
  <div className="flex items-center my-6">
    <div className="flex-grow border-t border-gray-200"></div>
    <span className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-full mx-4">
      {moment(date).calendar(null, {
        sameDay: "[Today]",
        lastDay: "[Yesterday]",
        lastWeek: "MMMM D, YYYY",
        sameElse: "MMMM D, YYYY",
      })}
    </span>
    <div className="flex-grow border-t border-gray-200"></div>
  </div>
);

const ChatArea = ({ selectedContact }) => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const userId = user?._id;
  // const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const groupedMessages = messages.reduce((acc, message) => {
    const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     if (!selectedContact || !userId) {
  //       setMessages([]);
  //       return;
  //     }

  //     try {
  //       let user2Id = selectedContact.id;
  //       const url = `http://localhost:4224/api/messages/get-messages/${userId}/${user2Id}`;

  //       const response = await fetch(url, {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json" },
  //       });

  //       if (!response.ok) {
  //         console.error(`HTTP error! status: ${response.status}`);
  //         setMessages([]);
  //         return;
  //       }

  //       const result = await response.json();

  //       if (result?.decryptedMessages) {
  //         const normalizedMessages = result.decryptedMessages
  //           .map((msg) => ({
  //             content: msg?.content || "",
  //             sender: msg?.sender_id,
  //             timestamp: msg?.updatedAt,
  //             isOutgoing: msg?.sender_id === userId,
  //           }))
  //           .sort((a, b) => new Date(a?.updatedAt) - new Date(b?.updatedAt));

  //         setMessages(normalizedMessages);
  //       } else {
  //         setMessages([]);
  //         console.warn("No decryptedMessages in result:", result);
  //       }
  //     } catch (error) {
  //       console.error("Error Fetching Messages:", error);
  //       setMessages([]);
  //     }
  //   };

  //   setMessages([]);
  //   fetchMessages();
  // }, [selectedContact, userId]);

  // useEffect(() => {
  //   // Listen for incoming messages from the socket server
  //   if (socket) {
  //     socket.on("receiveMessage", (message) => {
  //       console.log("New message received:", message);
  //       setMessages((prevMessages) => {
  //         const isDuplicate = prevMessages.some(
  //           (msg) =>
  //             msg?.content === message?.content &&
  //             msg?.timestamp === message?.timestamp
  //         );

  //         return isDuplicate
  //           ? prevMessages
  //           : [...prevMessages, message].sort(
  //               (a, b) => new Date(a?.timestamp) - new Date(b?.timestamp)
  //             );
  //       });
  //       scrollToBottom();
  //     });

  //     return () => {
  //       socket.off("receiveMessage");
  //     };
  //   }
  // }, [socket]);

  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   if (!newMessage.trim()) return;

  //   if (!selectedContact?.id) {
  //     console.warn("Cannot send message: No selected contact or ID.");
  //     return;
  //   }

  //   const messageData = {
  //     content: newMessage.trim(),
  //     sender: userId,
  //     recipient: selectedContact.id,
  //     senderType: user?.userType,
  //     recipientType: selectedContact?.type,
  //     timestamp: new Date().toISOString(),
  //     isOutgoing: true,
  //   };

  //   socket.emit("sendMessage", messageData);

  //   setMessages((prevMessages) => {
  //     const updatedMessages = [...prevMessages, messageData].sort(
  //       (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  //     );
  //     return updatedMessages;
  //   });

  //   setNewMessage("");
  // };

  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 px-6">
        <div className="py-6">
          {Object.entries(groupedMessages).map(([date, dateMessages]) => (
            <div key={date}>
              <DateSeparator date={date} />
              {dateMessages.map((message, index) => (
                <ChatMessage
                  key={`${date}-${index}`}
                  message={message}
                  selectedContact={selectedContact}
                  isOutgoing={message.isOutgoing}
                />
              ))}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white">
        <form className="flex items-center gap-3">
          {/* <form onSubmit={handleSendMessage} className="flex items-center gap-3"> */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-600"
          >
            <Paperclip className="w-5 h-5" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-100 border-0 focus:ring-2 focus:ring-blue-500"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-600"
          >
            <Smile className="w-5 h-5" />
          </Button>
          <Button
            type="submit"
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;
