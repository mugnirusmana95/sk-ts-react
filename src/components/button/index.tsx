import type { ComponentProps } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"

type TButtonType = "danger" | "info" | "success" | "reset" | null

type ButtonProps = Omit<ComponentProps<'button'>, 'name'> & {
  isLoading?: Boolean
  buttonType?: TButtonType
  isWidthFull?: boolean
  label?: string
}

const Button = ({ label, isWidthFull = false, buttonType = "success", disabled, isLoading, ...props }: ButtonProps) => {
  const isDisabled = Boolean(disabled || isLoading)

  const getClassName = (buttonType: TButtonType, isWidthFull?: boolean) => {
    switch (buttonType) {
      case "danger":
        return `${isWidthFull ? 'w-full' : 'w-fit'} duration-300 gap-1 border outline-none border-red-500 bg-red-500 p-2 rounded cursor-pointer text-white min-w-16 flex items-center justify-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-red-500/70 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:shadow-none`
      case "info":
        return `${isWidthFull ? 'w-full' : 'w-fit'} duration-300 gap-1 border outline-none border-info-500 bg-info-500 p-2 rounded cursor-pointer text-white min-w-16 flex items-center justify-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-info-500/70 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:shadow-none`
      case "success":
        return `${isWidthFull ? 'w-full' : 'w-fit'} duration-300 gap-1 border outline-none border-green-500 bg-green-500 p-2 rounded cursor-pointer text-white min-w-16 flex items-center justify-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-green-500/70 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:shadow-none`
      case "reset":
        return `${isWidthFull ? 'w-full' : 'w-fit'} duration-300 gap-1 border outline-none border-gray-500 bg-gray-500 p-2 rounded cursor-pointer text-white min-w-16 flex items-center justify-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-gray-500/70 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:shadow-none`
      default:
        return `${isWidthFull ? 'w-full' : 'w-fit'} duration-300 gap-1 border outline-none border-gray-500 bg-gray-500 p-2 rounded cursor-pointer text-white min-w-16 flex items-center justify-center hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)] hover:border-gray-500/70 disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:shadow-none`
    }
  }

  return (
    <button
      className={`${getClassName(buttonType, isWidthFull)}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading && <AiOutlineLoading3Quarters className="animate-spin" />}
      {label}
    </button>
  )
}

export default Button