import AccountLayout from '@/components/user/AccountLayout'
import React from 'react'

export default function Layout({children}) {
  return (
    <AccountLayout>
        {children}
    </AccountLayout>
  )
}
