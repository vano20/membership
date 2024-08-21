import { useState } from 'react'
import Modal from '/src/components/Modal'

export default function ModalSuccess({ showModal, title = '', desc = '', submitText = 'Confirm', cancelText = 'Close', handleChange, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false)
  const onClose = () => {
    handleChange(false)
  }

  const footer = (
    <div className="flex gap-4">
      <button
        onClick={onClose}
        className="py-1 px-3 text-slate rounded-lg active:bg-slate-500/50 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-slate-500/10 hover:text-slate-500 disabled:bg-blue-500/20 disabled:text-slate-400"
      >
        {cancelText}
      </button>
      <button
        onClick={() => onSubmit({ done: () => setIsLoading(false) })}
        className="py-1 px-3 text-white rounded-lg active:bg-blue-500/50 bg-blue-500 shadow-md shadow-slate-500/30 focus:outline-none focus:ring-0 focus:border-blue-500 focus:shadow-lg focus:shadow-slate-500/30 hover:bg-blue-500/20 hover:text-blue-500 disabled:bg-blue-500/20 disabled:text-slate-400"
        disabled={isLoading}
      >
        {submitText}
      </button>
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