import { Button } from '@design-system/components/button/button'
import ChevronLeftIcon from '@heroicons/react/20/solid/ChevronLeftIcon'
import { cn } from '@utils/tailwind-utils'
import { useKeenSlider } from 'keen-slider/react'
import { useState } from 'react'

interface ImageSliderProps {
  srcs: string[]
}

export const ImageSlider = ({ srcs }: ImageSliderProps) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    initial: 0,
    slides: { perView: 1 },
    slideChanged: (slider) => setSlideIndex(slider.track.details.rel),
    created: () => setLoaded(true),
  })

  return (
    <div className='lg:w-3/5 max-h-3/5 lg:h-full flex flex-col bg-slate-50'>
      <div className='relative overflow-hidden grow'>
        <div ref={sliderRef} className='keen-slider h-full'>
          {srcs.map((src, index) => (
            <div key={index} className='keen-slider__slide'>
              <img src={src} className='w-full h-full object-cover' />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Button
              variant='text'
              size='iconMd'
              className='absolute top-1/2 -translate-y-1/2 left-2'
              onClick={() => instanceRef.current?.prev()}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              variant='text'
              size='iconMd'
              className='absolute top-1/2 -translate-y-1/2 right-2 rotate-180'
              onClick={() => instanceRef.current?.next()}
            >
              <ChevronLeftIcon />
            </Button>
          </>
        )}
      </div>
      {loaded && instanceRef.current && (
        <div className='flex justify-center px-2 py-2 gap-2 bg-white'>
          {Array.from({ length: srcs.length }).map((_, index) => {
            return (
              <button
                key={index}
                className={cn(
                  'size-2 rounded-full bg-slate-400',
                  slideIndex === index && 'bg-slate-700'
                )}
                onClick={() => instanceRef.current?.moveToIdx(index)}
              ></button>
            )
          })}
        </div>
      )}
    </div>
  )
}
