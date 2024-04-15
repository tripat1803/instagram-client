import Signin from '@/components/accounts/Signin';
import React from 'react';

export const metadata = {
  title: "Instagram"
}

export default function Default() {
  return (
    <Signin leftImage={true} />
  )
}