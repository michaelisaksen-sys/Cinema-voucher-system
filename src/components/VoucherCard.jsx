import { products } from '../data/products';
import { rebates } from '../data/rebates';

export default function VoucherCard({ voucher, onPrint, onCopy, copied }) {
  const product = products.find(p => p.id === voucher.productId);
  const rebate = rebates.find(r => r.id === voucher.rebateId);

  if (!product || !rebate) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="voucher-card" id="voucher-to-print">
      <div className="voucher-header">
        <span className="cinema-icon">🎬</span>
        <h2>Biograf Voucher</h2>
      </div>

      <div className="voucher-code-display">
        <div className="voucher-code-label">Voucher kode</div>
        <div className="voucher-code">{voucher.id}</div>
      </div>

      <div className="voucher-details">
        <div className="voucher-detail">
          <span className="detail-label">Produkt:</span>
          <span className="detail-value">
            {product.emoji} {product.name}
          </span>
        </div>

        <div className="voucher-detail">
          <span className="detail-label">Rabat:</span>
          <span className="detail-value">{rebate.description}</span>
        </div>

        <div className="voucher-detail">
          <span className="detail-label">Gyldighedsperiode:</span>
          <span className="detail-value">
            {formatDate(voucher.validFrom)} - {formatDate(voucher.validTo)}
          </span>
        </div>
      </div>

      <div className="voucher-actions no-print">
        <button onClick={onPrint} className="btn btn-secondary">
          🖨️ Print
        </button>
        <button onClick={onCopy} className="btn btn-secondary">
          {copied ? '✓ Kopieret!' : '📋 Kopier kode'}
        </button>
      </div>
    </div>
  );
}
