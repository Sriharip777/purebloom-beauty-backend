import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductGrid({ products, loading, columns = 4 }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-xl text-navy-400">No products found</p>
        <p className="text-sm text-navy-400 font-sans mt-2">Try adjusting your filters or browse our categories.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {products.map((product, i) => (
        <ProductCard key={product._id} product={product} index={i} />
      ))}
    </div>
  );
}
