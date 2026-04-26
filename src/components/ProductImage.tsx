"use client"

import { useState } from "react"

export default function ProductImage({ src }: { src: string }) {
  const [zoom, setZoom] = useState(false)

  return (
    <div>
      {/* маленьке фото */}
      <img
        src={src}
        onClick={() => setZoom(true)}
        className="w-full rounded-lg shadow-md cursor-zoom-in"
      />

      {/* zoom */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        >
          <img
            src={src}
            className="max-w-3xl max-h-[90%] rounded-lg"
          />
        </div>
      )}
    </div>
  )
}