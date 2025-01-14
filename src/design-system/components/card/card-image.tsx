import { useRotatingItems } from '@design-system/hooks/use-rotating-items'
import { motion } from 'framer-motion'

export interface CardImageProps {
  src: string | string[]
  alt?: string
}

export const CardImage = ({ src, alt }: CardImageProps) => {
  const currentSrc = useRotatingItems([src].flat())

  return (
    <div className='w-20 h-20 rounded-full border border-gray-200 flex-shrink-0 overflow-hidden relative'>
      <motion.img
        key={currentSrc}
        src={currentSrc}
        alt={alt}
        className='absolute top-0 left-0 w-full h-full object-cover'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
    </div>
  )
}
