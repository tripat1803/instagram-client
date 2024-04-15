import UserLayout from '@/components/user/UserLayout';
import React from 'react';

export const metadata = {
  title: "Instagram"
}

export default function Layout({ children }) {
  return (
    <UserLayout>
      {children}
    </UserLayout>
  )
}