import Link from 'next/link';
import React from 'react';

const cta = [
    {
        name: "Meta",
        link: ""
    },
    {
        name: "About",
        link: ""
    },
    {
        name: "Blog",
        link: ""
    },
    {
        name: "Jobs",
        link: ""
    },
    {
        name: "Help",
        link: ""
    },
    {
        name: "Api",
        link: ""
    },
    {
        name: "Privacy",
        link: ""
    },
    {
        name: "Terms",
        link: ""
    },
    {
        name: "Locations",
        link: ""
    },
    {
        name: "Instagram Lite",
        link: ""
    },
    {
        name: "Threads",
        link: ""
    },
    {
        name: "Contact Uploading & Non-Users",
        link: ""
    },
    {
        name: "Meta Verified",
        link: ""
    },
]

export default function Footer() {
  return (
    <div className='pb-[52px] pt-[44px] flex flex-col gap-4 px-8'>
        <div className='flex items-center flex-wrap gap-4 justify-center'>
            {
                cta.map((item) => (
                    <Link key={item.name} className='text-[0.75rem] text-[#666666]' href={item.link}>{item.name}</Link>
                ))
            }
        </div>
        <div className='flex items-center flex-wrap gap-4 justify-center text-[0.75rem] text-[#666666]'>
            <p></p>
            <p>© 2024 Instagram from Meta</p>
        </div>
    </div>
  )
}
