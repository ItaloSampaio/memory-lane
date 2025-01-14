import { Button } from '@design-system/components/button/button'
import { FormField } from '@design-system/components/form-field/form-field'
import { Overlay } from '@design-system/components/overlay/overlay'
import { Paper } from '@design-system/components/paper/paper'
import CubeTransparentIcon from '@heroicons/react/20/solid/CubeTransparentIcon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { ImageDropzone } from './components/image-dropzone'
import { ImagePreview } from './components/image-preview'

const memorySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  timestamp: z.string(),
  description: z.string(),
  images: z.array(z.instanceof(File)).min(1, 'At least one image is required'),
})

export type MemoryFormValues = z.infer<typeof memorySchema>

export interface CreateMemoryPageViewProps {
  submitting: boolean
  onSubmit: (data: MemoryFormValues) => void
  onCancelClick: () => void
}

export const CreateMemoryPageView = ({
  submitting,
  onSubmit,
  onCancelClick,
}: CreateMemoryPageViewProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemoryFormValues>({
    resolver: zodResolver(memorySchema),
    defaultValues: {
      title: '',
      timestamp: undefined,
      description: '',
      images: [],
    },
  })

  const images = watch('images') as File[]

  const handleDropImage = useCallback(
    (acceptedFiles: File[]) => {
      const uniqueImages = [
        ...images,
        ...acceptedFiles.filter(
          (file) =>
            !images.some((existingImage) => existingImage.name === file.name)
        ),
      ]
      setValue('images', uniqueImages)
    },
    [images, setValue]
  )

  const handleRemoveImage = useCallback(
    (imageIndex: number) => {
      const imagesToUpload = images.filter((_, index) => index !== imageIndex)
      setValue('images', imagesToUpload)
    },
    [images, setValue]
  )

  return (
    <Overlay>
      <div className='flex justify-center items-center w-full h-full'>
        <Paper className='px-8 pt-6 pb-8 w-full max-w-md max-h-screen overflow-y-auto'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              label='Title'
              {...register('title')}
              error={errors.title?.message}
              className='mb-4'
            />
            <FormField
              label='Date'
              type='datetime-local'
              {...register('timestamp')}
              error={errors.timestamp?.message}
              className='mb-4'
            />
            <FormField
              as='textarea'
              label='Description'
              {...register('description')}
              error={errors.description?.message}
              className='mb-4'
            />
            <ImageDropzone
              message='Drag and drop images here, or click to select'
              className='mb-6'
              onDrop={handleDropImage}
            />
            {Boolean(images.length) && (
              <div className='flex w-full space-x-4 pb-4 mb-4 overflow-x-scroll'>
                {images.map((image, index) => (
                  <ImagePreview
                    key={image.name}
                    src={image}
                    name={image.name}
                    onRemoveClick={(event: React.SyntheticEvent) => {
                      event.preventDefault()
                      handleRemoveImage(index)
                    }}
                  />
                ))}
              </div>
            )}
            <div className='flex justify-end space-x-3'>
              <Button
                size='md'
                variant='outlined'
                disabled={submitting}
                onClick={(event) => {
                  event.preventDefault()
                  onCancelClick()
                }}
              >
                Cancel
              </Button>
              <Button type='submit' disabled={submitting}>
                {submitting ? (
                  <div className='flex w-full justify-center gap-2'>
                    <CubeTransparentIcon className='animate-spin' />
                    Creating...
                  </div>
                ) : (
                  'Create Memory'
                )}
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    </Overlay>
  )
}
