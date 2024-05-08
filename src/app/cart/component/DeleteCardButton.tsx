import Image from 'next/image'
import trashIcon from '../../../assets/trash.svg'
import { useAtomValue, useSetAtom } from 'jotai';
import { cartAtom } from '@/atoms/cartAtom';

type DeleteCardButtonProps = {
  index: number
}

export default function DeleteCardButton({ index }: DeleteCardButtonProps) {
  const cart = useAtomValue(cartAtom);
  const setCart = useSetAtom(cartAtom);

  function handleDeleteProduct() {
    const newCart = cart.filter((product, i) => i !== index)
    setCart(cart => newCart)
  }


  return (
    <button onClick={handleDeleteProduct} className='outline-none'>
      <Image src={trashIcon} alt='trash icon' />
    </button>
  )
}
