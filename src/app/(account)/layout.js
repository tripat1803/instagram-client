import React from 'react';
import Footer from '@/components/global/Footer';

export default function Layout({ children }) {
    return (
        <>
            {children}
            <Footer/>
        </>
    )
}