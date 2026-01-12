import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import CreateVoucher from './pages/CreateVoucher';
import VoucherListPage from './pages/VoucherListPage';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<CreateVoucher />} />
            <Route path="/vouchers" element={<VoucherListPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
