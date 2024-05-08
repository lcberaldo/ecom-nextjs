import logo from '../../assets/logo.svg'
import Image from "next/image";
import Container from '../Container';
import SearchBar from './components/SearchBar';
import CartButton from './components/CartButton';
import Link from 'next/link';

export default function Header() {
  return (
    <section className='bg-white'>
      <Container className='md:flex  justify-between items-center py-4'>

        <Link href='/'>
          <Image src={logo} priority alt='capputeeno' className='mb-3 md:mb-0 mx-auto md:mx-0' />
        </Link>

        <div className='flex justify-between items-center md:gap-6 gap-3'>
          <SearchBar />
          <CartButton />
        </div>
      </Container>
    </section>
  )
}
