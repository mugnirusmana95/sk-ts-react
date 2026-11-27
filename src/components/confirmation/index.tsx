
import { createPortal } from 'react-dom'
import { GoAlert } from "react-icons/go"

import Button from '~/components/button'

type TConfirmation = {
  open: boolean
  title: string
  message: string
  isLoading?: boolean
  onClose?: () => void
  onConfirm?: () => void
}

const Confirmation = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  isLoading
}: TConfirmation) => {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center backdrop-blur">
      <div
        className="absolute inset-0 bg-black/50 animate-backdrop-in"
        onClick={onClose}
      />

      <div
        className="relative z-10 animate-modal-in flex flex-col gap-5 p-5 w-80 md:w-100 bg-white rounded duration-300 items-center justify-center"
      >
        <div><GoAlert size={40} className="text-red-500" /></div>
        <span className="font-bold">
          {title}
        </span>

        <span>
          {message}
        </span>

        <div className="w-full flex flex-row gap-4 items-center justify-center">
          <Button
            label="Ya"
            isLoading={isLoading}
            disabled={isLoading}
            buttonType="danger"
            onClick={onConfirm}
          />

          <Button
            label="Tidak"
            isLoading={isLoading}
            disabled={isLoading}
            buttonType="reset"
            onClick={onClose}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Confirmation
