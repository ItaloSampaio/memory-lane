import { useDropzone } from 'react-dropzone'

export interface ImageDropzoneProps {
  message: string
  className?: string
  onDrop: (acceptedFiles: File[]) => void
}

export const ImageDropzone = ({
  message,
  className,
  onDrop,
}: ImageDropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  return (
    <div className={className}>
      <div
        {...getRootProps()}
        className='border-dashed border-2 border-slate-400 px-4 py-14 rounded-lg cursor-pointer text-center'
      >
        <input {...getInputProps()} />
        <p className='text-slate-500'>{message}</p>
      </div>
    </div>
  )
}
