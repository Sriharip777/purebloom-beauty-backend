import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SparklesCore from '../../components/ui/SparklesCore';
import herosBg from '../../assets/images/heros.png';

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
  };

  return (
    <section className="relative w-full overflow-hidden bg-bloom-50">
      <div className="relative w-full">
        <motion.img
          style={{ y }}
          src={herosBg}
          alt=""
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <SparklesCore
          particleColor="#f9d0d9"
          particleDensity={40}
          speed={1}
          minSize={0.3}
          maxSize={1.2}
          className="absolute left-0 top-0 w-1/2 h-full"
        />
        <div className="max-w-[1430px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-[726px] lg:pl-[100px]"
          >
            <motion.p variants={itemVariants} className="text-xs text-white/60 uppercase tracking-[0.2em] font-sans font-medium mb-4">
              New Season 2026
            </motion.p>
            <motion.div variants={itemVariants}>
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] tracking-tight">
                Discover Your
                <br />
                <span className="italic text-bloom-200">Radiant</span> Side
              </h1>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-start gap-6">
              <Link to="/categories" className="uiverse-btn">
                <div className="wrapper">
                  <span>Shop the Collection</span>
                  <div className="circle circle-12"></div>
                  <div className="circle circle-11"></div>
                  <div className="circle circle-10"></div>
                  <div className="circle circle-9"></div>
                  <div className="circle circle-8"></div>
                  <div className="circle circle-7"></div>
                  <div className="circle circle-6"></div>
                  <div className="circle circle-5"></div>
                  <div className="circle circle-4"></div>
                  <div className="circle circle-3"></div>
                  <div className="circle circle-2"></div>
                  <div className="circle circle-1"></div>
                </div>
              </Link>
              <Link to="/about" className="text-xs text-white/50 hover:text-white font-sans transition-colors self-center">
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}