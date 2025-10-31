/**
 * LoadingSkeleton Component
 * Displays skeleton loading states for image gallery
 */

import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton = ({ count = 4 }: LoadingSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Skeleton className="aspect-[4/5] w-full rounded-lg bg-muted" />
        </motion.div>
      ))}
    </div>
  );
};
