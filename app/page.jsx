import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServiceShowcase from "@/components/ServiceShowcase";
import HowToOrder from "@/components/HowToOrder";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ServiceShowcase />
        <HowToOrder />
        <OrderForm />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
