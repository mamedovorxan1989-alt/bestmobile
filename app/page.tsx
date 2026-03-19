'use client'
import { useState, useEffect } from 'react'

const products = [
  { id: 1, name: 'iPhone 15 Pro Ekran', sub: 'Orijinal · OLED', price: '85 ₼', status: 'var' },
  { id: 2, name: 'Samsung S24 Batareya', sub: '3900mAh', price: '32 ₼', status: 'var' },
  { id: 3, name: 'iPhone 13 Kamera', sub: 'Arxa · 12MP', price: '45 ₼', status: 'var' },
  { id: 4, name: 'Xiaomi 12 Ekran', sub: 'AMOLED', price: 'Yoxdur', status: 'yox' },
  { id: 5, name: 'Samsung A54 Şarj', sub: 'USB-C', price: '12 ₼', status: 'var' },
]

const newArrivals = [
  'iPhone 15 Pro ekranı ✅ Yeni',
  'Samsung S24 batareyası ✅ Yeni',
  'Xiaomi 13 Ultra ekranı ✅ Yeni',
  'iPhone 14 şarj portu ✅ Yeni',
]

const onlineUsers = ['Rəşad H.', 'Nicat M.', 'Elnur K.', 'Anar T.']

const menuItems = [
  { label: 'Ana Səhifə', badge: 0, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg> },
  { label: 'Lent', badge: 12, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h10"/></svg> },
  { label: 'Chat', badge: 3, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> },
  { label: 'Xəbərlər', badge: 0, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg> },
  { label: 'Kampaniyalar', badge: 0, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
  { label: 'Sxemlər', badge: 0, icon: <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> },
]

const handleLogout = async () => {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  await supabase.auth.signOut()
  window.location.href = '/login'
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('Ana Səhifə')

  useEffect(() => {
    const checkSession = async () => {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        window.location.href = '/login'
      }
    }
    checkSession()
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#e0e0e0', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ width: '260px', background: '#111', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg viewBox="0 0 100 100" width="36" height="36"><circle cx="50" cy="50" r="50" fill="#2563eb"/><rect x="35" y="15" width="30" height="55" rx="5" fill="white"/><rect x="38" y="18" width="24" height="44" rx="3" fill="#2563eb"/><circle cx="50" cy="67" r="4" fill="white"/></svg>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>Best Mobile</span>
          </div>
        </div>
        <div style={{ padding: '16px 20px 8px' }}>
          <p style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px' }}>ƏSAS</p>
          {menuItems.map(item => (
            <div key={item.label} onClick={() => setActiveTab(item.label)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', borderRadius: '8px', marginBottom: '2px', cursor: 'pointer', background: activeTab === item.label ? '#1e3a5f' : 'transparent' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: activeTab === item.label ? '#60a5fa' : '#777' }}>
                {item.icon}
                <span style={{ fontSize: '14px', color: activeTab === item.label ? '#60a5fa' : '#aaa' }}>{item.label}</span>
              </div>
              {item.badge > 0 && <span style={{ background: '#2563eb', color: '#fff', fontSize: '11px', padding: '2px 7px', borderRadius: '10px' }}>{item.badge}</span>}
            </div>
          ))}
        </div>
        <div style={{ padding: '16px 20px 8px', borderTop: '1px solid #222', marginTop: '8px' }}>
          <p style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px' }}>ADMIN</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', cursor: 'pointer' }}>
            <svg width="18" height="18" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span style={{ fontSize: '14px', color: '#ef4444' }}>İdarəetmə</span>
          </div>
        </div>
        <div style={{ padding: '16px 20px 8px', borderTop: '1px solid #222' }}>
          <p style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', marginBottom: '8px' }}>ŞƏXSI</p>
          {[
            { label: 'Profil', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> },
            { label: 'Borc', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg> },
            { label: 'Dostlar', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3 3-5 7-5s7 2 7 5"/><path d="M16 3a3 3 0 010 6M22 20c0-3-2.5-5-6-5"/></svg> },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 12px', borderRadius: '8px', marginBottom: '2px', cursor: 'pointer', color: '#777' }}>
              {item.icon}
              <span style={{ fontSize: '14px', color: '#aaa' }}>{item.label}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', padding: '16px 20px', borderTop: '1px solid #222' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#777' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>
              <span style={{ fontSize: '13px', color: '#777' }}>Dil</span>
            </div>
            <span style={{ fontSize: '13px', color: '#aaa', background: '#1e1e1e', padding: '2px 10px', borderRadius: '6px' }}>AZ ▾</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', cursor: 'pointer', color: '#777' }}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            <span style={{ fontSize: '13px', color: '#aaa' }}>Parametrlər</span>
          </div>
          <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '9px 12px', borderRadius: '8px', background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
            <svg width="16" height="16" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            <span style={{ fontSize: '13px', color: '#ef4444' }}>Çıxış</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ background: '#111', borderBottom: '1px solid #222', padding: '10px 20px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div style={{ display: 'inline-flex', gap: '40px', animation: 'ticker 20s linear infinite' }}>
            <span style={{ fontSize: '13px', color: '#2563eb', fontWeight: '600' }}>● YENİ GƏLƏNLƏR</span>
            {[...newArrivals, ...newArrivals].map((item, i) => (
              <span key={i} style={{ fontSize: '13px', color: '#ffffff' }}>{item}</span>
            ))}
          </div>
          <style>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
        </div>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#fff', margin: 0 }}>Lent</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#1a1a1a', padding: '8px 14px', borderRadius: '10px', border: '1px solid #2a2a2a' }}>
            <svg width="16" height="16" fill="none" stroke="#777" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            <input placeholder="İstifadəçi axtar..." style={{ background: 'none', border: 'none', outline: 'none', color: '#aaa', fontSize: '14px', width: '180px' }} />
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#000' }}>OR</div>
              <input placeholder="Orxan, nə paylaşmaq istəyirsiniz?" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#777', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['🖼️ Şəkil', '🔗 Link', '📦 Məhsul'].map(btn => (
                  <button key={btn} style={{ background: '#1e1e1e', border: '1px solid #333', color: '#aaa', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>{btn}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer' }}>Ləğv et</button>
                <button style={{ background: '#2563eb', border: 'none', color: '#fff', padding: '7px 16px', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', fontWeight: '600' }}>Paylaş</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: '16px 24px', overflowY: 'auto' }}>
          <div style={{ background: '#141414', border: '1px solid #2a2a2a', borderRadius: '12px', padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', color: '#fff' }}>BM</div>
                <div>
                  <p style={{ margin: 0, fontWeight: '600', color: '#fff', fontSize: '14px' }}>Best Mobile</p>
                  <p style={{ margin: 0, color: '#555', fontSize: '12px' }}>2 saat əvvəl</p>
                </div>
              </div>
              <span style={{ background: '#1e3a5f', color: '#60a5fa', fontSize: '11px', padding: '3px 10px', borderRadius: '6px' }}>Rəsmi</span>
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>iPhone 15 Pro Max orijinal ekranları gəldi! Keyfiyyət zəmanəti ilə. Topdançılar üçün xüsusi qiymət mövcuddur.</p>
            <div style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: '10px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px' }}>
              <span style={{ color: '#444', fontSize: '14px' }}>🖼️ Məhsul şəkli burada olacaq</span>
            </div>
            <div style={{ display: 'flex', gap: '16px', marginTop: '14px' }}>
              <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>❤️ <span style={{ color: '#ef4444' }}>147</span></button>
              <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>💬 23 şərh</button>
              <button style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '13px' }}>↗️ Paylaş</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '260px', background: '#111', borderLeft: '1px solid #222', padding: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', background: '#1a1a1a', padding: '8px 12px', borderRadius: '8px' }}>
          <svg width="16" height="16" fill="none" stroke="#777" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <input placeholder="Stokda axtar..." style={{ background: 'none', border: 'none', outline: 'none', color: '#aaa', fontSize: '13px', flex: 1 }} />
        </div>
        <p style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', marginBottom: '10px' }}>STOK VƏZİYYƏTİ</p>
        {products.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: '#ddd' }}>{p.name}</p>
              <p style={{ margin: 0, fontSize: '11px', color: '#555' }}>{p.sub}</p>
            </div>
            <span style={{ fontSize: '12px', color: p.status === 'var' ? '#22c55e' : '#ef4444', fontWeight: '600' }}>{p.price}</span>
          </div>
        ))}
        <p style={{ fontSize: '11px', color: '#555', fontWeight: '600', letterSpacing: '1px', margin: '20px 0 10px' }}>İNDİ ONLAYN</p>
        {onlineUsers.map(user => (
          <div key={user} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'inline-block' }}></span>
            <span style={{ fontSize: '13px', color: '#aaa' }}>{user}</span>
          </div>
        ))}
      </div>
    </div>
  )
}