import React from 'react'
import Link from "next/link";

type Props = {}

const page = (props: Props) => {
  return (
    <div className='h-[100vh] flex text-2xl font-semibold justify-center items-center m-5 p-2'>
        Since your username and password are system genereated, you cannot change it by yourself.
        <br />
        To retrieve your system genereated password, please send an email to systems@vit.edu.in and visit the systems office located in E101.
    </div>
  )
}

export default page