import PaginationLink from './PaginationLink'

type PaginationProps = {
  pagesCount: number,
}

export default function Pagination({ pagesCount }: PaginationProps) {
  if (pagesCount === 1) return null;
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <div className='ml-auto w-fit  flex gap-x-1 '>

      {pages.map((page) => <PaginationLink key={page} page={page} />)}

    </div>
  )
}
