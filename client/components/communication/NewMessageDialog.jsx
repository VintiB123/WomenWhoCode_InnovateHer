// // import React, { useEffect, useState } from "react";
// // import { useDebounce } from "use-debounce";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogHeader,
// //   DialogTitle,
// //   DialogTrigger,
// // } from "@/components/ui/dialog";
// // import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// // import { PlusCircle } from "lucide-react";
// // import { Input } from "../ui/input";

// // const NewMessageDialog = ({ onAddContact }) => {
// //   const [open, setOpen] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [contacts, setContacts] = useState({
// //     volunteers: [],
// //     corporates: [],
// //     ngos: [],
// //     admins: [],
// //   });
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchContacts = async () => {
// //       setIsLoading(true);
// //       setError(null);

// //       const userData = localStorage.getItem("user");
// //       const user = userData ? JSON.parse(userData) : null;
// //       const userId = user?._id;
// //       try {
// //         const response = await fetch(
// //           `http://localhost:4224/api/contacts/get-contacts/${userId}`,
// //           {
// //             method: "GET",
// //             headers: { "Content-Type": "application/json" },
// //           }
// //         );

// //         if (!response.ok) {
// //           throw new Error(`HTTP error! status: ${response.status}`);
// //         }

// //         const result = await response.json();
// //         setContacts({
// //           volunteers: result.contacts?.volunteers || [],
// //           corporates: result.contacts?.corporates || [],
// //           ngos: result.contacts?.ngos || [],
// //           admins: result.contacts?.admins || [],
// //         });
// //       } catch (error) {
// //         setError(error.message || "Failed to fetch contacts");
// //         setContacts({
// //           volunteers: [],
// //           corporates: [],
// //           ngos: [],
// //           admins: [],
// //         });
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchContacts();
// //   }, []);

// //   const contactsList = [
// //     ...contacts.volunteers.map((contact) => ({
// //       id: contact.volunteer_id,
// //       name: contact.name,
// //       type: "Volunteer",
// //       volunteer_id: contact.volunteer_id,
// //     })),
// //     ...contacts.corporates.map((contact) => ({
// //       id: contact.corporate_id,
// //       name: contact.name,
// //       type: "Corporate",
// //       corporate_id: contact.corporate_id,
// //     })),
// //     ...contacts.ngos.map((contact) => ({
// //       id: contact.ngo_id,
// //       name: contact.name,
// //       type: "NGO",
// //       ngo_id: contact.ngo_id,
// //     })),
// //     ...contacts.admins.map((contact) => ({
// //       id: contact.admin_id,
// //       name: contact.name,
// //       type: "Admin",
// //       admin_id: contact.admin_id,
// //     })),
// //   ];

// //   const [debouncedSearch] = useDebounce(search, 300);
// //   const filteredContacts = contactsList.filter((contact) =>
// //     contact.name.toLowerCase().includes(search.toLowerCase())
// //   );

// //   const handleSelectContact = (contact) => {
// //     onAddContact({
// //       id: contact.id,
// //       name: contact.name,
// //       lastMessage: "New conversation",
// //       time: "Just now",
// //       unread: true,
// //       type: contact.type,
// //       volunteer_id: contact.volunteer_id || null,
// //       corporate_id: contact.corporate_id || null,
// //       ngo_id: contact.ngo_id || null,
// //       admin_id: contact.admin_id || null,
// //     });
// //     setOpen(false);
// //     setSearch("");
// //   };

// //   return (
// //     <Dialog open={open} onOpenChange={setOpen}>
// //       <DialogTrigger asChild>
// //         <Button className="w-full mb-4 gap-2 rounded-full font-medium">
// //           <PlusCircle className="w-4 h-4" />
// //           New Contact
// //         </Button>
// //       </DialogTrigger>
// //       <DialogContent className="sm:max-w-[425px]">
// //         <DialogHeader>
// //           <DialogTitle>New Contact</DialogTitle>
// //         </DialogHeader>
// //         <div className="rounded-lg border shadow-md">
// //           <div className="flex items-center gap-2 p-2">
// //             <Input
// //               placeholder="Search Contacts"
// //               value={search}
// //               onChange={(e) => setSearch(e.target.value)}
// //               className="rounded-full"
// //             />
// //           </div>
// //           {isLoading ? (
// //             <div className="p-4 text-center text-gray-500">
// //               Loading contacts...
// //             </div>
// //           ) : error ? (
// //             <div className="p-4 text-center text-red-500">
// //               Error loading contacts
// //             </div>
// //           ) : filteredContacts.length === 0 ? (
// //             <div className="p-4 text-center text-gray-500">
// //               No contacts found.
// //             </div>
// //           ) : (
// //             <div className="max-h-[300px] overflow-auto">
// //               {filteredContacts.map((contact) => (
// //                 <div
// //                   key={contact.id}
// //                   onClick={() => handleSelectContact(contact)}
// //                   className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-100"
// //                 >
// //                   <Avatar className="h-10 w-10">
// //                     <AvatarFallback>
// //                       {contact.name
// //                         .split(" ")
// //                         .map((n) => n[0])
// //                         .join("")
// //                         .toUpperCase()}
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div className="flex flex-col">
// //                     <span className="font-medium">{contact.name}</span>
// //                     <span className="text-sm text-gray-500">
// //                       {contact.type}
// //                     </span>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </DialogContent>
// //     </Dialog>
// //   );
// // };

// // export default NewMessageDialog;

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { PlusCircle } from "lucide-react";
// import { Input } from "@/components/ui/input";

// const NewMessageDialog = ({ onAddContact }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [contacts, setContacts] = useState({
//     volunteers: [],
//     corporates: [],
//     ngos: [],
//     admins: [],
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Mocked contacts data instead of backend fetching
//     const mockContacts = {
//       volunteers: [
//         { volunteer_id: "vol1", name: "Sarah Johnson", type: "Volunteer" },
//         { volunteer_id: "vol2", name: "Mike Williams", type: "Volunteer" },
//       ],
//       corporates: [
//         { corporate_id: "corp1", name: "Tech Innovations", type: "Corporate" },
//         { corporate_id: "corp2", name: "Global Solutions", type: "Corporate" },
//       ],
//       ngos: [
//         { ngo_id: "ngo1", name: "Green Hope Foundation", type: "NGO" },
//         { ngo_id: "ngo2", name: "Community Care", type: "NGO" },
//       ],
//       admins: [{ admin_id: "admin1", name: "John Doe", type: "Admin" }],
//     };

//     setContacts(mockContacts);
//   }, []);

//   const contactsList = [
//     ...contacts.volunteers.map((contact) => ({
//       id: contact.volunteer_id,
//       name: contact.name,
//       type: "Volunteer",
//       volunteer_id: contact.volunteer_id,
//     })),
//     ...contacts.corporates.map((contact) => ({
//       id: contact.corporate_id,
//       name: contact.name,
//       type: "Corporate",
//       corporate_id: contact.corporate_id,
//     })),
//     ...contacts.ngos.map((contact) => ({
//       id: contact.ngo_id,
//       name: contact.name,
//       type: "NGO",
//       ngo_id: contact.ngo_id,
//     })),
//     ...contacts.admins.map((contact) => ({
//       id: contact.admin_id,
//       name: contact.name,
//       type: "Admin",
//       admin_id: contact.admin_id,
//     })),
//   ];

//   const filteredContacts = contactsList.filter((contact) =>
//     contact.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleSelectContact = (contact) => {
//     onAddContact({
//       id: contact.id,
//       name: contact.name,
//       lastMessage: "New conversation",
//       time: "Just now",
//       unread: true,
//       type: contact.type,
//       volunteer_id: contact.volunteer_id || null,
//       corporate_id: contact.corporate_id || null,
//       ngo_id: contact.ngo_id || null,
//       admin_id: contact.admin_id || null,
//     });
//     setOpen(false);
//     setSearch("");
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogTrigger asChild>
//         <Button className="w-full mb-4 gap-2 rounded-full font-medium bg-purple-600 hover:bg-purple-700 text-white">
//           <PlusCircle className="w-4 h-4" />
//           New Contact
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle className="text-purple-800">New Contact</DialogTitle>
//         </DialogHeader>
//         <div className="rounded-lg border shadow-md">
//           <div className="flex items-center gap-2 p-2">
//             <Input
//               placeholder="Search Contacts"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="rounded-full focus:ring-2 focus:ring-purple-500"
//             />
//           </div>
//           {isLoading ? (
//             <div className="p-4 text-center text-gray-500">
//               Loading contacts...
//             </div>
//           ) : error ? (
//             <div className="p-4 text-center text-red-500">
//               Error loading contacts
//             </div>
//           ) : filteredContacts.length === 0 ? (
//             <div className="p-4 text-center text-gray-500">
//               No contacts found.
//             </div>
//           ) : (
//             <div className="max-h-[300px] overflow-auto">
//               {filteredContacts.map((contact) => (
//                 <div
//                   key={contact.id}
//                   onClick={() => handleSelectContact(contact)}
//                   className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50"
//                 >
//                   <Avatar className="h-10 w-10">
//                     <AvatarFallback className="bg-purple-100 text-purple-600">
//                       {contact.name
//                         .split(" ")
//                         .map((n) => n[0])
//                         .join("")
//                         .toUpperCase()}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex flex-col">
//                     <span className="font-medium text-purple-900">
//                       {contact.name}
//                     </span>
//                     <span className="text-sm text-purple-600">
//                       {contact.type}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default NewMessageDialog;

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const NewMessageDialog = ({ onAddContact }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState({
    mentors: [],
    mentees: [],
    admins: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Mocked contacts data with Indian names
    const mockContacts = {
      mentors: [
        { mentor_id: "mentor1", name: "Rajesh Patel", type: "Mentor" },
        { mentor_id: "mentor2", name: "Priya Sharma", type: "Mentor" },
        { mentor_id: "mentor3", name: "Anil Gupta", type: "Mentor" },
      ],
      mentees: [
        { mentee_id: "mentee1", name: "Rohit Khanna", type: "Mentee" },
        { mentee_id: "mentee2", name: "Neha Reddy", type: "Mentee" },
        { mentee_id: "mentee3", name: "Vikram Singh", type: "Mentee" },
      ],
      admins: [
        { admin_id: "admin1", name: "Deepa Iyer", type: "Admin" },
        { admin_id: "admin2", name: "Sanjay Mehta", type: "Admin" },
      ],
    };

    setContacts(mockContacts);
  }, []);

  const contactsList = [
    ...contacts.mentors.map((contact) => ({
      id: contact.mentor_id,
      name: contact.name,
      type: "Mentor",
      mentor_id: contact.mentor_id,
    })),
    ...contacts.mentees.map((contact) => ({
      id: contact.mentee_id,
      name: contact.name,
      type: "Mentee",
      mentee_id: contact.mentee_id,
    })),
    ...contacts.admins.map((contact) => ({
      id: contact.admin_id,
      name: contact.name,
      type: "Admin",
      admin_id: contact.admin_id,
    })),
  ];

  const filteredContacts = contactsList.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectContact = (contact) => {
    onAddContact({
      id: contact.id,
      name: contact.name,
      lastMessage: "New conversation",
      time: "Just now",
      unread: true,
      type: contact.type,
      mentor_id: contact.mentor_id || null,
      mentee_id: contact.mentee_id || null,
      admin_id: contact.admin_id || null,
    });
    setOpen(false);
    setSearch("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-4 gap-2 rounded-full font-medium bg-purple-600 hover:bg-purple-700 text-white">
          <PlusCircle className="w-4 h-4" />
          New Contact
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-purple-800">New Contact</DialogTitle>
        </DialogHeader>
        <div className="rounded-lg border shadow-md">
          <div className="flex items-center gap-2 p-2">
            <Input
              placeholder="Search Contacts"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              Loading contacts...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">
              Error loading contacts
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No contacts found.
            </div>
          ) : (
            <div className="max-h-[300px] overflow-auto">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleSelectContact(contact)}
                  className="flex items-center gap-3 p-2 cursor-pointer hover:bg-purple-50"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-purple-900">
                      {contact.name}
                    </span>
                    <span className="text-sm text-purple-600">
                      {contact.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewMessageDialog;
