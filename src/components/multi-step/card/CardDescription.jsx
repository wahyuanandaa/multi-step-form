import styles from "./CardDescription.module.scss"

export function CardDescription({ className, children, ...rest }) {
  return (
    <p
      className={`text-body-lg ${styles.description} ${className ?? ""}`}
      {...rest}
    >
      {children}
    </p>
  )
}
