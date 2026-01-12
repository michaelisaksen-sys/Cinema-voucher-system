import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVouchers, updateVoucherStatus, deleteVoucher } from '../utils/storage';
import { products } from '../data/products';
import { rebates } from '../data/rebates';

export default function VoucherListPage() {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    loadVouchers();
  }, []);

  const loadVouchers = () => {
    const allVouchers = getVouchers();
    // Sort by creation date, newest first
    allVouchers.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setVouchers(allVouchers);
  };

  const handleMarkAsUsed = (id) => {
    updateVoucherStatus(id, 'used');
    loadVouchers();
  };

  const handleDelete = (id) => {
    if (confirm('Er du sikker på, at du vil slette denne voucher?')) {
      deleteVoucher(id);
      loadVouchers();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('da-DK', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      active: { label: 'Aktiv', className: 'status-active' },
      expired: { label: 'Udløbet', className: 'status-expired' },
      used: { label: 'Brugt', className: 'status-used' }
    };
    const badge = badges[status] || badges.active;
    return <span className={`status-badge ${badge.className}`}>{badge.label}</span>;
  };

  if (vouchers.length === 0) {
    return (
      <div className="voucher-list-page">
        <div className="empty-state">
          <div className="empty-icon">🎟️</div>
          <p>Ingen vouchers oprettet endnu</p>
          <Link to="/" className="btn btn-primary">
            ➕ Opret første voucher
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="voucher-list-page">
      <div className="page-header">
        <h2>Alle Vouchers</h2>
        <Link to="/" className="btn btn-primary">
          ➕ Opret ny voucher
        </Link>
      </div>

      <div className="voucher-table">
        <table>
          <thead>
            <tr>
              <th>Kode</th>
              <th>Produkt</th>
              <th>Rabat</th>
              <th>Gyldig fra</th>
              <th>Gyldig til</th>
              <th>Status</th>
              <th>Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map(voucher => {
              const product = products.find(p => p.id === voucher.productId);
              const rebate = rebates.find(r => r.id === voucher.rebateId);

              return (
                <tr key={voucher.id}>
                  <td className="voucher-code-cell">{voucher.id}</td>
                  <td>
                    {product && (
                      <>
                        {product.emoji} {product.name}
                      </>
                    )}
                  </td>
                  <td>{rebate?.label}</td>
                  <td>{formatDate(voucher.validFrom)}</td>
                  <td>{formatDate(voucher.validTo)}</td>
                  <td>{getStatusBadge(voucher.status)}</td>
                  <td className="actions-cell">
                    {voucher.status === 'active' && (
                      <button
                        onClick={() => handleMarkAsUsed(voucher.id)}
                        className="btn btn-small btn-secondary"
                      >
                        ✓ Markér som brugt
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(voucher.id)}
                      className="btn btn-small btn-danger"
                    >
                      🗑️ Slet
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
