import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New & Popular - Netflix',
  description: 'Discover new releases and popular movies and TV shows on Netflix',
};

export default function NewAndPopularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}