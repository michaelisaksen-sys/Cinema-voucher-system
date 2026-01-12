export function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({length: 4}, () =>
    chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CIN-${segment()}-${segment()}`;
}
