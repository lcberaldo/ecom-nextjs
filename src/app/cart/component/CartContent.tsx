'use client'

import { useAtomValue } from "jotai";
import CardItem from "./CardItem";
import { cartAtom, lenghtAtom } from "@/atoms/cartAtom";


export default function CartContent() {

  const cart = useAtomValue(cartAtom);
  const lenght = useAtomValue(lenghtAtom);

  let total = 0

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price_in_cents * cart[i].quantity
  }

  const totalBRL = (total / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });


  return (
    <>
      {lenght === 0 ?
        <h2>Seu carrinho está vazio</h2> :
        <h2>Total ({lenght} produto{lenght === 1 ? '' : 's'}) <strong>{totalBRL}</strong></h2>
      }

      <div className="flex flex-col gap-y-4 pt-6 ">
        {cart.map((card, index) => <CardItem key={card.id} card={card} index={index} />)}
      </div>
    </>
  )
}
