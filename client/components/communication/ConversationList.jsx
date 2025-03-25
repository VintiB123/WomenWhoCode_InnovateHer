// import React, { useEffect, useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import moment from "moment";

// const ConversationList = ({
//   onSelectContact,
//   selectedId,
//   setConversations,
// }) => {
//   const [contacts, setContacts] = useState({
//     ngos: [],
//     corporates: [],
//     volunteers: [],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchContacts = async () => {
//       setIsLoading(true);
//       setError(null);

//       const userData = localStorage.getItem("user");
//       const user = userData ? JSON.parse(userData) : null;
//       const userId = user?._id;

//       try {
//         const response = await fetch(
//           `http://localhost:4224/api/contacts/get-contacts/${userId}`,
//           {
//             method: "GET",
//             headers: { "Content-Type": "application/json" },
//           }
//         );

//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);

//         const result = await response.json();
//         // console.log(result.contacts);
//         if (!Array.isArray(result.contacts)) {
//           throw new Error("Unexpected response format: Expected an array.");
//         }

//         const categorizedContacts = {
//           ngos: result.contacts
//             .filter((contact) => contact.type === "NGO")
//             .map((ngo) => ({
//               id: ngo._id,
//               name: ngo.name,
//               type: ngo.type,
//               lastActive: moment()
//                 .subtract(Math.random() * 60, "minutes")
//                 .fromNow(),
//             })),
//           corporates: result.contacts
//             .filter((contact) => contact.type === "COR")
//             .map((corp) => ({
//               id: corp._id,
//               name: corp.companyName || corp.name,
//               type: corp.type,
//               lastActive: moment()
//                 .subtract(Math.random() * 60, "minutes")
//                 .fromNow(),
//             })),
//           volunteers: result.contacts
//             .filter((contact) => contact.type === "VOL")
//             .map((vol) => ({
//               id: vol._id,
//               name: vol.name,
//               type: vol.type,
//               lastActive: moment()
//                 .subtract(Math.random() * 60, "minutes")
//                 .fromNow(),
//             })),
//         };

//         setContacts(categorizedContacts);
//         setConversations((prev) => [
//           ...prev,
//           ...Object.values(categorizedContacts).flat(),
//         ]);
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         setError(error.message || "Failed to fetch contacts");
//         setContacts({ ngos: [], corporates: [], volunteers: [] });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContacts();
//   }, [setConversations]);

//   const handleClick = (contact) => onSelectContact(contact);

//   const renderSection = (title, contactsList) => {
//     if (contactsList.length === 0) return null;

//     return (
//       <div className="mb-6">
//         <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//           {title}
//         </h3>
//         <div className="space-y-1">
//           {contactsList.map((contact) => (
//             <div
//               key={contact.id}
//               onClick={() => handleClick(contact)}
//               className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200
//                 ${
//                   selectedId === contact.id
//                     ? "bg-blue-50 border-l-4 border-blue-600"
//                     : "hover:bg-gray-50 border-l-4 border-transparent"
//                 }`}
//             >
//               <Avatar className="h-12 w-12">
//                 <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
//                   {contact.name
//                     .split(" ")
//                     .map((n) => n[0])
//                     .join("")
//                     .toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between">
//                   <span className="font-medium text-gray-900">
//                     {contact.name}
//                   </span>
//                   <span className="text-xs text-gray-500">{contact.time}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500 truncate">
//                     {contact.lastMessage || "Start a conversation"}
//                   </span>
//                   {contact.unread && (
//                     <Badge variant="default" className="bg-blue-600">
//                       New
//                     </Badge>
//                   )}
//                 </div>
//                 <span className="text-xs text-gray-400">
//                   {contact.lastActive}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
//           <p className="text-gray-500">Loading contacts...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <div className="text-center p-4">
//           <div className="text-red-500 mb-2">Error loading contacts</div>
//           <p className="text-sm text-gray-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <ScrollArea className="flex-1">
//       {renderSection("NGOs", contacts.ngos)}
//       {renderSection("Corporates", contacts.corporates)}
//       {renderSection("Volunteers", contacts.volunteers)}
//       {Object.values(contacts).every((list) => list.length === 0) && (
//         <div className="flex items-center justify-center h-full">
//           <div className="text-center text-gray-500 p-4">
//             <p className="mb-2">No conversations yet</p>
//             <span className="text-sm">
//               Start a new conversation to get started
//             </span>
//           </div>
//         </div>
//       )}
//     </ScrollArea>
//   );
// };

// export default ConversationList;

import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

const ConversationList = ({
  onSelectContact,
  selectedId,
  setConversations,
}) => {
  const [contacts, setContacts] = useState({
    ngos: [],
    corporates: [],
    volunteers: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Commented out backend fetching logic
    const mockContacts = {
      ngos: [
        {
          id: "ngo1",
          name: "Green Hope Foundation",
          type: "NGO",
          lastActive: moment().subtract(30, "minutes").fromNow(),
        },
      ],
      corporates: [
        {
          id: "corp1",
          name: "Tech Innovations Inc.",
          type: "COR",
          lastActive: moment().subtract(45, "minutes").fromNow(),
        },
      ],
      volunteers: [
        {
          id: "vol1",
          name: "Sarah Johnson",
          type: "VOL",
          lastActive: moment().subtract(15, "minutes").fromNow(),
        },
      ],
    };

    setContacts(mockContacts);
    setConversations(Object.values(mockContacts).flat());
  }, [setConversations]);

  const handleClick = (contact) => onSelectContact(contact);

  const renderSection = (title, contactsList) => {
    if (contactsList.length === 0) return null;

    return (
      <div className="mb-6">
        <h3 className="px-4 mb-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
          {title}
        </h3>
        <div className="space-y-1">
          {contactsList.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleClick(contact)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 
                ${
                  selectedId === contact.id
                    ? "bg-lavender-50 border-l-4 border-purple-600"
                    : "hover:bg-gray-50 border-l-4 border-transparent"
                }`}
            >
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-purple-100 text-purple-600 font-medium">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {contact.name}
                  </span>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 truncate">
                    {contact.lastMessage || "Start a conversation"}
                  </span>
                  {contact.unread && (
                    <Badge variant="default" className="bg-purple-600">
                      New
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {contact.lastActive}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-4">
          <div className="text-red-500 mb-2">Error loading contacts</div>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      {renderSection("NGOs", contacts.ngos)}
      {renderSection("Corporates", contacts.corporates)}
      {renderSection("Volunteers", contacts.volunteers)}
      {Object.values(contacts).every((list) => list.length === 0) && (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-gray-500 p-4">
            <p className="mb-2">No conversations yet</p>
            <span className="text-sm">
              Start a new conversation to get started
            </span>
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default ConversationList;
