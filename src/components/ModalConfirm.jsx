import { useState } from 'react'
import Modal from '/src/components/Modal'
import { Button } from './Base/Button'

export default function ModalSuccess({ showModal, title = '', desc = '', submitText = 'Confirm', cancelText = 'Close', handleChange, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false)
  const onClose = () => {
    handleChange(false)
  }

  const footer = (
    <div className="flex gap-4">
      <Button
        onClick={onClose}
        variant="secondary"
        rounded
      >
        {cancelText}
      </Button>
      <Button
        onClick={() => onSubmit({ done: () => setIsLoading(false) })}
        isDisabled={isLoading}
        rounded
      >
        {submitText}
      </Button>
    </div>
  )

  const modal = (
    <Modal onClose={onClose} footer={footer}>
      <div className="flex flex-col items-start gap-4 text-wrap break-words">
        <h1 className="text-3xl font-semibold">
          {title}
        </h1>
        <p>
          {desc}
        </p>
      </div>
    </Modal>
  )

  return (
    <>
      {showModal && modal}
    </>
  )

}