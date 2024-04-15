"use client";

import React from 'react';
import AccountLayout from '@/components/user/AccountLayout';

export default function Layout({ children }) {
    return (
        <AccountLayout>
            {children}
        </AccountLayout>
    )
}