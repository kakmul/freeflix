"use client";

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function MoviePagination({ currentPage, totalPages }: MoviePaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {currentPage > 1 && (
        <Link href={createPageUrl(currentPage - 1)} scroll={false}>
          <Button variant="outline">Previous</Button>
        </Link>
      )}
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={createPageUrl(currentPage + 1)} scroll={false}>
          <Button variant="outline">Next</Button>
        </Link>
      )}
    </div>
  );
}