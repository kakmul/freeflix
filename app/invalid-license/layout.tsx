// app/invalid-license/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lisensi Tidak Valid',
  description: 'Halaman lisensi tidak valid'
};

export default function InvalidLicenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}