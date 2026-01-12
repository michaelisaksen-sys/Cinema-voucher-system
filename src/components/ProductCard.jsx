export default function ProductCard({ product, selected, onClick }) {
  return (
    <button
      className={`product-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="product-emoji">{product.emoji}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-price">{product.price} kr</div>
    </button>
  );
}
