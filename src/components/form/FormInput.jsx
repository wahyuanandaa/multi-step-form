import { forwardRef, useId } from "react"
import styles from "./FormInput.module.scss"

export const FormInput = forwardRef(function FormInput(props, ref) {
  const { label, value, onChange, error, ...inputProps } = props
  const id = "formInput-" + useId()

  return (
    <div className={styles.container}>
      <div className={styles.labelContainer}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {error && (
          <p className={styles.errorMessage} aria-live="polite">
            {error}
          </p>
        )}
      </div>
      <input
        id={id}
        type="text"
        ref={ref}
        className={`${styles.input} ${error ? styles.error : ""}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...inputProps}
      />
    </div>
  )
})
