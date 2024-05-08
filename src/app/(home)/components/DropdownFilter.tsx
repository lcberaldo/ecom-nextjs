'use client'

import Image from 'next/image';
import arrow from '../../../assets/arrow.svg'
import { EventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DropdownFilter() {
  const [filter, setFilter] = useState('Organizar por');
  const [isListOpen, setListOpen] = useState(false)

  const router = useRouter()
  const pathname = usePathname();
  const urlParams = useSearchParams();
  const params = Object.fromEntries(urlParams.entries());
  const newParams = new URLSearchParams(urlParams.toString());

  useEffect(() => {
    if (params.sortBy === undefined) {
      setFilter('Organizar por')
    }
  }, [params.sortBy])

  const dropdown = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isListOpen) return;

    function handleClick({ target }: Event) {
      if (dropdown.current && !dropdown.current.contains(target as Node)) {
        setListOpen(false);
      }
    }

    function escFunction(event: KeyboardEvent) {
      if (event.key === "Escape") {
        console.log('chegou');
        setListOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", escFunction);

    return () => {
      window.removeEventListener("click", handleClick)
      window.removeEventListener("keydown", escFunction)
    };
  }, [isListOpen]);

  function toggleList() {
    setListOpen(isListOpen => !isListOpen)
  }

  const handleChangeFilter = (event: React.MouseEvent) => {
    const target = event.target as HTMLButtonElement
    setFilter(target.textContent as string);
    setListOpen(false)

    newParams.set('sortBy', `${target.value}`)

    if (params.page) {
      newParams.delete('page')
      router.push(`?${newParams.toString()}`)
    }

    router.push(`${pathname}?${newParams.toString()}`);
  }

  return (
    <div className='w-fit relative' ref={dropdown}>
      <button
        type="button"
        className="flex justify-between w-full gap-1 text-sm text-[#737380] outline-none items-center"
        onClick={toggleList}

      >
        {filter}
        {isListOpen
          ? <Image src={arrow} alt='arrow-up' className='transition ease-in-out delay-100 -rotate-180' />
          : <Image src={arrow} alt='arrow-down' className='transition ease-in-out delay-100' />}
      </button>




      <div
        role="list"
        className={`flex bg-white transition-all  
            ease-in-out delay-100 top-8 md:right-0 
            -right-[60px] rounded flex-col items-start 
            h-0 px-4 overflow-hidden absolute 
            w-44 text-sm text-[#737380] 
            ${isListOpen && 'h-28 py-3 transition-all  ease-in-out delay-100'}`}
      >

        <button
          onClick={handleChangeFilter}
          className=""
          value='news'
        >
          Novidades
        </button>

        <button
          onClick={handleChangeFilter}
          className=""
          value='price-high'
        >
          Preço: Maior - menor
        </button>

        <button
          onClick={handleChangeFilter}
          className=""
          value='price-low'
        >
          Preço: Menor - maior
        </button>

        <button
          onClick={handleChangeFilter}
          className=""
          value='best-seller'
        >
          Mais vendidos
        </button>

      </div>
    </div>
  )

};

