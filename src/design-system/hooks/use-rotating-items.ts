import { useState, useEffect } from 'react'

export const useRotatingItems = <T>(
  items: T[],
  intervalTime: number = 5000
) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (items.length > 1) {
      const intervalId = setInterval(() => {
        setIndex((current) => (current + 1) % items.length)
      }, intervalTime)

      return () => clearInterval(intervalId)
    }
  }, [items, intervalTime])

  return items[index]
}
