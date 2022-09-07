import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
//import faker from 'faker'; 
//import { faker } from '@faker-js/faker'; 
import Story from './Story';

//const USERS: any[] = [];

const Stories = () => {
  const [suggestions, setSuggestions]:any[] = useState([]);
  const { data: session} = useSession();

  useEffect(()=>{
    
    fetch('https://dummyjson.com/users')
    .then(res=>res.json())
    .then((data:any)=>setSuggestions(data))
    .catch(e=>console.log(e));

  },[])

  //console.log(suggestions);
  // function createRandomUser(): any {
  //   return {
  //     userId: faker.datatype.uuid(),
  //     username: faker.internet.userName(),
  //     email: faker.internet.email(),
  //     avatar: faker.image.avatar(),
  //     password: faker.internet.password(),
  //     birthdate: faker.date.birthdate(),
  //     registeredAt: faker.date.past(),
  //   };
  // }

  // useEffect(() => {
  //   const suggestions = 
    
  //   [...Array(20)].map((_, i)=>{
  //     USERS?.push(createRandomUser());
  //   })
    
  //   setSuggestions(suggestions);
  // },[])
   
  return (
    <div className='flex border border-gray-200 p-6 mt-8 overflow-x-scroll space-x-3 bg-white rounded-md scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <Story img={session?.user?.image} username={session?.user?.name}/>
      )}

      {
      suggestions?.users?.map((profile:any)=>( 
       
        <Story 
        key={profile.id} 
        username={profile.username}
        img={profile.image}
        />
      
        ))}
    </div>
  )
}

export default Stories;