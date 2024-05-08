'use client'

import Image from 'next/image'
import searchIcon from '../../../assets/search.svg'
import { useRouter, useSearchParams } from 'next/navigation'


interface FormElements extends HTMLFormControlsCollection {
  searchInput: HTMLInputElement
}

interface SearchInputEvent extends HTMLFormElement {
  readonly elements: FormElements
}

export default function SearchBar() {
  const urlParams = useSearchParams();
  const newParams = new URLSearchParams(urlParams.toString());

  const router = useRouter()


  function handleSearch(e: React.FormEvent<SearchInputEvent>) {
    e.preventDefault()

    const search = e.currentTarget.searchInput.value

    e.currentTarget.searchInput.value = ''

    if (search) {
      newParams.forEach((value, name, searchParams) => {
        newParams.delete(name)
      });

      newParams.set('search', `${search}`)
      router.push(`/?${newParams.toString()}`);
    }
  }

  return (
    <label htmlFor="searchInput"
      className='
      bg-[#F3F5F6] 
      px-4 py-[10px] 
      rounded-lg shadow-md 
      shadow-gray-400
      w-full  '
    >

      <form onSubmit={handleSearch} className=' flex items-center   justify-between md:w-[352px] '>
        <input
          className='w-full bg-transparent text-sm outline-none text-[#737380]'
          type="text" name="searchInput"
          id=""
          placeholder='Procurando por algo específico?'
        />

        <button type='submit'>
          <Image src={searchIcon} alt='search icon' />
        </button>
      </form>
    </label>
  )
}
