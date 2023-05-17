"use client"
import User from '@/types/user/User'
import React, { useState } from 'react'
import Link from "next/link"
import useFollow from '@/hook/useFollow'
import Avatar from '../components/Avatar'
import FollowUserButton from './FollowUserButton'

type Props = {
    user: User
}

const FollowerProfileCard = (props: Props) => {
    const { user: { bio, email, image, username, userId } } = props;

    return (
        <div className='w-full flex justify-between items-center my-4'>
            <div className="left h-full  flex  justify-between w-[60%]">
                <Avatar username={username} image={image} width={30} height={30} />
                <div className="detail flex flex-col w-[80%] ">
                    <Link href={`users/${username}`}>
                        <p className='text-[#292929] text-sm'>{username}</p>
                    </Link>
                    <p className='text-[#757575] text-xs '>{bio}</p>
                </div>
            </div>
            <div className="right">
                <FollowUserButton />
            </div>
        </div>
    )
}

export default FollowerProfileCard
