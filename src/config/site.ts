export const siteConfig = {
  name: "Veloura",
  description: "Luxury human hair crafted for presence, longevity, and easy confidence.",
  announcement: "Complimentary Lagos delivery above NGN 250,000 and bespoke wig customization within 72 hours.",
  phone: "+234 813 555 0188",
  email: "hello@veloura.co",
  whatsapp: "https://wa.me/2348135550188",
  instagram: "https://instagram.com/veloura.co",
  address: "12A Admiralty Way, Lekki Phase 1, Lagos",
} as const;

export const storefrontRoutes = [
  "/",
  "/shop",
  "/collections/[slug]",
  "/categories/[slug]",
  "/product/[slug]",
  "/search",
  "/wishlist",
  "/cart",
  "/checkout",
  "/order-success",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/account",
  "/account/orders",
  "/account/orders/[orderNumber]",
  "/account/addresses",
  "/account/profile",
  "/account/security",
  "/account/wishlist",
  "/about",
  "/contact",
  "/faq",
  "/policies/shipping-policy",
  "/policies/return-policy",
  "/policies/privacy-policy",
  "/policies/terms",
] as const;

export const adminRoutes = [
  "/admin/login",
  "/admin",
  "/admin/products",
  "/admin/orders",
  "/admin/customers",
  "/admin/categories",
  "/admin/collections",
  "/admin/discounts",
  "/admin/reviews",
  "/admin/content",
  "/admin/settings",
  "/admin/analytics",
] as const;

export const architectureSummary = {
  appLayers: [
    "App Router pages under src/app for storefront and admin surfaces",
    "Reusable UI and feature components under src/components",
    "Typed commerce content and sample records under src/data",
    "Domain helpers and formatting utilities under src/lib",
    "Prisma schema and seed for production-grade persistence migration path",
  ],
  coreModels: [
    "User, Address, Product, ProductVariant, Category, Collection, Cart, CartItem",
    "Order, OrderItem, Payment, Review, Coupon, HomepageSection, WishlistItem, ShippingZone, StoreSetting",
  ],
} as const;


