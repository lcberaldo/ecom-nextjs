'use client'

import backButton from '../assets/back-icon.svg'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Backbutton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} className='flex items-center gap-2 mb-6'>
      <Image src={backButton} alt="back button" />
      <span className='text-sm text-[#617480] '> Voltar</span>
    </button>
  )
}
