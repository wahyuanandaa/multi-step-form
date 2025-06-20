import { useId } from "react"
import styles from "./SelectionToggle.module.scss"

export function SelectionToggle({
  className = "",
  leftLabel,
  rightLabel,
  toggled,
  onToggle
}) {
  const id = "sel-toggle-" + useId()
  return (
    <div className={`${styles.container} ${className}`}>
      <input
        id={id}
        type="checkbox"
        checked={toggled}
        onChange={onToggle}
        className={styles.toggleCheck}
      />
      <label
        htmlFor={id}
        data-left-label={leftLabel}
        data-right-label={rightLabel}
        className={styles.toggle}
      >
        <span className="sr-only">{rightLabel}</span>
        <span className={styles.toggleHandle}></span>
      </label>
    </div>
  )
}
