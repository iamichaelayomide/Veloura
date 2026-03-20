export type UserRole = "CUSTOMER" | "ADMIN" | "EDITOR" | "SUPPORT";

export type ProductCategoryKey =
  | "wigs"
  | "bundles"
  | "frontals"
  | "closures"
  | "raw-hair"
  | "accessories"
  | "hair-care"
  | "ready-to-wear"
  | "install-tools"
  | "styling-essentials";

export type FulfillmentMethod = "delivery" | "pickup";

export type PaymentMethod = "paystack" | "transfer" | "whatsapp";

export type CheckoutDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  address: string;
  note: string;
  fulfillmentMethod: FulfillmentMethod;
};

export type VariantAttributeKey =
  | "length"
  | "texture"
  | "color"
  | "laceType"
  | "density"
  | "capSize"
  | "pieceType";

export type ProductBadge = "best-seller" | "new" | "limited" | "sale";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  accent: string;
  productCount: number;
};

export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string;
  eyebrow: string;
  image: string;
  featuredProductSlugs: string[];
};

export type ProductVariant = {
  id: string;
  sku: string;
  label: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image?: string;
  attributes: Partial<Record<VariantAttributeKey, string>>;
};

export type ProductReview = {
  id: string;
  customer: string;
  title: string;
  comment: string;
  rating: number;
  verified: boolean;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  collectionSlugs: string[];
  shortDescription: string;
  description: string;
  specs: Array<{ label: string; value: string }>;
  careGuide: string[];
  faq: Array<{ question: string; answer: string }>;
  badges: ProductBadge[];
  basePrice: number;
  compareAtPrice?: number;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;
  images: string[];
  hoverImage?: string;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
  seoTitle: string;
  seoDescription: string;
};

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  quote: string;
  install: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type WishlistItem = {
  productSlug: string;
};

export type CartItemType = {
  id: string;
  productId: string;
  productSlug: string;
  variantId: string;
  name: string;
  variantLabel: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
};

export type CustomerProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpend: number;
  orderCount: number;
  loyaltyTier: string;
  joinedAt: string;
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  fulfillmentStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentStatus: "Pending" | "Paid" | "Failed" | "Refunded";
  total: number;
  items: Array<{
    productName: string;
    variantLabel: string;
    quantity: number;
    price: number;
    image: string;
  }>;
};

export type Discount = {
  id: string;
  code: string;
  type: "percentage" | "amount" | "free-shipping";
  value: number;
  startsAt: string;
  endsAt: string;
  usage: string;
  status: "Active" | "Scheduled" | "Expired";
};

export type HomepageSection = {
  id: string;
  title: string;
  type: "hero" | "collection" | "editorial" | "ugc" | "newsletter";
  status: "Published" | "Draft";
  updatedAt: string;
};

export type StoreMetric = {
  label: string;
  value: string;
  change: string;
};

export type ServiceCategoryKey = "hairdressing" | "lashes" | "pedicure";

export type ServiceAvailabilitySlot = {
  id: string;
  date: string;
  dayLabel: string;
  time: string;
  stylist: string;
  available: boolean;
};

export type Service = {
  id: string;
  name: string;
  slug: string;
  categorySlug: ServiceCategoryKey;
  shortDescription: string;
  description: string;
  durationMinutes: number;
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  includes: string[];
  benefits: string[];
  bookingNotes: string[];
  availability: ServiceAvailabilitySlot[];
  featured: boolean;
};

