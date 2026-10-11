import { useState, forwardRef, InputHTMLAttributes } from 'react'
import { Input } from '../ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { EyeClosedIcon, EyeIcon } from '@hugeicons/core-free-icons'

// 1. Standard Input props ke sath apna custom 'buttonClassName' add karein
export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  buttonClassName?: string
}

// 2. forwardRef ko batayein ki Ref 'HTMLInputElement' ka hai aur Props 'PasswordInputProps' hain
const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, buttonClassName, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative w-full">
        <Input
          {...props}
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          className={`pr-10 ${className || ''}`} // pr-10 taaki text icon ke peeche na chhup jaye
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          // Sirf positioning classes yahan rakhi hain, colors parent se de sakte hain
          className={`absolute top-1/2 right-3 -translate-y-1/2 transition-colors focus:outline-none ${buttonClassName || ''}`}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <HugeiconsIcon icon={EyeIcon} size={20} />
          ) : (
            <HugeiconsIcon icon={EyeClosedIcon} size={20} />
          )}
        </button>
      </div>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export default PasswordInput
