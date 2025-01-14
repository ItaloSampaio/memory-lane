import { Button } from '@design-system/components/button/button'
import { FormField } from '@design-system/components/form-field/form-field'
import { Paper } from '@design-system/components/paper/paper'
import CubeTransparentIcon from '@heroicons/react/20/solid/CubeTransparentIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const memoryLaneSchema = z.object({
  title: z.string().nonempty({ message: 'Required' }),
  description: z.string().nonempty({ message: 'Required' }),
})

export type MemoryLaneFormValues = z.infer<typeof memoryLaneSchema>

type WelcomePageViewProps = {
  submitting: boolean
  onSubmit: (values: MemoryLaneFormValues) => void
}

export const WelcomePageView = ({
  submitting,
  onSubmit,
}: WelcomePageViewProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoryLaneFormValues>({
    resolver: zodResolver(memoryLaneSchema),
  })

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-5xl font-bold mb-6'>Welcome!</h1>
      <p className='text-2xl mb-10 text-slate-500'>
        Let's create your memory lane
      </p>

      <Paper className='px-8 pt-6 pb-8 w-full max-w-md'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label='Title'
            {...register('title')}
            error={errors.title?.message}
            className='mb-4'
          />
          <FormField
            as='textarea'
            label='Description'
            {...register('description')}
            error={errors.description?.message}
            className='mb-6'
          />
          <Button type='submit' className='w-full' disabled={submitting}>
            {submitting ? (
              <div className='flex w-full justify-center gap-2'>
                <CubeTransparentIcon className='animate-spin' />
                Creating...
              </div>
            ) : (
              'Create'
            )}
          </Button>
        </form>
      </Paper>
    </div>
  )
}
