"use client"

import { useRouter } from "next/navigation"

export default function ConfirmButton({ id }: { id: string }) {
  const router = useRouter()

  const confirmOrder = async () => {
    await fetch("/api/admin/order", {
      method: "PUT",
      body: JSON.stringify({ id }),
    })

    router.refresh()
  }

  return (
    <button
      onClick={confirmOrder}
      className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
    >
      Підтвердити
    </button>
  )
}