'use client'

import Link from 'next/link'
import cartIcon from '../../../assets/cart.svg'
import Image from 'next/image'
import { useAtomValue, useSetAtom } from 'jotai'
import { cartAtom, lenghtAtom } from '@/atoms/cartAtom'
import { useEffect, useState } from 'react'

export default function CartButton() {
  const cart = useAtomValue(cartAtom)
  const setCart = useSetAtom(cartAtom)
  const setLenght = useSetAtom(lenghtAtom)
  const length = useAtomValue(lenghtAtom)
  const [missedCart, setMissedCart] = useState(() => {
    const storage = localStorage.getItem('capputeeno_v1_cart')
    if (storage !== '[]') {
      return true
    }
    return false
  })

  useEffect(() => {
    let cartLenght = cart.length

    cart.map((item) => {
      if (item.quantity >= 2) cartLenght = item.quantity + cartLenght - 1
    })

    setLenght(cartLenght)

  })


  function handleDiscartCart() {
    setMissedCart(false)
    setCart([])
  }

  function handleAcceptCart() {
    setMissedCart(false)
  }

  return (
    <div className='relative'>
      <Link href={'/cart'} className='border-none bg-transparent relative cursor-pointer'>

        <Image src={cartIcon} alt='cart icon with x items' />

        {cart.length !== 0 &&

          <span className='
          rounded-full w-4 
          h-4 bg-[#DE3838] 
          flex items-center 
          justify-center text-white 
          text-[10px] absolute 
          bottom-[-6px] 
          right-[-6px]'
          >
            {length}
          </span>}

      </Link>

      {missedCart && (
        <div className='absolute w-56 right-0 bg-white p-2 z-50 shadow-md top-7 animate-fade'>
          <span className='block text-xs' >Você tem um carrinho abandonado, gostaria de restaurá-lo?</span>

          <div className='flex gap-2 mt-3'>
            <button className='text-xs px-3 py-1 bg-red-400 rounded-md' onClick={handleDiscartCart}>Não</button>
            <button className='text-xs px-3 py-1 bg-green-400 rounded-md' onClick={handleAcceptCart}>Sim</button>
          </div>
        </div>)
      }
    </div>
  )
}
