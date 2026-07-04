import HeroSection from '../../components/home/HeroSection';
import FeaturedCategories from '../../components/home/FeaturedCategories';
import TrendingProducts from '../../components/home/TrendingProducts';
import WhyPureBloom from '../../components/home/WhyPureBloom';
import BestSellersSection from '../../components/home/BestSellersSection';
import NewsletterSection from '../../components/home/NewsletterSection';
import HomeContactSection from '../../components/home/HomeContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCategories />
      <TrendingProducts />
      <WhyPureBloom />
      <BestSellersSection />
      <NewsletterSection />
      <HomeContactSection />
    </>
  );
}
