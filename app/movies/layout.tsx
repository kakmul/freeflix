import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies - 123Movies',
  description: 'Browse all movies available on 123Movies',
}

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}