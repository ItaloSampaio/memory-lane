import { Button } from '@design-system/components/button/button'
import { Overlay } from '@design-system/components/overlay/overlay'
import { Paper } from '@design-system/components/paper/paper'
import { sleep } from '@utils/promise-utils'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const baseURL = window.location.origin

export interface ShareLinkModalProps {
  onCloseClick: () => void
}

export const ShareLinkModal = ({ onCloseClick }: ShareLinkModalProps) => {
  const { laneId } = useParams<{ laneId: string }>()
  const [isCopyFeedbackVisible, setIsCopyFeedbackVisible] = useState(false)
  const shareableURL = `${baseURL}/share/${laneId ?? 'unknown'}`

  const copyShareableURLToClipboard = async () => {
    await navigator.clipboard.writeText(shareableURL)

    setIsCopyFeedbackVisible(true)
    await sleep(1000) // Show "Copied!" for some time
    setIsCopyFeedbackVisible(false)
  }

  return (
    <Overlay>
      <div className='flex justify-center items-center w-full h-full'>
        <Paper className='px-8 pt-6 pb-8 w-full max-w-md'>
          <h2 className='text-lg font-semibold mb-4'>Share this Memory Lane</h2>
          <p className='mb-4'>Copy the link below and share it with others:</p>
          <div className='flex items-center border rounded p-2 mb-4'>
            <input
              type='text'
              value={shareableURL}
              readOnly
              className='flex-grow bg-transparent outline-none text-slate-700'
            />
            <Button
              disabled={isCopyFeedbackVisible}
              variant='text'
              onClick={copyShareableURLToClipboard}
            >
              {isCopyFeedbackVisible ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <Button className='w-full' onClick={onCloseClick}>
            Close
          </Button>
        </Paper>
      </div>
    </Overlay>
  )
}
