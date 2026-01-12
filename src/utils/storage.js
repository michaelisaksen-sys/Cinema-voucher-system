const STORAGE_KEY = 'cinema-vouchers';

export function saveVoucher(voucher) {
  const vouchers = getVouchers();
  vouchers.push(voucher);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vouchers));
}

export function getVouchers() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];

  const vouchers = JSON.parse(stored);

  // Update status for expired vouchers
  const now = new Date().toISOString().split('T')[0];
  return vouchers.map(voucher => {
    if (voucher.status === 'active' && voucher.validTo < now) {
      return { ...voucher, status: 'expired' };
    }
    return voucher;
  });
}

export function updateVoucherStatus(id, status) {
  const vouchers = getVouchers();
  const updated = vouchers.map(voucher =>
    voucher.id === id ? { ...voucher, status } : voucher
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function deleteVoucher(id) {
  const vouchers = getVouchers();
  const filtered = vouchers.filter(voucher => voucher.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
