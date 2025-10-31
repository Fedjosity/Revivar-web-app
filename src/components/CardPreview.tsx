/**
 * CardPreview Component
 * Displays a live preview of the customized thank you card
 * Rendered with 4:5 aspect ratio for download
 */

import { motion } from "framer-motion";
import type { CardCustomization } from "@/types/unsplash";

interface CardPreviewProps {
  customization: CardCustomization;
}

// Font family mapping for CSS
const fontFamilyMap = {
  serif: "font-serif",
  sans: "font-sans",
  cursive: "font-[cursive]",
  mono: "font-mono",
};

export const CardPreview = ({ customization }: CardPreviewProps) => {
  const { imageUrl, userName, fontFamily, fontColor } = customization;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-md"
    >
      {/* Card container with 4:5 aspect ratio */}
      <div
        id="thank-you-card"
        className="relative aspect-[4/5] w-full overflow-hidden rounded-lg shadow-2xl"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-between p-8">
          {/* "Thank You" text at top */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${
              fontFamilyMap[fontFamily as keyof typeof fontFamilyMap]
            } text-4xl font-bold tracking-tight md:text-6xl`}
            style={{ color: fontColor }}
          >
            Thank You
          </motion.h1>

          {/* User name at bottom */}
          {userName && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`${
                fontFamilyMap[fontFamily as keyof typeof fontFamilyMap]
              } text-2xl font-medium tracking-wide md:text-3xl`}
              style={{ color: fontColor }}
            >
              {userName}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
