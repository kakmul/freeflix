import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TV Shows - Netflix',
  description: 'Browse all TV shows available on Netflix',
};

export default function TVLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}