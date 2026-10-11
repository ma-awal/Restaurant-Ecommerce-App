import PageHeader from '@/components/ui/PageHeader';
import CheckoutForm from '@/components/checkout/CheckoutForm';

export const metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader title="Checkout" subtitle="Choose pickup or delivery and pay with cash." />
      <CheckoutForm />
    </>
  );
}
