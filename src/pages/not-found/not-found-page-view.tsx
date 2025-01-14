import { Button } from '@design-system/components/button/button'
import { motion } from 'framer-motion'

export interface NotFoundPageProps {
  onGoHomeClick: () => void
}

const MotionButton = motion(Button)

export const NotFoundPageView = ({ onGoHomeClick }: NotFoundPageProps) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='text-center'
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className='text-sm uppercase tracking-wider text-slate-500 mb-2'
        >
          404 Error
        </motion.p>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className='text-6xl font-light text-slate-900 mb-8'
        >
          Page Not Found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='text-slate-600 mb-12 max-w-md mx-auto'
        >
          We couldn't find the page you're looking for. It might have been
          removed, renamed, or doesn't exist.
        </motion.p>

        <MotionButton
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onGoHomeClick}
        >
          Return Home
        </MotionButton>
      </motion.div>
    </div>
  )
}
