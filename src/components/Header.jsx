import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <h1 className="header-title">
          <span className="cinema-icon">🎬</span>
          Biograf Voucher System
        </h1>
      </Link>
    </header>
  );
}
