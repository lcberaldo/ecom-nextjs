import Image from "next/image"
import Link from "next/link"

type CardProps = {
  title: string,
  price: number,
  id: string,
  image: {
    src: string,
    height: number,
    width: number
  }
}

export function convertToSlug(title: string) {
  return title.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export default function Card({ title, price, image, id }: CardProps) {


  const slug = convertToSlug(title)


  const priceInBRL = (price / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <Link href={`/${slug}/${id}`} className="lg:block flex flex-col ">
      <Image alt={title} src={image} width={256} height={300} className="rounded-t-lg	w-full" />

      <div className="bg-white py-2 px-3 rounded-b-md flex flex-col flex-1 gap-y-2 justify-between">
        <h2
          className='
          font-light text-base 
          text-[#41414D]'
        >
          {title}
        </h2>

        <h3 className="text-sm font-semibold before:block before:w-full 
          before:h-[1px] before:bg-[#DCE2E5] 
          before:mb-2">{priceInBRL}</h3>
      </div>
    </Link>
  )
}
