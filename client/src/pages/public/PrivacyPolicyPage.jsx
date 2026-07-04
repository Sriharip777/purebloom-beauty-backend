import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Privacy Policy</h1>
          <p className="text-sm text-navy/40 font-sans">Last updated: {new Date().toLocaleDateString()}</p>
        </motion.div>
        <div className="prose prose-sm max-w-none font-sans text-navy/60 space-y-6">
          <p>At PureBloom Beauty, we take your privacy seriously. This policy describes how we collect, use, and protect your personal information.</p>
          <h2 className="font-serif text-xl text-navy">Information We Collect</h2>
          <p>We collect information you provide when you contact us, subscribe to our newsletter, or browse our website. This may include your name, email address, phone number, and browsing behavior.</p>
          <h2 className="font-serif text-xl text-navy">How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, send newsletters (with consent), improve our services, and analyze website traffic. We never sell your personal data to third parties.</p>
          <h2 className="font-serif text-xl text-navy">Affiliate Disclosure</h2>
          <p>PureBloom Beauty participates in the Amazon Services LLC Associates Program. When you click on affiliate links and make a purchase, we may earn a commission at no extra cost to you.</p>
          <h2 className="font-serif text-xl text-navy">Cookies</h2>
          <p>We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie settings through your browser preferences.</p>
          <h2 className="font-serif text-xl text-navy">Contact</h2>
          <p>For privacy-related inquiries, contact us at <a href="mailto:srihariharipechettis@gmail.com" className="text-navy underline underline-offset-2">srihariharipechettis@gmail.com</a>.</p>
        </div>
      </div>
    </div>
  );
}
