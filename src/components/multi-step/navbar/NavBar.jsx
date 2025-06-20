import styles from "./NavBar.module.scss"

export function NavBar({
  steps,
  currentStep,
  isAtPersonalInfoStep,
  personalInfoFormId,
  onBackButtonClick,
  onNextStepButtonClick,
  onConfirmButtonClick
}) {
  return (
    <div className={styles.container}>
      {currentStep > 0 && (
        <button className={styles.goBackButton} onClick={onBackButtonClick}>
          Go Back
        </button>
      )}
      {currentStep < steps - 1 && !isAtPersonalInfoStep && (
        <button
          className={styles.nextStepButton}
          onClick={onNextStepButtonClick}
        >
          Next Step
        </button>
      )}
      {currentStep < steps - 1 && isAtPersonalInfoStep && (
        <button
          className={styles.nextStepButton}
          form={personalInfoFormId}
          type="submit"
        >
          Next Step
        </button>
      )}
      {currentStep === steps - 1 && (
        <button className={styles.confirmButton} onClick={onConfirmButtonClick}>
          Confirm
        </button>
      )}
    </div>
  )
}
