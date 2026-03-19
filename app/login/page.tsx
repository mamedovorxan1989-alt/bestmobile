'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'login' | 'forgot'>('login')
  const [resetSent, setResetSent] = useState(false)

  const getSupabase = async () => {
    const { createClient } = await import('@supabase/supabase-js')
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    try {
      const supabase = await getSupabase()
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Email və ya şifrə yanlışdır: ' + error.message)
      } else if (data.session) {
        window.location.href = '/'
      } else {
        setError('Session yaranmadı')
      }
    } catch(e: any) {
      setError('Xəta: ' + e.message)
    }
    setLoading(false)
  }

  const handleForgot = async () => {
    if (!email) { setError('Zəhmət olmasa email yazın'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = await getSupabase()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) { setError('Xəta: ' + error.message) }
      else { setResetSent(true) }
    } catch(e: any) {
      setError('Xəta: ' + e.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17 2H7C5.9 2 5 2.9 5 4v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-5 18c-.83 0-1.5-.67-1.5-1.5S11.17 17 12 17s1.5.67 1.5 1.5S12.83 20 12 20zm5-4H7V4h10v12z"/></svg>
          </div>
          <span className="text-white text-2xl font-bold">Best Mobile</span>
        </div>
        <div className="bg-[#1a1d27] rounded-2xl p-8 shadow-2xl border border-[#2a2d3a]">
          {tab === 'login' && (
            <>
              <h1 className="text-white text-xl font-semibold mb-1">Xoş gəlmisiniz</h1>
              <p className="text-gray-400 text-sm mb-6">Hesabınıza daxil olun</p>
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
              <div className="mb-4">
                <label className="text-gray-400 text-sm mb-1 block">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="email@example.com" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
              </div>
              <div className="mb-4 relative">
                <label className="text-gray-400 text-sm mb-1 block">Şifrə</label>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="••••••••" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition pr-12"/>
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-gray-400 hover:text-white">
                  {showPass
                    ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21"/></svg>
                    : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                  }
                </button>
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-blue-500"/>
                  <span className="text-gray-400 text-sm">Məni xatırla</span>
                </label>
                <button onClick={() => { setTab('forgot'); setError('') }} className="text-blue-400 text-sm hover:underline">Şifrəni unutdum</button>
              </div>
              <button onClick={handleLogin} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">
                {loading ? 'Yüklənir...' : 'Daxil ol'}
              </button>
              <p className="text-center text-gray-500 text-sm mt-6">Hesabınız yoxdur? <a href="/register" className="text-blue-400 hover:underline">Qeydiyyat</a></p>
            </>
          )}
          {tab === 'forgot' && (
            <>
              <button onClick={() => { setTab('login'); setError(''); setResetSent(false) }} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
                Geri
              </button>
              <h1 className="text-white text-xl font-semibold mb-1">Şifrəni unutdum</h1>
              <p className="text-gray-400 text-sm mb-6">Email adresinizi yazın, reset linki göndərəcəyik</p>
              {resetSent ? (
                <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm px-4 py-4 rounded-lg text-center">
                  ✅ Reset linki emailinizə göndərildi! Email qutunuzu yoxlayın.
                </div>
              ) : (
                <>
                  {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-4">{error}</div>}
                  <div className="mb-6">
                    <label className="text-gray-400 text-sm mb-1 block">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleForgot()} placeholder="email@example.com" className="w-full bg-[#0f1117] border border-[#2a2d3a] text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition"/>
                  </div>
                  <button onClick={handleForgot} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50">
                    {loading ? 'Göndərilir...' : 'Reset linki göndər'}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}