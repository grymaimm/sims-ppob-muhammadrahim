// import { useRouter } from 'next/router'
// import React, { useEffect } from 'react'

// export default function Dashboard() {
//   const router = useRouter()

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       router.push('/')
//     }
//   }, [router])

//   return (
//     <div className="p-10 text-center">
//       <h1 className="text-2xl font-bold">Selamat datang di Dashboard!</h1>
//       <p className="mt-2">Kamu berhasil login 🎉</p>
//     </div>
//   )
// }

import withAuth from '@/lib/withAuth';

function Dashboard() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold'>Selamat Datang di Dashboard</h1>
      <p>Ini hanya bisa diakses jika sudah login.</p>
    </div>
  );
}

export default withAuth(Dashboard);
