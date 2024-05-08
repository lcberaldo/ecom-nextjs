'use client'

import Image from 'next/image'
import cartIcon from '../../../../assets/cart.svg'
import { Product } from '@/app/(home)/page'
import { cartAtom } from '@/atoms/cartAtom'
import { useAtomValue, useSetAtom } from 'jotai'
import { useEffect } from 'react'


type ButtonProps = {
  product: Product
}

export default function AddToCartButton({ product }: ButtonProps) {
  const setCart = useSetAtom(cartAtom);
  const cart = useAtomValue(cartAtom)


  const { id, image_url, price_in_cents, description, name } = product


  function handleAddToCart() {

    setCart(
      cart => cart.some(item => item.id === id)
        ? cart.map(item => item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
        )
        : [...cart, { id, name, price_in_cents, quantity: 1, image_url, description }]
    )

  }


  return (
    <button onClick={handleAddToCart} className='flex rounded mt-auto  items-center justify-center w-full bg-[#115D8C] text-white gap-3 font-medium py-[10px]'>
      <Image src={cartIcon} alt='cart icon' className='filter brightness-200' />

      <span className='uppercase font-medium'>adicionar ao carrinho</span>
    </button>
  )
}
