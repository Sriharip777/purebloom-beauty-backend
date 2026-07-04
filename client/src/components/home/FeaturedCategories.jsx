import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../services/api';
import ImageSlider3D from '../common/ImageSlider3D';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryAPI.getAll()
      .then((res) => setCategories(res.data.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const cats = categories.map((cat) => ({
    src: cat.image || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400',
    name: cat.name,
    slug: cat.slug,
  }));

  return (
    <section className="py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="section-title">Shop by Category</h2>
          <p className="section-subtitle mx-auto">
            Explore our curated beauty categories, handpicked for your everyday glow
          </p>
        </motion.div>

        {loading ? (
          <div className="max-w-md mx-auto aspect-[3/4] shimmer-bg rounded-2xl" />
        ) : (
          <ImageSlider3D
            images={cats}
            duration={30}
            cardWidth="22em"
            cardAspectRatio="2/3"
            perspective="56em"
            rotationDirection="left"
            linkTo={(img) => `/categories/${img.slug}`}
          />
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/categories" className="btn-outline text-[10px]">
            View All Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
