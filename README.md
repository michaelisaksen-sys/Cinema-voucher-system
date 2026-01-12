# Biograf Voucher System

A cinema voucher management system for staff to create and manage customer rebate vouchers.

## Features

- ✅ Create vouchers with product selection (5 products)
- ✅ Choose from 3 rebate types (2 for 1, 50% off, 20% off)
- ✅ Set validity period with date range
- ✅ Generate unique voucher codes (CIN-XXXX-XXXX format)
- ✅ View, print, and copy voucher codes
- ✅ Manage all vouchers (view list, mark as used, delete)
- ✅ Local storage persistence
- ✅ Danish language interface
- ✅ Dark cinema-themed design
- ✅ Print-friendly voucher format
- ✅ Responsive design

## Tech Stack

- React 18
- React Router DOM 6
- Vite
- Local Storage for data persistence
- CSS3 with custom theming

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm preview
```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── RebateButton.jsx
│   └── VoucherCard.jsx
├── pages/              # Page components
│   ├── CreateVoucher.jsx
│   └── VoucherListPage.jsx
├── data/               # Static data
│   ├── products.js
│   └── rebates.js
├── utils/              # Utility functions
│   ├── storage.js
│   └── voucherCode.js
├── styles/             # Global styles
│   └── globals.css
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## Usage

### Creating a Voucher

1. Select a product from the available options
2. Choose a rebate type
3. Set the validity period (start and end dates)
4. Click "Opret Voucher" to generate
5. View the voucher with its unique code
6. Print or copy the code as needed

### Managing Vouchers

1. Navigate to "Se alle vouchers" to view the voucher list
2. Mark active vouchers as used
3. Delete vouchers when no longer needed
4. Expired vouchers are automatically marked

## Data Storage

All voucher data is stored in the browser's local storage under the key `cinema-vouchers`. The data persists across browser sessions but is device-specific.

## Demo Limitations

- No user authentication
- No backend/database (local storage only)
- Fixed product list (not editable)
- No real payment or POS integration
- Manual status change only
- Single browser/device (local storage doesn't sync)