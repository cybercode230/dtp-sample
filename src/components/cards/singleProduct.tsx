import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";

interface Product {
  name: string;
  images: string[];
  price: number;
  discount?: number;
  quantity?: number;
}

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  const nextImage = () =>
    setImgIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setImgIndex((prev) => (prev - 1 + product.images.length) % product.images.length);

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg p-3 min-w-[180px] flex-shrink-0 flex flex-col items-center"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-full">
        <motion.img
          src={product.images[imgIndex]}
          alt={product.name}
          className="w-full h-32 sm:h-36 object-contain rounded-2xl"
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />

        {product.images.length > 1 && hovered && (
          <>
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
              onClick={prevImage}
            >
              <Icons.ChevronLeft className="w-5 h-5 text-green-700" />
            </button>
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-100 transition"
              onClick={nextImage}
            >
              <Icons.ChevronRight className="w-5 h-5 text-green-700" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {product.images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-2 h-2 rounded-full ${idx === imgIndex ? "bg-green-700" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <h3 className="mt-2 font-semibold text-sm text-gray-800 text-center">{product.name}</h3>

      <div className="flex items-center justify-center gap-2 mt-1">
        <span className="font-bold text-green-700">RWF {product.price}</span>
        {product.discount && <span className="text-red-500 text-xs line-through">{product.discount}</span>}
      </div>

      <div className="mt-2 w-full">
        {hovered ? (
          <button className="w-full py-2 bg-[#2e2e2e] text-white font-semibold rounded-lg transition hover:brightness-110">
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <button className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition">-</button>
            <span className="px-2">{product.quantity || 1}</span>
            <button className="p-1 bg-gray-200 rounded hover:bg-gray-300 transition">+</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
