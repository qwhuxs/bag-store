"use client"

export default function AddToCartButton({ productId }: { productId: string }) {
  return (
    <button
      onClick={async () => {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        })

        const data = await res.json()
        console.log(data)

        alert("Додано в кошик ✅")
      }}
      className="bg-[#3F5F56] text-white px-6 py-2 rounded-md hover:opacity-90 transition"
    >
      Додати в кошик
    </button>
  )
}