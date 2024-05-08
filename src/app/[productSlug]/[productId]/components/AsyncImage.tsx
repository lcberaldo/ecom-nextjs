'use client'

import Spinner from "@/components/Spinner"
import Image from "next/image"
import { useEffect, useState } from "react"

type AsyncImageProps = {
  image_url: string
  name: string
}

export default function AsyncImage({ image_url, name }: AsyncImageProps) {
  const [reveal, setReveal] = useState(false);
  const visibility = reveal ? "visible" : "hidden";
  const loader = reveal ? "none" : "flex";

  return (
    <div>
      <span
        style={{
          display: loader,
        }}
        className="md:w-[540px] md:h-[460px] justify-center items-center w-full h-[346px]"
      >
        <Spinner />
      </span>

      <Image
        width={540} height={460}
        src={image_url} alt={name}
        onError={() => setReveal(true)}
        onLoadingComplete={() => setReveal(true)}
        style={{ visibility }}
      />
    </div>
  )
}
