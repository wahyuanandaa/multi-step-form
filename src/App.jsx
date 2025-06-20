import {
  lazy,
  Suspense,
  useId,
  useReducer,
  useState,
  useTransition
} from "react"
import styles from "./App.module.scss"
import { plans, planAddons } from "./config"
import { Card } from "./components/multi-step/card/Card"
import { StepIndicator } from "./components/multi-step/StepIndicator"
import { NavBar } from "./components/multi-step/navbar/NavBar"
import PersonalInfoCard from "./components/registration-step-cards/PersonalInfoCard"

const AddonsCard = lazy(() =>
  import("./components/registration-step-cards/AddonsCard")
)
const FinishingUpCard = lazy(() =>
  import("./components/registration-step-cards/FinishingUpCard")
)
const PlanCard = lazy(() =>
  import("./components/registration-step-cards/PlanCard")
)
const ThankYouCard = lazy(() =>
  import("./components/registration-step-cards/ThankYouCard")
)

const steps = [
  { id: "1", name: "Your info" },
  { id: "2", name: "Select plan" },
  { id: "3", name: "Add-ons" },
  { id: "4", name: "Summary" }
]

const initialState = {
  name: "",
  email: "",
  phoneNumber: "",
  personalInfoCardKey: 1,
  plan: plans[0],
  priceType: "monthly",
  addons: new Set()
}

function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO":
      return {
        ...state,
        name: action.name,
        email: action.email,
        phoneNumber: action.phoneNumber,
        personalInfoCardKey: state.personalInfoCardKey + 1
      }
    case "UPDATE_PLAN":
      return {
        ...state,
        plan: action.plan
      }
    case "TOGGLE_PRICE_TYPE":
      return {
        ...state,
        priceType: state.priceType === "monthly" ? "yearly" : "monthly"
      }
    case "TOGGLE_PLAN_ADDON": {
      const updatedAddons = new Set(state.addons)
      if (updatedAddons.has(action.addon)) {
        updatedAddons.delete(action.addon)
      } else {
        updatedAddons.add(action.addon)
      }
      return {
        ...state,
        addons: updatedAddons
      }
    }
    default:
      return state
  }
}

function App() {
  const [step, setStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [state, dispatch] = useReducer(reducer, initialState)
  const personalInfoFormId = "form-" + useId()
  const [, startTransition] = useTransition()

  const goToNextStep = () => {
    startTransition(() => setStep((step) => step + 1))
  }
  const goToPrevStep = () => {
    startTransition(() => setStep((step) => step - 1))
  }
  const goToPlanStep = () => {
    startTransition(() => setStep(1))
  }
  const finish = () => {
    startTransition(() => setIsComplete(true))
  }

  return (
    <main className={styles.main}>
      <StepIndicator steps={steps} currentStep={steps[step].id} />
      <Suspense fallback=" ">
        <div className={styles.content}>
          {!isComplete ? (
            <>
              <div className={styles.cardWrapper}>
                {step === 0 && (
                  <PersonalInfoCard
                    key={`personal-info-card-${state.personalInfoCardKey}`}
                    initialName={state.name}
                    initialEmail={state.email}
                    initialPhoneNumber={state.phoneNumber}
                    formId={personalInfoFormId}
                    onSubmit={(result) => {
                      dispatch({
                        type: "UPDATE_PERSONAL_INFO",
                        name: result.name,
                        email: result.email,
                        phoneNumber: result.phone
                      })
                      goToNextStep()
                    }}
                  />
                )}
                {step === 1 && (
                  <PlanCard
                    plans={plans}
                    selectedPlan={state.plan}
                    onPlanChange={(plan) =>
                      dispatch({ type: "UPDATE_PLAN", plan })
                    }
                    selectedPriceType={state.priceType}
                    onPriceTypeToggle={() =>
                      dispatch({ type: "TOGGLE_PRICE_TYPE" })
                    }
                  />
                )}
                {step === 2 && (
                  <AddonsCard
                    addons={planAddons}
                    priceType={state.priceType}
                    checkedAddons={state.addons}
                    onToggleAddon={(addon) =>
                      dispatch({ type: "TOGGLE_PLAN_ADDON", addon })
                    }
                  />
                )}
                {step === 3 && (
                  <FinishingUpCard
                    onChangePlanClick={goToPlanStep}
                    plan={state.plan}
                    addons={state.addons}
                    priceType={state.priceType}
                  />
                )}
              </div>
              <NavBar
                steps={steps.length}
                currentStep={step}
                isAtPersonalInfoStep={step === 0}
                personalInfoFormId={personalInfoFormId}
                onBackButtonClick={goToPrevStep}
                onNextStepButtonClick={goToNextStep}
                onConfirmButtonClick={finish}
              />
            </>
          ) : (
            <div className={styles.thankYouCardWrapper}>
              <ThankYouCard />
            </div>
          )}
        </div>
      </Suspense>
    </main>
  )
}

export default App
