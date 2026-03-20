"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { hairHref } from "@/lib/routes";
import { formatPrice } from "@/lib/utils";
import { getServiceCategoryName } from "@/lib/services";
import type { Service } from "@/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="panel overflow-hidden rounded-[30px]">
      <div className="relative aspect-[5/4] overflow-hidden">
        <Image src={service.image} alt={service.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090b11] via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-[rgba(247,245,239,0.92)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#181a22]">
          {getServiceCategoryName(service.categorySlug)}
        </div>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[var(--veloura-muted)]">Appointment</p>
          <h3 className="mt-2 text-2xl text-[var(--veloura-text)]">{service.name}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--veloura-muted)]">{service.shortDescription}</p>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm text-[var(--veloura-muted)]">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-[var(--veloura-accent)]" />
            <span>{service.durationMinutes} mins</span>
          </div>
          <span className="text-[var(--veloura-text)]">{formatPrice(service.price)}</span>
        </div>
        <Button asChild className="w-full">
          <Link href={hairHref(`/services/${service.slug}`)}>View hairdressers and book</Link>
        </Button>
      </div>
    </article>
  );
}
