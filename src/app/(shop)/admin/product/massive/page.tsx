import { Title } from "@/components/ui/title/Title";
import { AdminMassiveChargeCard } from "./ui/AdminMassiveChargeCard";
import { getMassiveProduct } from "@/actions/product/get-massive-products";

interface Props {
  searchParams: Promise<{ code?: string }>
}

export default async function MassiveChargePage({ searchParams }: Props) {

  const code = (await searchParams).code ?? "TG-68a770d65877cc0001a3fd43-362171082";
  const { products } = await getMassiveProduct(code);

  return (
    <>
      <Title title="Carga Masiva" className="ml-5 sm:ml-0" />
      <AdminMassiveChargeCard products={products} />
    </>
  );
}