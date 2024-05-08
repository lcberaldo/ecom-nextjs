'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

type LinkProps = {
  page: number,
}

export default function PaginationLink({ page }: LinkProps) {
  const searchParams = useSearchParams()

  const isActive = String(page) === (searchParams.get('page') || '1')

  const tab = searchParams.get('tab')
  const sortBy = searchParams.get('sortBy')

  let query = `?page=${page}`

  if (tab) {
    query = `?tab=${tab}&page=${page}`
  }

  if (sortBy) {
    query = `?sortBy=${sortBy}&page=${page}`
  }

  if (tab && sortBy) {
    query = `?tab=${tab}&sortBy=${sortBy}&page=${page}`
  }

  return (
    <Link
      className={`bg-[#E9E9F0] flex items-center justify-center 
      rounded-lg w-8 h-8 text-[#737380] border-[1px] border-[#e9e9f0] 
      ${isActive && 'font-semibold text-[#FFA585] border-[#FFA585]'}`}
      href={query}
    >
      {page}
    </Link>
  )
}
