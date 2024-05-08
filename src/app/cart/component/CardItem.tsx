import Image from 'next/image'
import { ChangeEvent } from 'react'
import DeleteCardButton from './DeleteCardButton'
import { CartItemProps, cartAtom } from '@/atoms/cartAtom'
import { useAtomValue, useSetAtom } from 'jotai'


type CardProps = {
  card: CartItemProps,
  index: number
}

export default function CardItem({ card, index }: CardProps) {
  const priceInBRL = (card.price_in_cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  const setCart = useSetAtom(cartAtom)
  const cart = useAtomValue(cartAtom)

  const quantity = card.quantity


  const options = [];
  for (let i = quantity - 2; i <= quantity + 2; i++) {
    if (i > 0) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
  }

  function handleUpdateQuantity(e: ChangeEvent<HTMLSelectElement>) {

    setCart(cart.map(item => item.id === card.id
      ? { ...item, quantity: Number(e.target.value) }
      : item
    ))
  }


  return (
    <div className='md:flex block  rounded-lg overflow-hidden'>
      <Image src={card.image_url} className=' w-full md:max-w-[256px]' width={256} height={211} alt='' />

      <div className='bg-white px-8 pt-4 pb-8  '>

        <div className='flex justify-between items-center mb-6'>

          <h3 className='font-light text-xl '>{card.name}</h3>

          <DeleteCardButton index={index} />

        </div>

        <div className='flex flex-col justify-between h-[75%]'>

          <p className='text-xs'>{card.description}</p>

          <div className='flex justify-between items-center  mt-4 md:mt-0'>

            <select
              name="quantity"
              id="quant"
              onChange={handleUpdateQuantity}
              value={quantity}
              className='bg-[#F3F5F6] py-1 px-3 border-2 border-[#A8A8B3] rounded-lg outline-none '
            >

              {options}

            </select>

            <h3 className='font-semibold text-[#09090A]'>{priceInBRL}</h3>
          </div>
        </div>
      </div>
    </div>
  )
}
