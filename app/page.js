import UrlForm from '../app/components/UrlForm';
import Hero from '../app/components/Hero';
import Statistics from '../app/components/Statistics';  
import Advert from '../app/components/Advert';
import Footer from '../app/components/Footer';
import MobileHeader from '../app/components/MobileHeader';
import DesktopHeader from '../app/components/DesktopHeader';

export default function Home() {
    return (
        <div>
        <MobileHeader />
        <DesktopHeader />
        <Hero />
        <UrlForm />
        <Statistics />
        <Advert />
        <Footer />
      </div>
    );
}
