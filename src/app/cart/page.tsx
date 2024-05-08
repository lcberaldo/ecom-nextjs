import Backbutton from "@/components/Backbutton";
import Container from "@/components/Container";
import CartResume from "./component/CartResume";
import CartContent from "./component/CartContent";

export default function Cart() {


  return (
    <Container className="pt-6 md:grid grid-cols-9 gap-8 md:h-[90vh] ">
      <main className="md:max-h-[90vh] pb-6 text-[#41414D] col-span-6 md:overflow-y-scroll">
        <Backbutton />

        <h1 className="font-medium text-2xl uppercase  mb-2">Seu carrinho</h1>

        <CartContent />

      </main>

      <CartResume />
    </Container>
  )
}
