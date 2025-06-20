import styles from "./Card.module.scss"
import { CardDescription } from "./CardDescription"
import { CardTitle } from "./CardTitle"

export function Card({ children, className, ...rest }) {
  return (
    <div className={`${styles.container} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  )
}

Card.Title = CardTitle
Card.Description = CardDescription
