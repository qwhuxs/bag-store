"use client"

import { useState } from "react"
import Image from "next/image" 

export default function ProductImage({ src }: { src: string }) {
  const [zoom, setZoom] = useState(false)

  return (
    <div>
      {/* маленьке фото */}
      <Image
        src={src}
        alt="product"
        width={500}
        height={500}
        className="w-full rounded-lg shadow-md cursor-zoom-in"
        onClick={() => setZoom(true)}
      />

      {/* zoom */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <Image
            src={src}
            alt="product"
            width={800}
            height={800}
            className="max-w-3xl max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  )
}