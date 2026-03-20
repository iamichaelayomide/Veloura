"use client";

import { useEffect, useMemo, useState } from "react";

import { categories, dashboardMetrics, homepageSections } from "@/data/catalog";
import { formatDate, formatPrice, formatNumber } from "@/lib/utils";
import { useAdminStore } from "@/store/useAdminStore";
import type { Product } from "@/types";

type ProductFormState = {
  name: string;
  categorySlug: string;
  price: string;
  stock: string;
  shortDescription: string;
  featured: boolean;
  newArrival: boolean;
  sale: boolean;
};

const defaultProductForm: ProductFormState = {
  name: "",
  categorySlug: categories[0].slug,
  price: "120000",
  stock: "5",
  shortDescription: "",
  featured: false,
  newArrival: true,
  sale: false,
};

function productToFormState(product: Product): ProductFormState {
  return {
    name: product.name,
    categorySlug: product.categorySlug,
    price: String(product.basePrice),
    stock: String(product.variants[0]?.stock ?? 0),
    shortDescription: product.shortDescription,
    featured: product.featured,
    newArrival: product.newArrival,
    sale: product.badges.includes("sale"),
  };
}

export function AdminOverviewPanel() {
  const products = useAdminStore((state) => state.products);
  const customers = useAdminStore((state) => state.customers);
  const orders = useAdminStore((state) => state.orders);
  const discounts = useAdminStore((state) => state.discounts);
  const settings = useAdminStore((state) => state.settings);

  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter((order) => order.fulfillmentStatus === "Pending").length;
  const paidOrders = orders.filter((order) => order.paymentStatus === "Paid").length;
  const liveSales = discounts.filter((discount) => discount.status === "Active").length;

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid gap-6 xl:grid-cols-4">
        {[
          ["Revenue", formatPrice(revenue)],
          ["Products", formatNumber(products.length)],
          ["Customers", formatNumber(customers.length)],
          ["Live sales", formatNumber(liveSales)],
        ].map(([label, value]) => (
          <div key={label} className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-muted)]">{label}</p>
            <p className="mt-3 text-2xl text-[var(--veloura-text)] sm:text-3xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Daily signals</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="rounded-[22px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-sm text-[var(--veloura-muted)]">{metric.label}</p>
                <p className="mt-2 text-2xl text-[var(--veloura-text)]">{metric.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">{metric.change}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Operational snapshot</p>
          <div className="mt-6 space-y-4 text-sm text-[var(--veloura-muted)]">
            <div className="flex items-center justify-between rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <span>Pending orders</span>
              <span className="text-[var(--veloura-text)]">{pendingOrders}</span>
            </div>
            <div className="flex items-center justify-between rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <span>Paid orders</span>
              <span className="text-[var(--veloura-text)]">{paidOrders}</span>
            </div>
            <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-[var(--veloura-text)]">{settings.storeName} showroom</p>
              <p className="mt-2 leading-7">{settings.showroomAddress}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">{settings.pickupWindow}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminProductsPanel() {
  const products = useAdminStore((state) => state.products);
  const addProduct = useAdminStore((state) => state.addProduct);
  const updateProduct = useAdminStore((state) => state.updateProduct);
  const removeProduct = useAdminStore((state) => state.removeProduct);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(products[0]?.id ?? null);
  const [form, setForm] = useState<ProductFormState>(() => (products[0] ? productToFormState(products[0]) : defaultProductForm));

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? products[0] ?? null,
    [products, selectedProductId],
  );

  function patchForm<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSelectProduct(productId: string) {
    const product = products.find((entry) => entry.id === productId);
    setSelectedProductId(productId);
    setForm(product ? productToFormState(product) : defaultProductForm);
  }

  function handleAddProduct() {
    if (!form.name.trim() || !form.shortDescription.trim()) return;
    addProduct({
      name: form.name,
      categorySlug: form.categorySlug,
      price: Number(form.price) || 0,
      shortDescription: form.shortDescription,
    });
  }

  function handleSaveProduct() {
    if (!selectedProduct) return;
    updateProduct(selectedProduct.id, {
      name: form.name,
      categorySlug: form.categorySlug,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0,
      shortDescription: form.shortDescription,
      featured: form.featured,
      newArrival: form.newArrival,
      sale: form.sale,
    });
  }

  function handleRemoveSelected() {
    if (!selectedProduct) return;

    removeProduct(selectedProduct.id);
    setSelectedProductId((current) => (current === selectedProduct.id ? null : current));
    setForm(defaultProductForm);
  }

  return (
    <div className="grid gap-5 sm:gap-6 xl:grid-cols-[340px,1fr]">
      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Catalog queue</p>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 xl:block xl:space-y-3 xl:overflow-visible">
          {products.slice(0, 18).map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => handleSelectProduct(product.id)}
              className={`min-w-[240px] shrink-0 rounded-[20px] border p-4 text-left transition xl:w-full xl:min-w-0 ${
                selectedProductId === product.id ? "border-[rgba(214,195,162,0.5)] bg-[rgba(214,195,162,0.08)]" : "border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)]"
              }`}
            >
              <p className="text-sm text-[var(--veloura-text)]">{product.name}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--veloura-muted)]">
                {product.categorySlug.replace(/-/g, " ")} | {formatPrice(product.basePrice)}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5 sm:space-y-6">
        <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
          <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Product workspace</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <input value={form.name} onChange={(event) => patchForm("name", event.target.value)} placeholder="Product name" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
            <select value={form.categorySlug} onChange={(event) => patchForm("categorySlug", event.target.value)} className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]">
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
            <input value={form.price} onChange={(event) => patchForm("price", event.target.value)} placeholder="Base price" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
            <input value={form.stock} onChange={(event) => patchForm("stock", event.target.value)} placeholder="Stock" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
            <textarea value={form.shortDescription} onChange={(event) => patchForm("shortDescription", event.target.value)} placeholder="Short description" className="min-h-[120px] w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-text)] md:col-span-2" />
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--veloura-muted)]">
            {[
              ["featured", "Featured"],
              ["newArrival", "New arrival"],
              ["sale", "In sale"],
            ].map(([key, label]) => {
              const checked = form[key as keyof ProductFormState] as boolean;
              return (
                <label key={key} className="flex min-h-11 items-center gap-2 rounded-full border border-[var(--veloura-line)] px-4 py-2">
                  <input type="checkbox" checked={checked} onChange={(event) => patchForm(key as keyof ProductFormState, event.target.checked)} />
                  <span>{label}</span>
                </label>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <button type="button" onClick={handleSaveProduct} className="w-full rounded-full bg-[var(--veloura-accent)] px-5 py-3 text-sm text-[#111319] sm:w-auto">
              Save product
            </button>
            <button type="button" onClick={handleAddProduct} className="w-full rounded-full border border-[var(--veloura-line)] px-5 py-3 text-sm text-[var(--veloura-text)] sm:w-auto">
              Add as new item
            </button>
            {selectedProduct ? (
              <button type="button" onClick={handleRemoveSelected} className="w-full rounded-full border border-[var(--veloura-line)] px-5 py-3 text-sm text-[var(--veloura-text)] sm:w-auto">
                Remove selected
              </button>
            ) : null}
          </div>
        </div>

        {selectedProduct ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Price</p>
              <p className="mt-3 text-2xl text-[var(--veloura-text)]">{formatPrice(selectedProduct.basePrice)}</p>
            </div>
            <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Stock</p>
              <p className="mt-3 text-2xl text-[var(--veloura-text)]">{selectedProduct.variants[0]?.stock ?? 0}</p>
            </div>
            <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Reviews</p>
              <p className="mt-3 text-2xl text-[var(--veloura-text)]">{selectedProduct.reviewCount}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function AdminOrdersPanel() {
  const orders = useAdminStore((state) => state.orders);
  const updateOrderStatus = useAdminStore((state) => state.updateOrderStatus);

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="panel rounded-[22px] p-4 sm:rounded-[24px] sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-lg text-[var(--veloura-text)]">{order.orderNumber}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">
                {order.customerName} | {formatDate(order.createdAt)} | {formatPrice(order.total)}
              </p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">{order.items.length} line items</p>
            </div>

            <div className="w-full space-y-3 lg:w-auto">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {(["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const).map((status) => (
                  <button key={status} type="button" onClick={() => updateOrderStatus(order.id, status, order.paymentStatus)} className="rounded-full border border-[var(--veloura-line)] px-3 py-2 text-xs text-[var(--veloura-text)]">
                    {status}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                {(["Pending", "Paid", "Failed", "Refunded"] as const).map((status) => (
                  <button key={status} type="button" onClick={() => updateOrderStatus(order.id, order.fulfillmentStatus, status)} className="rounded-full border border-[var(--veloura-line)] px-3 py-2 text-xs text-[var(--veloura-text)]">
                    Mark {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {order.items.map((item) => (
              <div key={`${order.id}-${item.productName}-${item.variantLabel}`} className="rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
                <p className="text-sm text-[var(--veloura-text)]">{item.productName}</p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">
                  {item.variantLabel} | Qty {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function AdminCustomersPanel() {
  const customers = useAdminStore((state) => state.customers);
  const topCustomer = useMemo(
    () => [...customers].sort((left, right) => right.totalSpend - left.totalSpend)[0] ?? null,
    [customers],
  );

  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Customer revenue</p>
          <p className="mt-3 text-3xl text-[var(--veloura-text)]">{formatPrice(customers.reduce((sum, customer) => sum + customer.totalSpend, 0))}</p>
        </div>
        <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Average order count</p>
          <p className="mt-3 text-3xl text-[var(--veloura-text)]">{(customers.reduce((sum, customer) => sum + customer.orderCount, 0) / customers.length).toFixed(1)}</p>
        </div>
        <div className="panel rounded-[22px] p-5 sm:rounded-[24px]">
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Top client</p>
          <p className="mt-3 text-2xl text-[var(--veloura-text)]">{topCustomer?.name ?? "No customer data"}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {customers.map((customer) => (
          <div key={customer.id} className="panel rounded-[22px] p-5 sm:rounded-[24px]">
            <p className="text-lg text-[var(--veloura-text)]">{customer.name}</p>
            <p className="mt-2 text-sm text-[var(--veloura-muted)]">{customer.email}</p>
            <p className="mt-2 text-sm text-[var(--veloura-muted)]">{customer.phone}</p>
            <p className="mt-4 text-sm text-[var(--veloura-text)]">Spend: {formatPrice(customer.totalSpend)}</p>
            <p className="mt-2 text-sm text-[var(--veloura-muted)]">Orders: {customer.orderCount}</p>
            <p className="mt-2 text-sm text-[var(--veloura-muted)]">Tier: {customer.loyaltyTier}</p>
            <p className="mt-2 text-sm text-[var(--veloura-muted)]">Joined: {formatDate(customer.joinedAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminDiscountsPanel() {
  const discounts = useAdminStore((state) => state.discounts);
  const addDiscount = useAdminStore((state) => state.addDiscount);
  const updateDiscountStatus = useAdminStore((state) => state.updateDiscountStatus);
  const removeDiscount = useAdminStore((state) => state.removeDiscount);
  const [code, setCode] = useState("");
  const [value, setValue] = useState("10");
  const [type, setType] = useState<"percentage" | "amount" | "free-shipping">("percentage");

  return (
    <div className="grid gap-5 sm:gap-6 lg:grid-cols-[340px,1fr]">
      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Create sale</p>
        <div className="mt-4 space-y-3">
          <input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} placeholder="Code" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <select value={type} onChange={(event) => setType(event.target.value as "percentage" | "amount" | "free-shipping")} className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]">
            <option value="percentage">Percentage</option>
            <option value="amount">Amount</option>
            <option value="free-shipping">Free shipping</option>
          </select>
          <input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Value" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <button
            type="button"
            onClick={() => {
              if (!code.trim()) return;
              addDiscount({ code, type, value: Number(value), status: "Scheduled" });
              setCode("");
              setValue("10");
              setType("percentage");
            }}
            className="w-full rounded-full bg-[var(--veloura-accent)] px-5 py-3 text-sm text-[#111319]"
          >
            Add sale
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {discounts.map((discount) => (
          <div key={discount.id} className="panel rounded-[22px] p-4 sm:rounded-[24px] sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-lg text-[var(--veloura-text)]">{discount.code}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--veloura-muted)]">
                  {discount.type} | {discount.value} | {discount.usage}
                </p>
                <p className="mt-2 text-sm text-[var(--veloura-muted)]">
                  {formatDate(discount.startsAt)} to {formatDate(discount.endsAt)}
                </p>
              </div>

              <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap">
                {(["Scheduled", "Active", "Expired"] as const).map((status) => (
                  <button key={status} type="button" onClick={() => updateDiscountStatus(discount.id, status)} className="rounded-full border border-[var(--veloura-line)] px-4 py-2 text-sm text-[var(--veloura-text)]">
                    {status}
                  </button>
                ))}
                <button type="button" onClick={() => removeDiscount(discount.id)} className="rounded-full border border-[var(--veloura-line)] px-4 py-2 text-sm text-[var(--veloura-text)]">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminAnalyticsPanel() {
  const orders = useAdminStore((state) => state.orders);
  const products = useAdminStore((state) => state.products);
  const bestPerformers = useMemo(
    () => [...products].sort((left, right) => right.reviewCount - left.reviewCount).slice(0, 5),
    [products],
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_.9fr]">
      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Revenue map</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {orders.map((order) => (
            <div key={order.id} className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-sm text-[var(--veloura-text)]">{order.customerName}</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">{formatPrice(order.total)}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--veloura-accent)]">
                {order.fulfillmentStatus} | {order.paymentStatus}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Top performing items</p>
        <div className="mt-6 space-y-4">
          {bestPerformers.map((product) => (
            <div key={product.id} className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
              <p className="text-sm text-[var(--veloura-text)]">{product.name}</p>
              <p className="mt-2 text-sm text-[var(--veloura-muted)]">{product.reviewCount} review signals</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminContentPanel() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {homepageSections.map((section) => (
        <div key={section.id} className="panel rounded-[22px] p-5 sm:rounded-[24px]">
          <p className="text-lg text-[var(--veloura-text)]">{section.title}</p>
          <p className="mt-2 text-sm text-[var(--veloura-muted)]">
            {section.type} | {section.status}
          </p>
          <p className="mt-2 text-sm text-[var(--veloura-muted)]">Updated {formatDate(section.updatedAt)}</p>
        </div>
      ))}
    </div>
  );
}

export function AdminSettingsPanel() {
  const settings = useAdminStore((state) => state.settings);
  const updateSettings = useAdminStore((state) => state.updateSettings);
  const [localSettings, setLocalSettings] = useState(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  function patchField<K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) {
    setLocalSettings((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1fr_.9fr]">
      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Store settings</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input value={localSettings.storeName} onChange={(event) => patchField("storeName", event.target.value)} placeholder="Store name" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <input value={localSettings.supportPhone} onChange={(event) => patchField("supportPhone", event.target.value)} placeholder="Support phone" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <input value={localSettings.supportEmail} onChange={(event) => patchField("supportEmail", event.target.value)} placeholder="Support email" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <input value={localSettings.instagram} onChange={(event) => patchField("instagram", event.target.value)} placeholder="Instagram link" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)]" />
          <input value={localSettings.showroomAddress} onChange={(event) => patchField("showroomAddress", event.target.value)} placeholder="Showroom address" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)] md:col-span-2" />
          <input value={localSettings.mapsLink} onChange={(event) => patchField("mapsLink", event.target.value)} placeholder="Maps link" className="h-11 w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 text-sm text-[var(--veloura-text)] md:col-span-2" />
          <textarea value={localSettings.pickupWindow} onChange={(event) => patchField("pickupWindow", event.target.value)} placeholder="Pickup guidance" className="min-h-[120px] w-full rounded-[18px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-sm text-[var(--veloura-text)] md:col-span-2" />
        </div>
        <div className="mt-6">
          <button type="button" onClick={() => updateSettings(localSettings)} className="w-full rounded-full bg-[var(--veloura-accent)] px-5 py-3 text-sm text-[#111319] sm:w-auto">
            Save settings
          </button>
        </div>
      </div>

      <div className="panel rounded-[24px] p-5 sm:rounded-[28px] sm:p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-[var(--veloura-accent)]">Live summary</p>
        <div className="mt-6 space-y-4 text-sm text-[var(--veloura-muted)]">
          <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-[var(--veloura-text)]">{localSettings.storeName}</p>
            <p className="mt-2 leading-7">{localSettings.showroomAddress}</p>
          </div>
          <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-[var(--veloura-text)]">Support</p>
            <p className="mt-2">{localSettings.supportPhone}</p>
            <p className="mt-2">{localSettings.supportEmail}</p>
          </div>
          <div className="rounded-[20px] border border-[var(--veloura-line)] bg-[rgba(255,255,255,0.03)] p-4">
            <p className="text-[var(--veloura-text)]">Pickup guidance</p>
            <p className="mt-2 leading-7">{localSettings.pickupWindow}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
