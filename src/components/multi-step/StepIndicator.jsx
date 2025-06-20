import styles from "./StepIndicator.module.scss"

export function StepIndicator({ steps, currentStep }) {
  return (
    <ul className={styles.container}>
      {steps.map((step) => (
        <li key={step.id} className={styles.step}>
          <div
            className={`text-body-md ${styles.stepNumber} ${
              step.id === currentStep ? styles.active : ""
            }`}
          >
            {step.id}
          </div>
          <p className={`text-body-sm ${styles.stepId}`}>STEP {step.id}</p>
          <p className={`text-body-md ${styles.stepName}`}>{step.name}</p>
        </li>
      ))}
    </ul>
  )
}
