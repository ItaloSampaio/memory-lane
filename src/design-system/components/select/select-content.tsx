import { AnimatePresence, motion } from 'motion/react'
import { ReactNode, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSelect } from './use-select'
import { cn } from '@utils/tailwind-utils'
import { useViewportSize } from '@design-system/hooks/use-viewport-size'

export type SelectContentAnchor = 'left' | 'right'

export interface SelectContentProps {
  className?: string
  anchor?: SelectContentAnchor
  children: ReactNode
}

export const SelectContent = ({
  className,
  anchor = 'left',
  children,
}: SelectContentProps) => {
  const { open, value, triggerRef } = useSelect()
  const viewportSize = useViewportSize()
  const containerRef = useRef<HTMLDivElement>(null)
  const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  useLayoutEffect(() => {
    const rect = triggerRef.current?.getBoundingClientRect()
    if (rect) {
      setTriggerRect(rect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerRef.current, value, viewportSize])

  useLayoutEffect(() => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      setContainerRect(rect)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current])

  const position = {
    top: triggerRect?.bottom ?? 0,
    left: triggerRect?.left ?? 0,
    right:
      (triggerRect?.left ?? 0) +
      Math.abs((triggerRect?.width ?? 0) - (containerRect?.width ?? 0)),
  }

  return createPortal(
    <AnimatePresence>
      {!open ? undefined : (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.1, ease: 'linear' },
          }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            'absolute mt-2 p-1 max-h-60 overflow-scroll min-w-max bg-white rounded-lg shadow-lg',
            className
          )}
          style={{
            width: triggerRect?.width,
            top: position.top,
            left: {
              left: position.left,
              right: position.right,
            }[anchor],
          }}
        >
          <ul className='space-y-0.5'>{children}</ul>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}
