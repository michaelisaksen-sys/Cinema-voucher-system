import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { rebates } from '../data/rebates';
import { saveVoucher } from '../utils/storage';
import { generateVoucherCode } from '../utils/voucherCode';
import ProductCard from '../components/ProductCard';
import RebateButton from '../components/RebateButton';
import VoucherCard from '../components/VoucherCard';

export default function CreateVoucher() {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedRebateId, setSelectedRebateId] = useState(null);

  // Set default dates
  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0];

  const [validFrom, setValidFrom] = useState(today);
  const [validTo, setValidTo] = useState(thirtyDaysLater);
  const [errors, setErrors] = useState({});
  const [generatedVoucher, setGeneratedVoucher] = useState(null);
  const [copied, setCopied] = useState(false);

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const selectedRebate = rebates.find(r => r.id === selectedRebateId);

  const validate = () => {
    const newErrors = {};

    if (!selectedProductId) {
      newErrors.product = 'Vælg venligst et produkt';
    }

    if (!selectedRebateId) {
      newErrors.rebate = 'Vælg venligst en rabat';
    }

    if (validTo <= validFrom) {
      newErrors.dates = 'Slutdato skal være efter startdato';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const voucher = {
      id: generateVoucherCode(),
      productId: selectedProductId,
      rebateId: selectedRebateId,
      validFrom,
      validTo,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    saveVoucher(voucher);
    setGeneratedVoucher(voucher);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedVoucher.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNewVoucher = () => {
    setGeneratedVoucher(null);
    setSelectedProductId(null);
    setSelectedRebateId(null);
    setValidFrom(today);
    setValidTo(thirtyDaysLater);
    setErrors({});
    setCopied(false);
  };

  const handleViewAll = () => {
    navigate('/vouchers');
  };

  const isFormValid = selectedProductId && selectedRebateId && validFrom && validTo;

  if (generatedVoucher) {
    return (
      <div className="confirmation-view">
        <VoucherCard
          voucher={generatedVoucher}
          onPrint={handlePrint}
          onCopy={handleCopy}
          copied={copied}
        />

        <div className="confirmation-actions no-print">
          <button onClick={handleNewVoucher} className="btn btn-primary">
            ➕ Opret ny voucher
          </button>
          <button onClick={handleViewAll} className="btn btn-secondary">
            📋 Se alle vouchers
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="create-voucher">
      <form onSubmit={handleSubmit}>
        {/* Section 1 - Product Selection */}
        <section className="form-section">
          <h2 className="section-title">Vælg produkt</h2>
          {errors.product && <div className="error-message">{errors.product}</div>}
          <div className="product-grid">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                selected={selectedProductId === product.id}
                onClick={() => setSelectedProductId(product.id)}
              />
            ))}
          </div>
        </section>

        {/* Section 2 - Rebate Selection */}
        <section className="form-section">
          <h2 className="section-title">Vælg rabat</h2>
          {errors.rebate && <div className="error-message">{errors.rebate}</div>}
          <div className="rebate-grid">
            {rebates.map(rebate => (
              <RebateButton
                key={rebate.id}
                rebate={rebate}
                selected={selectedRebateId === rebate.id}
                onClick={() => setSelectedRebateId(rebate.id)}
                product={selectedProduct}
              />
            ))}
          </div>
        </section>

        {/* Section 3 - Date Selection */}
        <section className="form-section">
          <h2 className="section-title">Vælg gyldighedsperiode</h2>
          {errors.dates && <div className="error-message">{errors.dates}</div>}
          <div className="date-inputs">
            <div className="date-input-group">
              <label htmlFor="validFrom">Gyldig fra</label>
              <input
                type="date"
                id="validFrom"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                required
              />
            </div>
            <div className="date-input-group">
              <label htmlFor="validTo">Gyldig til</label>
              <input
                type="date"
                id="validTo"
                value={validTo}
                onChange={(e) => setValidTo(e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary btn-large"
            disabled={!isFormValid}
          >
            🎟️ Opret Voucher
          </button>
        </div>
      </form>
    </div>
  );
}
