'use client'

import Link from 'next/link'
import DropdownFilter from './DropdownFilter'
import { useState } from 'react'
import { motion } from 'framer-motion'


export default function Navbar() {
  const [selected, setSelected] = useState(0)


  return (
    <div className='flex justify-between items-start flex-wrap'>
      <nav className='flex  items-center mb-6 relative'>

        <Link legacyBehavior href={{ pathname: '', query: { tab: 'all' } }} >
          <motion.a
            onClick={() => setSelected(0)}
            animate
            className={`text-xs md:text-base uppercase text-[#41414D] mx-4 relative cursor-pointer ${selected === 0 && "font-semibold "}`}
          >
            {selected === 0 && (
              <motion.div
                layoutId="underline"
                className="h-1 w-full absolute -bottom-1 left-0 bg-[#FFA585]"
              />
            )}
            todos os produtos
          </motion.a>
        </Link>

        <Link legacyBehavior href={{ pathname: '', query: { tab: 'camiseta' } }} >
          <motion.a
            onClick={() => setSelected(1)}
            animate
            className={`text-xs md:text-base uppercase text-[#41414D] mx-4 relative cursor-pointer ${selected === 1 && "font-semibold "}`}
          >
            {selected === 1 && (
              <motion.div
                layoutId="underline"
                className="h-1 w-full absolute -bottom-1 left-0 bg-[#FFA585]"
              />
            )}
            camisetas
          </motion.a>
        </Link>

        <Link legacyBehavior href={{ pathname: '', query: { tab: 'caneca' } }} >
          <motion.a
            onClick={() => setSelected(2)}
            animate
            className={`text-xs md:text-base uppercase text-[#41414D] mx-4 relative cursor-pointer ${selected === 2 && "font-semibold "}`}
          >
            {selected === 2 && (
              <motion.div
                layoutId="underline"
                className="h-1 w-full absolute -bottom-1 left-0 bg-[#FFA585]"
              />
            )}
            canecas
          </motion.a>
        </Link>

      </nav>

      <DropdownFilter />
    </div>
  )
}


