"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
}

export function MoviePagination({ currentPage, totalPages }: MoviePaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12">
      {currentPage > 1 && (
        <Link href={`/movies?page=${currentPage - 1}`}>
          <Button variant="outline">Previous</Button>
        </Link>
      )}
      <span className="text-muted-foreground">
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/movies?page=${currentPage + 1}`}>
          <Button variant="outline">Next</Button>
        </Link>
      )}
    </div>
  );
}