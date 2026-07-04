import { motion } from 'framer-motion';

export default function AffiliateDisclosurePage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Affiliate Disclosure</h1>
          <p className="text-sm text-navy/40 font-sans">Transparency is important to us</p>
        </motion.div>
        <div className="prose prose-sm max-w-none font-sans text-navy/60 space-y-6">
          <p>PureBloom Beauty is committed to full transparency about our affiliate relationships.</p>
          <h2 className="font-serif text-xl text-navy">Amazon Associates Program</h2>
          <p>PureBloom Beauty is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and affiliated sites.</p>
          <h2 className="font-serif text-xl text-navy">How It Works</h2>
          <p>When you click on an affiliate link on our website and make a purchase on Amazon, we may earn a small commission at no additional cost to you. This commission helps us maintain and improve PureBloom Beauty.</p>
          <h2 className="font-serif text-xl text-navy">Our Commitment</h2>
          <p>We only recommend products we genuinely believe in and have thoroughly researched. Our recommendations are based on quality, ingredients, and effectiveness — not on commission rates.</p>
          <h2 className="font-serif text-xl text-navy">Questions?</h2>
          <p>If you have any questions about our affiliate relationships, please reach out to us at <a href="mailto:srihariharipechettis@gmail.com" className="text-navy underline underline-offset-2">srihariharipechettis@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
