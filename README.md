# 🌸 Rose App

A full-stack e-commerce web application for a flower and gift shop, built with Next.js 14 App Router. Supports Arabic and English with full RTL layout, authentication, a product catalog, cart, checkout, and an admin dashboard.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State / Data Fetching:** TanStack React Query
- **Auth:** NextAuth.js v4
- **i18n:** next-intl (Arabic / English)
- **Forms:** React Hook Form + Zod
- **Maps:** Google Maps API
- **Fonts:** Google Fonts (Tajawal, Sarabun, Mulish, Inter, Zain)

---

## Features

- 🌍 Bilingual support (AR / EN) with RTL layout for Arabic
- 🔐 Authentication — Login, Register, Forgot Password (OTP flow)
- 🛍️ Product catalog with filtering and infinite scroll
- 🛒 Cart — supports both guest and authenticated users
- 💳 Checkout with address management and payment
- 📦 Order history
- 🗺️ Google Maps integration for address selection
- 🌙 Dark / Light mode
- 📊 Admin dashboard — stats, categories, occasions, products (add/update)
- 📱 Fully responsive

---

## 🏗️ Architecture

### Server Components (Default)
All route pages are **Server Components** by default, providing:
- **SEO Optimization** - Server-side rendering for better search engine visibility
- **Performance** - Faster initial page loads
- **Security** - Sensitive operations handled on the server

### Client Components
Interactive components marked with `'use client'`:
- **Forms** - User input handling and validation
- **Interactive UI** - Modals, dropdowns, and dynamic content
- **State Management** - React hooks and context providers

## 🔐 Authentication

**NextAuth.js** implementation with:
- **Credentials Provider** - Email/password authentication
- **JWT Strategy** - Secure token-based sessions
- **Middleware Protection** - Route-level authentication
- **Session Management** - Automatic token refresh

```typescript
// Authentication configuration
export const authoption: NextAuthOptions = {
  providers: [Credentials({...})],
  callbacks: { jwt, session },
  pages: { signIn: '/login', signOut: '/login' }
}
```

## 🛠️ Data Handling

### Server Actions
Server-side form handling and data mutations:

```typescript
'use server'
export async function EditAccount(data: AccountFormFields) {
  const token = await getToken();
  // Secure server-side API calls
}
```

### Route Handlers
API endpoints for external integrations:

```typescript
// app/api/auth/[...nextauth]/route.ts
const handler = NextAuth(authoption);
export { handler as GET, handler as POST };
```
---

## Project Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/          # Login, Register, Forgot Password
│   │   ├── (website)/       # Public pages (Home, Products, Cart, Checkout, About, Contact, FAQ...)
│   │   └── dashboard/       # Admin dashboard
│   └── api/                 # Next.js API routes (proxy to external API)
├── components/
│   ├── ui/                     # Reusable UI components
│   ├── features/               # Feature-specific components
│   ├── layout/                 # Layout components
│   └── providers/              # Context providers
├── i18n/                    # next-intl config, routing, and translation messages
├── lib/
│   ├── actions/                # Server actions
│   ├── services/               # API services
│   ├── schemas/                # Zod validation schemas
│   └── utils/                  # Utility functions
└── middleware.ts
```

---

## 🎯 Component Strategy

### Server Components (Pages)

- **Data Fetching** - Direct API calls for SSR
- **SEO** - Meta tags and structured data
- **Security** - Sensitive operations handled server-side

### Client Components (Interactive)

- **Interactive UI** - Forms, buttons, modals
- **State Management** - React hooks and context
- **Real-time Updates** - Dynamic content updates

## 🚦 Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd rose-app
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Setup**

```bash
cp .env.example .env.local
```

Required environment variables:

```env
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
API=your-backend-api-url
```

4. **Run the development server**

```bash
yarn dev
# or
npm run dev
```

### 1. Install dependencies

```bash
yarn install
```

````

### 3. Run the development server

```bash
yarn dev
````

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script       | Description              |
| ------------ | ------------------------ |
| `yarn dev`   | Start development server |
| `yarn build` | Build for production     |
| `yarn start` | Start production server  |
| `yarn lint`  | Run ESLint               |

---

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints** - sm, md, lg, xl responsive design
- **Flexible Layouts** - CSS Grid and Flexbox
- **Touch Friendly** - Optimized for touch interactions

## 🔒 Security Features

- **Route Protection** - Middleware-based authentication
- **CSRF Protection** - Built-in NextAuth.js security
- **Input Validation** - Zod schema validation
- **Secure Headers** - Next.js security headers

## 📊 Performance

- **Server-Side Rendering** - Fast initial page loads
- **Code Splitting** - Automatic route-based splitting
- **Image Optimization** - Next.js Image component
- **Caching Strategy** - Server and client-side caching

---

## Deployment

Deploy easily on [Vercel](https://vercel.com). Make sure to add all environment variables in the Vercel project settings before deploying.
