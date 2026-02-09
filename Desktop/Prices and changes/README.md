# Prices and Changes Manager

A modern travel management application for managing visas, airlines, and flight packages with dynamic pricing tiers and commissions.

## Features

- **Visa Management** - Track visa types, durations, prices, and requirements
- **Airline Management** - Manage airline information and commissions
- **Flight Package Management** - Create and manage flight packages with:
  - Origin and destination routes
  - Departure and return dates
  - Multiple pricing tiers (single, double, child with bed, child without bed, infant)
  - Flight class options (Economy, Business, First)
  - Commission tracking
  - Included services tracking
- **Data Import/Export** - JSON import and export functionality for data persistence
- **Search and Filtering** - Advanced search and filtering across all entities
- **Responsive UI** - Modern, accessible interface with CSS modules styling

## Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd prices-and-changes
```

2. Install dependencies
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will open automatically at http://localhost:5174

## Building

Create a production build:
```bash
npm run build
```

Built files will be in the `dist/` directory.

## Scripts

- `npm run dev` - Start development server with hot module reloading
- `npm run build` - Create optimized production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run TypeScript type checking

## Project Structure

```
src/
├── components/          # React components
│   ├── airline/        # Airline management components
│   ├── flight/         # Flight package management components
│   ├── visa/           # Visa management components
│   ├── common/         # Shared components (forms, dialogs, etc.)
│   ├── layout/         # Layout components (header, main layout)
│   └── Dashboard.tsx   # Main dashboard component
├── context/            # React context for state management
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── utils/              # Utility functions (JSON import/export, validation)
├── App.tsx             # Root component
├── main.tsx            # Application entry point
└── vite-env.d.ts       # Vite type definitions
```

## Data Format

The application uses JSON for data import/export. The data structure includes:

```json
{
  "visas": [
    {
      "id": "string",
      "country": "string",
      "type": "string",
      "duration": "string",
      "price": "number",
      "requirements": "string",
      "validFrom": "string",
      "validUntil": "string"
    }
  ],
  "airlines": [
    {
      "id": "string",
      "name": "string",
      "code": "string",
      "department": "string",
      "commission": "number"
    }
  ],
  "flightPackages": [
    {
      "id": "string",
      "destination": "string",
      "origin": "string",
      "departureDate": "string",
      "returnDate": "string",
      "airline": "string",
      "priceSingle": "number",
      "priceDouble": "number",
      "priceChildWithBed": "number",
      "priceChildWithoutBed": "number",
      "priceInfant": "number",
      "class": "Economy|Business|First",
      "commission": "number",
      "includedServices": ["string"],
      "notes": "string"
    }
  ]
}
```

## Troubleshooting

### Port Already in Use
If port 5174 is already in use, Vite will automatically use the next available port.

### Module Not Found Errors
Ensure all file extensions are correct:
- Component files: `.tsx`
- CSS modules: `.module.css`
- Style files: `.css`

### TypeScript Errors
Run `npm run lint` to check for type errors:
```bash
npm run lint
```

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS Modules** - Component-scoped styling

## License

MIT
