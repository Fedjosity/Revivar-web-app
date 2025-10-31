/**
 * ImageCard Component
 * Displays a single Unsplash image with hover effects and click handling
 */

import { motion } from "framer-motion";
import type { UnsplashImage } from "@/types/unsplash";

interface ImageCardProps {
  image: UnsplashImage;
  onClick: (image: UnsplashImage) => void;
  index: number;
}

export const ImageCard = ({ image, onClick, index }: ImageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="group relative cursor-pointer overflow-hidden rounded-lg bg-card shadow-xl transition-shadow hover:shadow-2xl"
      onClick={() => onClick(image)}
    >
      {/* Image */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image.urls.regular}
          alt={image.alt_description || "Unsplash image"}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay with photographer info */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300"
      >
        <p className="text-sm font-medium text-white">
          Photo by {image.user.name}
        </p>
        <p className="text-xs text-neutral-300">Click to customize</p>
      </motion.div>

      {/* Selection indicator */}
      <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
        Select
      </div>
    </motion.div>
  );
};
