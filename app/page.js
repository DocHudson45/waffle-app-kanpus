"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Home() {
  const [user, setUser] = useState(null)
  const [menu, setMenu] = useState([])
  const [keranjang, setKeranjang] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push("/login")
        return
      }
      setUser(session.user)

      const { data } = await supabase.from("menu").select("*")
      setMenu(data)
    }
    init()
  }, [])

  function tambahKeranjang(item) {
    setKeranjang(prev => {
      const ada = prev.find(k => k.id === item.id)
      if (ada) {
        return prev.map(k => k.id === item.id ? { ...k, qty: k.qty + 1 } : k)
      }
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const total = keranjang.reduce((sum, k) => sum + k.harga * k.qty, 0)

  if (!user) return <p>Loading...</p>

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Waffle App 🧇</h1>
        <button onClick={async () => { await supabase.auth.signOut(); router.push("/login") }}>
          Logout
        </button>
      </div>

      <h2>Menu</h2>
      {menu.map(item => (
        <div key={item.id} style={{ border: "1px solid #333", borderRadius: "8px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ margin: 0 }}>{item.nama}</h3>
              <p style={{ margin: "4px 0", color: "#aaa" }}>{item.deskripsi}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Rp {item.harga.toLocaleString()}</p>
              <button onClick={() => tambahKeranjang(item)} style={{ marginTop: "8px" }}>
                + Tambah
              </button>
            </div>
          </div>
        </div>
      ))}

      {keranjang.length > 0 && (
        <div style={{ border: "1px solid #555", borderRadius: "8px", padding: "16px", marginTop: "20px" }}>
          <h2>Keranjang 🛒</h2>
          {keranjang.map(k => (
            <div key={k.id} style={{ display: "flex", justifyContent: "space-between" }}>
              <span>{k.nama} x{k.qty}</span>
              <span>Rp {(k.harga * k.qty).toLocaleString()}</span>
            </div>
          ))}
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
            <span>Total</span>
            <span>Rp {total.toLocaleString()}</span>
          </div>
          <button style={{ width: "100%", marginTop: "12px", padding: "10px" }}>
            Bayar
          </button>
        </div>
      )}
    </div>
  )
}