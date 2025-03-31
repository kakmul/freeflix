// components/InvalidLicenseModal.tsx
'use client';

export default function InvalidLicenseModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center">
        <h2 className="text-xl font-bold text-red-600 mb-2">Lisensi Tidak Valid</h2>
        <p className="text-gray-700 mb-4">
          Email atau kode lisensi tidak valid. Silakan hubungi admin untuk aktivasi.
        </p>
        <a
          href="https://wa.me/6289524960107"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md inline-block"
        >
          Hubungi Admin via WhatsApp
        </a>
      </div>
    </div>
  );
}
