import {get} from "../services/api";
import ProductCard from '../components/product-card';
import Banner from "../components/Banner";

export default function Home({products} : any) {  
  return (
    <main>
      <Banner></Banner> 
      <h1 className='text-xl font-bold max-w-screen-xl m-auto'>Nieuwste Producten</h1>
      <div className='text-center'>
        {products.map((product: any) => (
          <ProductCard product={product} key={product.id}></ProductCard>
        ))}
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const res = await get(8083, "productApi/getLastEightProducts");
  const products = await res.json();
  return {
      props: {
          products,
      },
  };
}