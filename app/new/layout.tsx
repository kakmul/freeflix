import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New & Popular - 123Movies',
  description: 'Discover new releases and popular movies and TV shows on 123Movies',
};

export default function NewAndPopularLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}