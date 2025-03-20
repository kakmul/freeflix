import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Shows - 123Movies',
  description: 'Browse all TV shows available on 123Movies',
};

export default function TVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}