'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) { setError('Bütün xanaları doldurun'); return }
    if (password !== confirmPassword) { setError('Şifrələr uyğun gəlmir'); return }
    if (password.length < 6) { setError('Şifrə minimum 6 simvol'); return }
    if (!terms) { setError('Şərtləri qəbul edin'); return }
    setLoading(true); setError('')
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
      if (error) { setError(error.message) } else { setSuccess('Qeydiyyat uğurlu! Emailinizi yoxlayın.'); setTimeout(() => router.push('/login'), 3000) }
    } catch(e) { setError('Xəta baş verdi') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zm5-4H7V4h10v12z"/></svg>
          </div>
          <span className="text-white text-2xl font-bold">Best Mobile</span>
        </div>
        <div className="bg-[#1a1d27] rounded-2xl p-8 shadow-2xl border border-[#2a2d3a]">
          <h1 className="text-white text-xl font-semibold mb-1">Qeydiyyat</h1>
          <p className="text-gray-400 text-sm mb-6">Yeni hesab yaradın</p>
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
          {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-3 rounded-lg mb-4">{success}</div>}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Ad Soyad</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Orxan Məmmədov" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Şifrə</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
          </div>
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Şifrəni təsdiqlə</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
          </div>
          <div className="flex items-center gap-2 mb-6">
            <input type="checkbox" id="terms" checked={terms} onChange={e => setTerms(e.target.checked)} className="w-4 h-4 accent-blue-500"/>
            <label htmlFor="terms" className="text-gray-400 text-sm cursor-pointer"><span className="text-blue-400">Şərtləri</span> qəbul edirəm</label>
          </div>
          <button onClick={handleRegister} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">
            {loading ? 'Yüklənir...' : 'Qeydiyyatdan keç'}
          </button>
          <p className="text-center text-gray-500 text-sm mt-6">Hesabınız var? <a href="/login" className="text-blue-400 hover:underline">Daxil ol</a></p>
        </div>
      </div>
    </div>
  )
}
