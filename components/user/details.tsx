'use client';

import { useState } from 'react';
import Button from '../Button';
import EditUserForm from './edit-user';
import { useData } from 'app/context/user-favorites';

export default function UserDetails({
  username,
  email,
  id,
}: {
  username: string;
  email: string;
  id: string;
}) {
  const [editProfile, setEditProfile] = useState(false);
  const { favorites } = useData();

  const toggleEdit = () => {
    setEditProfile((prev) => !prev);
  };
  const details = [
    {
      title: 'email',
      value: email,
    },
    {
      title: 'username',
      value: username,
    },
  ];

  const content = editProfile ? (
    <EditUserForm
      email={email}
      username={username}
      id={id}
      toggleEdit={toggleEdit}
    />
  ) : (
    details.map(({ title, value }) => (
      <div className='flex items-center' key={title}>
        <p className='min-w-[8rem] capitalize'>{title}</p>
        <p>{value}</p>
      </div>
    ))
  );

  return (
    <div className='col-span-12 lg:col-span-4 border border-dull flex flex-col gap-3 h-fit px-5 pt-7 py-3 justify-start lg:col-start-9'>
      {content}
      {editProfile ? null : (
        <Button
          onClick={() => {
            setEditProfile((prev) => !prev);
          }}
          className='w-fit  bg-gray-600 py-1 capitalize rounded-xl px-2 text-white pointer-events-none'
        >
          edit profile
        </Button>
      )}
    </div>
  );
}
