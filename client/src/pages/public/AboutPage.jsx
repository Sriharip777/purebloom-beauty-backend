import { motion } from 'framer-motion';
import ImageSlider3D from '../../components/common/ImageSlider3D';

export default function AboutPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Our Story</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy">About PureBloom Beauty</h1>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800" alt="PureBloom Beauty" className="w-full h-full object-cover" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <h2 className="font-serif text-2xl lg:text-3xl text-navy mb-4">Curated with Love</h2>
            <p className="text-navy/60 font-sans leading-relaxed mb-4">
              PureBloom Beauty was born from a simple belief: finding the right beauty products should feel 
              like a joy, not a chore. We are a team of beauty enthusiasts who spend hours researching, 
              testing, and curating the best products so you do not have to.
            </p>
            <p className="text-navy/50 font-sans text-sm leading-relaxed">
              Every product in our collection meets our standards for quality, ingredients, and performance. 
              We partner with Amazon as an affiliate to bring you trusted products with the convenience 
              and reliability of Amazon's shopping experience.
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-cream-50 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="font-serif text-2xl lg:text-3xl text-navy mb-4">Our Mission</h2>
          <p className="text-navy/60 font-sans leading-relaxed max-w-2xl mx-auto">
            To make beauty discovery effortless, enjoyable, and trustworthy. We believe everyone deserves 
            to find products that make them feel confident and beautiful — and we are here to guide you 
            every step of the way.
          </p>
          <div className="mt-8 text-navy/30 text-xs font-sans">
            <p>Questions? Email us at <a href="mailto:srihariharipechettis@gmail.com" className="text-navy/50 hover:text-navy underline underline-offset-2">srihariharipechettis@gmail.com</a></p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16">
          <div className="text-center mb-8">
            <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Our Team</p>
            <h2 className="font-serif text-2xl lg:text-3xl text-navy">Meet the Team</h2>
          </div>
          <ImageSlider3D />
        </motion.div>
      </div>
    </div>
  );
}
