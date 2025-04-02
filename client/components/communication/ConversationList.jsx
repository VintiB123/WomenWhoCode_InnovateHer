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
//     // Commented out backend fetching logic
//     const mockContacts = {
//       ngos: [
//         {
//           id: "ngo1",
//           name: "Green Hope Foundation",
//           type: "NGO",
//           lastActive: moment().subtract(30, "minutes").fromNow(),
//         },
//       ],
//       corporates: [
//         {
//           id: "corp1",
//           name: "Tech Innovations Inc.",
//           type: "COR",
//           lastActive: moment().subtract(45, "minutes").fromNow(),
//         },
//       ],
//       volunteers: [
//         {
//           id: "vol1",
//           name: "Sarah Johnson",
//           type: "VOL",
//           lastActive: moment().subtract(15, "minutes").fromNow(),
//         },
//       ],
//     };

//     setContacts(mockContacts);
//     setConversations(Object.values(mockContacts).flat());
//   }, [setConversations]);

//   const handleClick = (contact) => onSelectContact(contact);

//   const renderSection = (title, contactsList) => {
//     if (contactsList.length === 0) return null;

//     return (
//       <div className="mb-6">
//         <h3 className="px-4 mb-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
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
//                     ? "bg-lavender-50 border-l-4 border-purple-600"
//                     : "hover:bg-gray-50 border-l-4 border-transparent"
//                 }`}
//             >
//               <Avatar className="h-12 w-12">
//                 <AvatarFallback className="bg-purple-100 text-purple-600 font-medium">
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
//                     <Badge variant="default" className="bg-purple-600">
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
//           <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
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
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";

const ConversationList = ({
  onSelectContact,
  selectedId,
  setConversations,
}) => {
  const params = useParams();
  const role = params?.role;
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Comprehensive mock data with mentors and mentees
    const allContacts = [
      // Mentors
      {
        id: "mentor1",
        name: "Rajesh Kumar",
        type: "Mentor",
        role: "mentor",
        lastActive: moment().subtract(15, "minutes").fromNow(),
        specialization: "Software Engineering",
        experience: "10 years",
      },
      {
        id: "mentor2",
        name: "Priya Sharma",
        type: "Mentor",
        role: "mentor",
        lastActive: moment().subtract(20, "minutes").fromNow(),
        specialization: "Data Science",
        experience: "8 years",
      },
      {
        id: "mentor3",
        name: "Vikram Patel",
        type: "Mentor",
        role: "mentor",
        lastActive: moment().subtract(30, "minutes").fromNow(),
        specialization: "Product Management",
        experience: "12 years",
      },
      // Mentees
      {
        id: "mentee1",
        name: "Amit Desai",
        type: "Mentee",
        role: "mentee",
        lastActive: moment().subtract(10, "minutes").fromNow(),
        goal: "Career Transition to Tech",
        industry: "Banking",
      },
      {
        id: "mentee2",
        name: "Neha Gupta",
        type: "Mentee",
        role: "mentee",
        lastActive: moment().subtract(25, "minutes").fromNow(),
        goal: "Leadership Development",
        industry: "Healthcare",
      },
      {
        id: "mentee3",
        name: "Rohan Mehta",
        type: "Mentee",
        role: "mentee",
        lastActive: moment().subtract(40, "minutes").fromNow(),
        goal: "Startup Entrepreneurship",
        industry: "E-commerce",
      },
    ];

    // Show all contacts except the current user's role
    const contactsToSet = allContacts.filter(
      (contact) => contact.role !== role
    );

    setContacts(contactsToSet);
    setConversations(contactsToSet);
  }, [role, setConversations]);

  const handleClick = (contact) => onSelectContact(contact);

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
      <div className="mb-6">
        <h3 className="px-4 mb-2 text-xs font-semibold text-purple-600 uppercase tracking-wider">
          {role === "mentor" ? "Mentees" : "Mentors"}
        </h3>
        <div className="space-y-1">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
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
                    <span className="text-xs text-gray-500">
                      {contact.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 truncate">
                      {contact.specialization || contact.goal}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {contact.lastActive}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500 p-4">
                <p className="mb-2">No contacts available</p>
                <span className="text-sm">Start exploring connections</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
