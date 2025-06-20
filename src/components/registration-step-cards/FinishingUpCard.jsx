import { planAddons } from "../../config"
import { Card } from "../multi-step/card/Card"
import styles from "./FinishingUpCard.module.scss"

export default function FinishingUpCard({
  plan,
  addons,
  priceType,
  onChangePlanClick
}) {
  const isMonthly = priceType === "monthly"
  const total = calcTotal(plan, addons, priceType)
  const selectedAddons = planAddons.filter((addon) => addons.has(addon))

  return (
    <Card>
      <Card.Title>Finishing up</Card.Title>
      <Card.Description>
        Double-check everything looks OK before confirming.
      </Card.Description>
      <div className={styles.cardContent}>
        <div className={styles.summary}>
          <div className={styles.planSummary}>
            <p className={styles.name}>
              {`${plan.name} (${isMonthly ? "Monthly" : "Yearly"})`}
            </p>
            <button className={styles.changeBtn} onClick={onChangePlanClick}>
              Change
            </button>
            <p className={styles.price}>
              {getPriceMessage(plan.monthlyPrice, plan.yearlyPrice, priceType)}
            </p>
          </div>
          {selectedAddons.length > 0 && (
            <div className={styles.addonList}>
              {selectedAddons.map((addon) => (
                <p key={addon.id} className={styles.addon}>
                  <span className={styles.name}>{addon.name}</span>
                  <span className={styles.price}>
                    {"+" +
                      getPriceMessage(
                        addon.monthlyPrice,
                        addon.yearlyPrice,
                        priceType
                      )}
                  </span>
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.total}>
        <p className={styles.label}>
          {`Total (per ${isMonthly ? "month" : "year"})`}
        </p>
        <p className={styles.price}>{`$${total}/${isMonthly ? "mo" : "yr"}`}</p>
      </div>
    </Card>
  )
}

function getPriceMessage(monthlyPrice, yearlyPrice, priceType) {
  if (priceType === "monthly") {
    return `$${monthlyPrice}/mo`
  }
  return `$${yearlyPrice}/yr`
}

function calcTotal(plan, addons, priceType) {
  let total = 0
  if (priceType === "monthly") {
    total += plan.monthlyPrice
    addons.forEach((addon) => (total += addon.monthlyPrice))
  } else {
    total += plan.yearlyPrice
    addons.forEach((addon) => (total += addon.yearlyPrice))
  }
  return total
}
