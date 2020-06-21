import React from 'react'

import './ErrorPopUp.scss'

type Props = {
  error: String

  setErrors: (error: string | null) => void
}

const ErrorPopUp: React.FC<Props> = ({ error, setErrors }) => {

  const handleClick = () => {
    setErrors(null)
    console.log(error)
  }


  return (
    <div className="error">
      <p className="error-title">{error}</p>
      <button className="error-btn" onClick={handleClick}>Ok</button>
    </div>
  )
}

export default ErrorPopUp
