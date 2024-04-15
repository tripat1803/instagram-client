"use client";

import { AuthContext } from '@/app/layout';
import React, { useContext, useEffect, useState } from 'react';
import { MdSettings } from "react-icons/md";
import { IoAdd, IoBookmarkOutline } from "react-icons/io5";
import { IoMdGrid } from "react-icons/io";
import { LiaIdCardAltSolid } from "react-icons/lia";
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Footer from '@/components/global/Footer';
import { authAxios } from '@/utils/api';
import UserFollow from '@/hooks/UserFollow';

export default function AccountLayout({ children }) {
    let params = useParams();
    let pathname = usePathname();
    let { userDetails } = useContext(AuthContext);
    const [isUserAccount, setIsUserAccount] = useState(false);
    const [userData, setUserData] = useState(null);
    const { error, loader, handleFollow } = UserFollow();

    useEffect(() => {
        if (!userDetails) return;
        if (userDetails.alias !== params.id) {
            setIsUserAccount(false);
            authAxios.get(`/api/relation/${params.id}`).then(res => {
                setUserData(res.data);
            }).catch((err) => { });
        } else {
            setIsUserAccount(true);
            setUserData(userDetails);
        }
    }, [userDetails]);

    // console.log(userData);

    return (
        <div className='px-8 py-8 h-full flex justify-center overflow-y-scroll'>
            <div className='flex flex-col gap-12 items-center w-full'>
                <div className='w-full max-w-[50rem] flex gap-[90px]'>
                    <div className='w-[150px] h-[150px] bg-gray-400 rounded-full'></div>
                    <div className='flex flex-col justify-between'>
                        <div className='flex items-center gap-6'>
                            <h2 className='text-lg'>{userData?.alias}</h2>
                            {
                                <div className='flex items-center'>
                                    {
                                        (!isUserAccount && (!userData?.relation?.isFollowing && !userData?.relation?.isOutgoingRequest)) && <button disabled={loader} onClick={() => {
                                            handleFollow(userData?.alias, () => {});
                                        }} className='text-sm bg-[#0095F6] text-white hover:bg-[#1877F2] font-medium px-4 py-1.5 rounded-md'>Follow</button>
                                    }
                                    {
                                        (!isUserAccount && userData?.relation?.isFollowing) && <button className='text-sm bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] font-medium px-4 py-1.5 rounded-md'>Following</button>
                                    }
                                    {
                                        (!isUserAccount && userData?.relation?.isOutgoingRequest) && <button className='text-sm bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] font-medium px-4 py-1.5 rounded-md'>Requested</button>
                                    }
                                    {
                                        (isUserAccount) && <>
                                            <button className='text-sm bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] font-medium px-4 py-1.5 rounded-md'>Edit Profile</button>
                                            <MdSettings size={26} className='ml-3 cursor-pointer' />
                                        </>
                                    }
                                </div>
                            }
                        </div>
                        <div>
                            <div className='flex items-center gap-8'>
                                <p><span className='font-semibold text-lg'>0</span> posts</p>
                                <p><span className='font-semibold text-lg'>320</span> followers</p>
                                <p><span className='font-semibold text-lg'>383</span> following</p>
                            </div>
                            <div className='mt-4'>
                                <p className='font-semibold'>{userData?.fullname}</p>
                                <p className='font-semibold'>{userData?.bio}</p>
                            </div>
                        </div>
                        <div></div>
                    </div>
                </div>
                {
                    ((!userData?.isAccountPublic || userData?.relation?.isFollowing) && !isUserAccount) ? <div className='border border-t-[rgba(0,0,0,0.2)] p-8 w-full min-h-[200px] flex justify-center items-center'>
                        <div className='flex flex-col gap-4 items-center w-[25%]'>
                            <p className='text-sm font-semibold text-center'>This Account is Private</p>
                            <p className='text-center'>Follow to see their photos and videos.</p>
                        </div>
                    </div> : <>
                        <div className='w-full max-w-4xl'>
                            <div className='w-[max-content] flex flex-col items-center gap-2 cursor-pointer'>
                                <div className='border border-[rgba(0,0,0,0.3)] rounded-full p-1'>
                                    <div className='bg-[rgba(0,0,0,0.02)] w-[70px] h-[70px] rounded-full flex justify-center items-center'>
                                        <IoAdd size={60} className='text-[rgba(0,0,0,0.2)]' />
                                    </div>
                                </div>
                                <p className='text-sm'>New</p>
                            </div>
                        </div>
                        <div className='border-t w-full flex flex-col items-center'>
                            <div className='flex gap-12 items-center'>
                                <Link href={`/${userData?.alias}`} className={`py-3 flex items-center gap-1.5 ${(pathname === `/${userData?.alias}`) ? "border-t border-[#000] text-[#000]" : "text-[rgba(0,0,0,0.6)]"} mt-[-1px] uppercase font-medium tracking-widest text-xs`}><IoMdGrid size={14} />Posts</Link>
                                {(isUserAccount) && <Link href={`/${userData?.alias}/saved`} className={`py-3 flex items-center gap-1.5 ${(pathname === `/${userData?.alias}/saved`) ? "border-t border-[#000] text-[#000]" : "text-[rgba(0,0,0,0.6)]"} mt-[-1px] uppercase font-medium tracking-widest text-xs`}><IoBookmarkOutline size={14} />Saved</Link>}
                                <Link href={`/${userData?.alias}/tagged`} className={`py-3 flex items-center gap-1.5 ${(pathname === `/${userData?.alias}/tagged`) ? "border-t border-[#000] text-[#000]" : "text-[rgba(0,0,0,0.6)]"} mt-[-1px] uppercase font-medium tracking-widest text-xs`}><LiaIdCardAltSolid size={18} />Tagged</Link>
                            </div>
                            <div>{children}</div>
                        </div>
                    </>
                }
                <Footer />
            </div>
        </div>
    )
}