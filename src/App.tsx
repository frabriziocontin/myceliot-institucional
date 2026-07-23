import Header from './components/Header';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Solutions from './components/Solutions';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import GlobalMyceliumBackground from './components/GlobalMyceliumBackground';

function App() {
  return (
    <div className="relative min-h-screen text-textMain font-sans selection:bg-primary/30 selection:text-white">
      <GlobalMyceliumBackground />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Hero />
          <Vision />
          <Solutions />
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
