import { Outlet } from 'react-router-dom';
import TopStrip from '../components/layout/TopStrip';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import ParticleOrbitEffect from '../components/ui/ParticleOrbitEffect';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-navy transition-colors duration-300">
      <TopStrip />
      <Header />
      <main className="overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <ParticleOrbitEffect
        particleCount={5}
        radius={20}
        particleSpeed={0.02}
        particleSize={1}
        colorRange={[340, 10]}
        fadeOpacity={0.03}
        intensity={0.8}
      />
    </div>
  );
}
