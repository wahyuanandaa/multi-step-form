import { useRef, useState } from "react"
import { FormInput } from "../form/FormInput"
import { Card } from "../multi-step/card/Card"
import styles from "./PersonalInfoCard.module.scss"

export default function PersonalInfoCard({
  initialName,
  initialEmail,
  initialPhoneNumber,
  formId,
  onSubmit
}) {
  const nameInputRef = useRef(null)
  const emailInputRef = useRef(null)
  const phoneInputRef = useRef(null)

  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [phone, setPhone] = useState(initialPhoneNumber)
  const [hasSubmitted, setHasSubmitted] = useState(false)

  const phoneError = validatePhoneNumber(phone)
  const emailError = validateEmail(email)
  const nameError = validateName(name)

  return (
    <Card>
      <Card.Title>Personal info</Card.Title>
      <Card.Description>
        Please provide your name, email address, and phone number.
      </Card.Description>
      <form
        noValidate
        id={formId}
        className={styles.cardContent}
        onSubmit={(event) => {
          event.preventDefault()
          if (!(nameError || emailError || phoneError)) {
            onSubmit({ name, email, phone })
            return
          }
          setHasSubmitted(true)
          if (nameError) {
            nameInputRef.current?.focus()
            return
          }
          if (emailError) {
            emailInputRef.current?.focus()
            return
          }
          if (phoneError) {
            phoneInputRef.current?.focus()
            return
          }
        }}
      >
        <FormInput
          ref={nameInputRef}
          label="Name"
          value={name}
          type="text"
          placeholder="e.g. Stephen King"
          onChange={setName}
          autoFocus
          error={hasSubmitted ? nameError : undefined}
        />
        <FormInput
          ref={emailInputRef}
          label="Email Address"
          value={email}
          type="email"
          placeholder="e.g. stephenking@lorem.com"
          onChange={setEmail}
          error={hasSubmitted ? emailError : undefined}
        />
        <FormInput
          ref={phoneInputRef}
          label="Phone Number"
          value={phone}
          type="tel"
          placeholder="e.g. 1234567890"
          onChange={setPhone}
          error={hasSubmitted ? phoneError : undefined}
        />
      </form>
    </Card>
  )
}

function validateName(name) {
  if (name.length === 0) {
    return "This field is required"
  }
}

function validateEmail(email) {
  if (email.length === 0) {
    return "This field is required"
  }
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    )
  ) {
    return "Invalid email"
  }
}

function validatePhoneNumber(phone) {
  if (phone.length === 0) {
    return "This field is required"
  }
  if (!/^[0-9]*$/.test(phone)) {
    return "Should only contain numbers"
  }
}
