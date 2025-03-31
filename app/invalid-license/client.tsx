// app/invalid-license/client.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function InvalidLicenseClient() {
  const [fadeIn, setFadeIn] = useState<boolean>(false);
  
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-red-500 mx-auto" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Lisensi Tidak Valid</h1>
        
        <p className="text-gray-600 mb-6">
          Maaf, lisensi produk Anda tidak valid atau telah kedaluwarsa. 
          Silahkan hubungi admin untuk mendapatkan bantuan.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <a 
            href="https://wa.me/6289524960107" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center text-green-600 font-medium hover:text-green-700 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp: 089524960107
          </a>
        </div>
        
        <Link href="/">
          <span className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer">
            Kembali ke Beranda
          </span>
        </Link>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Jika Anda yakin lisensi Anda valid, silahkan periksa domain yang terdaftar pada lisensi.</p>
      </div>
    </div>
  );
}