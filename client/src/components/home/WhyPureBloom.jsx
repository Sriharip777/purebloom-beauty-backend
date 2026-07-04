import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineTruck, HiOutlineHeart } from 'react-icons/hi2';
import HolographicCard from '../common/HolographicCard';
import InteractiveCard from '../common/InteractiveCard';
import coverImg from '../../assets/images/cover.png';

const reasons = [
  { icon: HiOutlineSparkles, title: 'Curated Selection', description: 'Every product is handpicked by beauty experts for quality and effectiveness.' },
  { icon: HiOutlineShieldCheck, title: 'Trusted Brands', description: 'We feature only reputable beauty brands with proven results and clean ingredients.' },
  { icon: HiOutlineTruck, title: 'Easy Amazon Access', description: 'Seamless redirect to Amazon for secure purchasing and fast delivery.' },
  { icon: HiOutlineHeart, title: 'Beauty Community', description: 'Join a community of beauty enthusiasts sharing tips, reviews, and recommendations.' },
];

export default function WhyPureBloom() {
  return (
    <section className="py-24 lg:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="section-label">Why PureBloom</p>
            <h2 className="section-title-lg leading-[1.15] tracking-tight">
              Curated Beauty,<br />
              <span className="italic">Thoughtfully</span> Chosen
            </h2>
            <div className="mt-6 space-y-4">
              <p className="text-navy-600 dark:text-navy-300 font-sans leading-relaxed text-sm">
                At PureBloom Beauty, we believe that finding the right beauty products should be a joy, not a chore. 
                Our team carefully curates every product in our collection, ensuring that each item meets our standards 
                for quality, ingredients, and performance.
              </p>
              <p className="text-navy-500 dark:text-navy-400 font-sans text-sm">
                As an Amazon affiliate partner, every purchase you make supports our mission to bring you the best 
                in beauty — at no extra cost to you.
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 h-px bg-gradient-to-r from-bloom-300 via-bloom-400 to-transparent"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <HolographicCard>
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={coverImg}
                  alt="PureBloom Beauty curation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white/90 backdrop-blur-sm p-5 max-w-[200px] shadow-lg">
                <p className="font-serif text-lg text-navy">50+</p>
                <p className="text-[10px] text-navy-400 uppercase tracking-widest font-sans">Premium Brands</p>
              </div>
            </HolographicCard>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
            >
              <InteractiveCard
                glowColor="#F4C6CE"
                borderRadius="1rem"
                rotationFactor={0.35}
              >
                <div className="p-6 bg-white dark:bg-navy-800">
                  <reason.icon className="text-bloom-400 mb-4" size="24" />
                  <h3 className="font-serif text-base text-navy dark:text-cream-100 mb-2">{reason.title}</h3>
                  <p className="text-sm text-navy-500 dark:text-navy-300 font-sans leading-relaxed">{reason.description}</p>
                </div>
              </InteractiveCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
