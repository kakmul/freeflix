import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Movies - Netflix',
  description: 'Browse all movies available on Netflix',
}

export default function MoviesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}