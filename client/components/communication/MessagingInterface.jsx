// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import {
//   Search,
//   MessagesSquare,
//   Plus,
//   Phone,
//   Video,
//   MoreVertical,
// } from "lucide-react";
// import ConversationList from "./ConversationList";
// import ChatArea from "./ChatArea";
// import NewMessageDialog from "./NewMessageDialog";
// import { Button } from "@/components/ui/button";

// const MessagingInterface = () => {
//   const userId = localStorage.getItem("user");
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [conversations, setConversations] = useState([]);
//   const [filteredConversations, setFilteredConversations] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   const handleAddContact = (newContact) => {
//     setConversations((prevConversations) => {
//       const isContactExists = prevConversations.some(
//         (conversation) =>
//           conversation.supervisor_id === newContact.supervisor_id ||
//           conversation.student_therapist_id ===
//             newContact.student_therapist_id ||
//           conversation.admin_id === newContact.admin_id ||
//           conversation.hod_id === newContact.hod_id ||
//           conversation.id === newContact.id
//       );
//       if (isContactExists) {
//         alert("Contact already exists in your conversations.");
//         return prevConversations;
//       }
//       return [newContact, ...prevConversations];
//     });
//   };

//   useEffect(() => {
//     if (searchQuery === "") {
//       setFilteredConversations(conversations);
//     } else {
//       setFilteredConversations(
//         conversations.filter((conv) =>
//           conv.name.toLowerCase().includes(searchQuery.toLowerCase())
//         )
//       );
//     }
//   }, [searchQuery, conversations]);

//   return (
//     <div className="flex h-[calc(100vh-64px)] bg-gray-50">
//       {/* Sidebar */}
//       <div className="h-full flex flex-col w-80 bg-white border-r border-gray-200">
//         <div className="p-4 border-b">
//           <h2 className="text-xl font-semibold mb-4">Messages</h2>
//           <div className="relative mb-4">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="Search conversations..."
//               className="pl-10 bg-gray-50 border-none"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Button
//             onClick={() => {}}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg gap-2"
//           >
//             <Plus className="w-4 h-4" />
//             New Conversation
//           </Button>
//         </div>

//         <ConversationList
//           conversations={filteredConversations}
//           onSelectContact={setSelectedContact}
//           selectedId={selectedContact?.id}
//           setConversations={setConversations}
//         />
//       </div>

//       {/* Main Chat Area */}
//       {selectedContact ? (
//         <div className="flex-1 flex flex-col bg-white">
//           {/* Chat Header */}
//           <div className="flex items-center justify-between px-6 py-4 border-b">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
//                 {selectedContact.name.charAt(0)}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-gray-900">
//                   {selectedContact.name}
//                 </h3>
//                 <span className="text-sm text-green-500">Online</span>
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full hover:bg-gray-100"
//               >
//                 <Phone className="w-5 h-5 text-gray-600" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full hover:bg-gray-100"
//               >
//                 <Video className="w-5 h-5 text-gray-600" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="rounded-full hover:bg-gray-100"
//               >
//                 <MoreVertical className="w-5 h-5 text-gray-600" />
//               </Button>
//             </div>
//           </div>

//           <ChatArea selectedContact={selectedContact} />
//         </div>
//       ) : (
//         <div className="flex-1 flex items-center justify-center bg-gray-50">
//           <div className="text-center p-8 bg-white rounded-lg shadow-sm">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <MessagesSquare className="w-8 h-8 text-blue-600" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No conversation selected
//             </h3>
//             <p className="text-gray-500">
//               Choose a conversation or start a new one to begin messaging
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessagingInterface;

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessagesSquare,
  Plus,
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";
import ConversationList from "./ConversationList";
import ChatArea from "./ChatArea";
import NewMessageDialog from "./NewMessageDialog";
import { Button } from "@/components/ui/button";

const MessagingInterface = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddContact = (newContact) => {
    setConversations((prevConversations) => {
      const isContactExists = prevConversations.some(
        (conversation) => conversation.id === newContact.id
      );
      if (isContactExists) {
        alert("Contact already exists in your conversations.");
        return prevConversations;
      }
      return [newContact, ...prevConversations];
    });
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredConversations(conversations);
    } else {
      setFilteredConversations(
        conversations.filter((conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, conversations]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      {/* Sidebar */}
      <div className="h-full flex flex-col w-80 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">
            Messages
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              className="pl-10 bg-gray-50 border-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <NewMessageDialog onAddContact={handleAddContact} />
        </div>

        <ConversationList
          conversations={filteredConversations}
          onSelectContact={setSelectedContact}
          selectedId={selectedContact?.id}
          setConversations={setConversations}
        />
      </div>

      {/* Main Chat Area */}
      {selectedContact ? (
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                {selectedContact.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">
                  {selectedContact.name}
                </h3>
                <span className="text-sm text-green-500">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
              >
                <Phone className="w-5 h-5 text-purple-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
              >
                <Video className="w-5 h-5 text-purple-600" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-purple-50"
              >
                <MoreVertical className="w-5 h-5 text-purple-600" />
              </Button>
            </div>
          </div>

          <ChatArea selectedContact={selectedContact} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-8 bg-white rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessagesSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              No conversation selected
            </h3>
            <p className="text-gray-500">
              Choose a conversation or start a new one to begin messaging
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingInterface;
