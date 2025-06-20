import styles from "./CardTitle.module.scss"

export function CardTitle({ children, className, ...rest }) {
  return (
    <h1 className={`${styles.title} ${className ?? ""}`} {...rest}>
      {children}
    </h1>
  )
}
