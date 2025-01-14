import { formatDateToUSLocale } from '@utils/date-utils'

export interface MemoryDetailsProps {
  title: string
  timestamp: Date
  description: string
}

export const MemoryDetails = ({
  title,
  timestamp,
  description,
}: MemoryDetailsProps) => {
  return (
    <div className='w-full lg:w-2/5 p-6 flex flex-col justify-start space-y-4 lg:relative'>
      <div className='text-sm text-slate-500'>
        {formatDateToUSLocale(timestamp)}
      </div>
      <div className='text-2xl font-semibold text-slate-800'>{title}</div>
      <p className='text-base text-slate-700 leading-relaxed lg:overflow-y-scroll lg:pr-3 lg:pb-6'>
        {description}
      </p>
      <div className='hidden lg:block absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white via-slate-50 to-transparent pointer-events-none'></div>
    </div>
  )
}
