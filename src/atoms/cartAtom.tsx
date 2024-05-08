import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


export type CartItemProps = {
  id: string,
  image_url: string,
  name: string,
  description: string,
  price_in_cents: number,
  quantity: number | 0
}


export const cartAtom = atomWithStorage<CartItemProps[]>('capputeeno_v1_cart', []);

export const lenghtAtom = atom(0)





