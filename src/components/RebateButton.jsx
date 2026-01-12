export default function RebateButton({ rebate, selected, onClick, product }) {
  const getCalculatedPrice = () => {
    if (!product) return null;
    const newPrice = rebate.calculate(product.price);
    return (
      <div className="rebate-calculation">
        {product.name}: {product.price} kr → {newPrice.toFixed(2)} kr
      </div>
    );
  };

  return (
    <button
      className={`rebate-button ${selected ? 'selected' : ''}`}
      onClick={onClick}
      type="button"
    >
      <div className="rebate-label">{rebate.label}</div>
      <div className="rebate-description">{rebate.description}</div>
      {product && getCalculatedPrice()}
    </button>
  );
}
