import Container from "@/components/Container"
import { fetchProducts } from "../../(home)/page"
import Image from "next/image"
import Backbutton from '../../../components/Backbutton'
import AddToCartButton from "./components/AddToCartButton"
import AsyncImage from "./components/AsyncImage"

type ParamsProps = {
  params: {
    productId: string,
  }
}

export default async function Product({ params }: ParamsProps) {


  const id = params['productId']
  const allProducts = fetchProducts()


  const product = (await allProducts).filter((product) => product.id === id)

  if (product.length === 0) return

  const { image_url, name, price_in_cents, description, category, } = product[0]

  const priceInBRL = (price_in_cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const categoryText = category === 'mugs' ? 'Caneca' : 'Camiseta'



  return (

    <Container className='pt-6 md:pb-16 pb-6'>

      <Backbutton />

      <main className='md:flex gap-8 items-stretch '>

        <AsyncImage image_url={image_url} name={name} />

        <div className='text-[#41414D] flex-col flex  max-w-md md:mt-0 mt-3'>
          <span className='block mb-3 '>{categoryText}</span>

          <h1 className='text-3xl font-light mb-3'>{name}</h1>
          <h2 className='text-[#09090A] font-semibold mb-6'>{priceInBRL}</h2>

          <span className='block text-[12px] md:mb-14 mb-6'>*Frete de R$40,00 para todo o Brasil. Grátis para compras acima de R$90,00.</span>

          <span className='block uppercase font-medium text-[#737380] mb-2'>descrição</span>
          <h3 className='text-[14px] mb-4 md:mb-0'>{description}</h3>


          <AddToCartButton product={product[0]} />


        </div>
      </main>
    </Container>
  )
}
