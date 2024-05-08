'use client'

import { cartAtom, lenghtAtom } from '@/atoms/cartAtom';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import React from 'react'

export default function CartResume() {
  const cart = useAtomValue(cartAtom);
  const lenght = useAtomValue(lenghtAtom);


  if (lenght === 0) return null

  let totalProducts = 0

  for (let i = 0; i < cart.length; i++) {
    totalProducts += cart[i].price_in_cents * cart[i].quantity
  }

  const hasDelivery = totalProducts < 9000
  const totalDelivery = hasDelivery ? totalProducts + 4000 : totalProducts

  const totalDeliveryBRL = (totalDelivery / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  const totalProductsBRL = (totalProducts / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (

    <aside className="col-span-3 py-4 px-6 bg-white  h-full md:h-[96%] md:mt-0 mt-6 flex flex-col justify-between min-h-[70vh] md:min-h-[unset] ">
      <div className="text-[#41414D]">
        <h2 className="font-semibold text-xl uppercase">resumo do pedido</h2>

        <div className="mt-7 mb-3 flex justify-between items-center">
          <h3>Subtotal de produtos </h3>
          <h3>{totalProductsBRL}</h3>
        </div>


        <div className=" mb-6 flex justify-between items-center">
          <h3>Entrega </h3>
          <h3>{hasDelivery ? 'R$ 40,00' : 'Grátis'}</h3>
        </div>


        <span className="block h-[1px] w-full bg-[#DCE2E5] mb-3"></span>

        <div className="  flex justify-between items-center font-semibold">
          <h3>Total </h3>
          <h3>{totalDeliveryBRL}</h3>
        </div>

        <Link
          className="
          rounded bg-[#51B853] block w-full 
          py-2 outline-none text-center uppercase 
          text-[#F5F5FA] font-medium mt-10"
          href={'#'}
        >
          finalizar a compra
        </Link>
      </div>

      <div className="flex flex-col text-[#737380]">
        <Link className="uppercase text-sm font-medium underline py-[2px]" href='#'>ajuda</Link>
        <Link className="uppercase text-sm font-medium underline py-[2px]" href='#'>reembolsos</Link>
        <Link className="uppercase text-sm font-medium underline py-[2px]" href='#'>entregas e frete</Link>
        <Link className="uppercase text-sm font-medium underline py-[2px]" href='#'>trocas e devoluções</Link>
      </div>

    </aside>

  )
}

