import { createPortal } from 'react-dom'
import OutsideClickHandler from 'react-outside-click-handler'

export default function Modal({
  onClose,
  children,
  footer
}) {
  const handleOutside = e => {
    onClose()
  }
  return createPortal(
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-cemter sm:item-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl tansition-all sm:my-8 sm:w-full sm:max-w-lg">
            <OutsideClickHandler
              onOutsideClick={handleOutside}
            >
              <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
                {children}
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                {footer}
              </div>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
