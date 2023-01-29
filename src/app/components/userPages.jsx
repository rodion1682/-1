import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../api';
import Quality from './quality';

const UserPages = () => {
   const params = useParams();
   const { userId } = params;
   const [selectedUser, setSelectedUser] = useState(null);
   const history = useHistory();
   const handleBack = () => {
      history.push('/users');
   };

   useEffect(() => {
      async function fetchData() {
         const user = await api.users.getById(userId);
         setSelectedUser(user);
      }
      fetchData();
   }, [userId]);

   if (!selectedUser) return <div>Loading...</div>;

   return (
      <>
         {
            <div key={selectedUser._id}>
               <h1>{selectedUser.name}</h1>
               <h2>{selectedUser.profession.name}</h2>
               {selectedUser.qualities.map((qual) => (
                  <Quality {...qual} key={qual._id} />
               ))}
               <div>completedMeetings: {selectedUser.completedMeetings}</div>
               <h3>Rate: {selectedUser.rate}</h3>
               <button
                  onClick={() => {
                     handleBack();
                  }}
               >
                  Back to all users
               </button>
            </div>
         }
      </>
   );
};

export default UserPages;
