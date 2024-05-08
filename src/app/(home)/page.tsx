import Container from "@/components/Container";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";

import { gql } from "graphql-request";

const query = gql`
query {
  allProducts {
    id
    name
    description
    image_url
    price_in_cents
    sales
    created_at
    category
  }
}
`

export type Product = {
  id: string,
  name: string,
  price_in_cents: number,
  image_url: string,
  sales: number,
  created_at: string,
  description: string,
  category: string,
}

export type SearchParams = {
  searchParams: {
    tab: string,
    page: string,
    sortBy: string,
    search: string
  }
}

export async function fetchProducts() {
  const response = await fetch(process.env.API_BASE_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
    })
  })
  const json = await response.json()

  const allProducts: Product[] = await json.data.allProducts

  return allProducts;

}

export default async function Home({ searchParams }: SearchParams) {
  const tab = searchParams['tab'] ?? 'all'
  const page = searchParams['page'] ?? '1'
  const sortBy = searchParams['sortBy']
  const search = searchParams['search']
  let error;

  const allProducts = await fetchProducts();
  let filteredProducts = allProducts.filter(product => product.name.toLowerCase())

  if (tab !== 'all') {
    filteredProducts = allProducts.filter(product => product.name.toLowerCase().includes(tab))
  }

  let filteredAndSortedProducts

  switch (sortBy) {
    case 'price-low':
      filteredAndSortedProducts =
        filteredProducts.sort((a, b) => a.price_in_cents - b.price_in_cents)
      break;

    case 'price-high':
      filteredAndSortedProducts =
        filteredProducts.sort((a, b) => b.price_in_cents - a.price_in_cents)
      break;

    case 'news':
      filteredAndSortedProducts =
        filteredProducts.sort(function (a, b) {
          var c = Date.parse(a.created_at);
          var d = Date.parse(b.created_at);
          return d - c;
        });
      break

    case 'best-seller':
      filteredAndSortedProducts =
        filteredProducts.sort((a, b) => b.sales - a.sales)

    default: filteredAndSortedProducts = filteredProducts
      break;
  }

  if (search) {
    filteredAndSortedProducts = filteredAndSortedProducts.filter(product => product.name.toLocaleLowerCase().includes(search))

    if (filteredAndSortedProducts.length === 0) {
      error = 'Não encontramos nada relacionado à sua pesquisa'

    }
  }

  const pageSize = 12;
  const pagesCount = Math.ceil(filteredAndSortedProducts.length / pageSize);

  const start = (Number(page) - 1) * pageSize
  const end = start + pageSize

  const paginatedProducts = filteredAndSortedProducts.slice(start, end)

  return (
    <Container className="pt-9 md:pb-14 pb-8" >

      <Navbar />

      {error ?
        <div className="min-h-[500px] flex justify-center items-center">
          <p>{error}</p>
        </div>
        :
        <>
          <div className="-mt-8 md:mt-0">
            <Pagination pagesCount={pagesCount} />
          </div>

          <div className="py-8 grid lg:grid-cols-4 grid-cols-2  md:gap-x-8 gap-x-4 md:gap-y-6 gap-y-4 ">
            {filteredAndSortedProducts && paginatedProducts.map((product: any) =>
              <Card
                key={product.id}
                id={product.id}
                title={product.name}
                price={product.price_in_cents}
                image={product.image_url}
              />
            )}
          </div>

          <Pagination pagesCount={pagesCount} />
        </>
      }


    </Container >
  );
}
