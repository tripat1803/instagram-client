import { useState } from 'react';
import { authAxios } from '@/utils/api';

export default function UserFollow() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const handleFollow = (userId, callback) => {
    if(loader) return;
    setLoader(true);
    authAxios.get(`/api/relation/create/${userId}`).then(() => {
        callback();
        setLoader(false);
        setError(false);
    }).catch(() => {
        setLoader(false);
        setError(true);
    });
  }

  return {
    error,
    loader,
    handleFollow
  }
}
