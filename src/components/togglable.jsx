import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const show = { display: visible ? "none" : "" }
  const hiden = { display: visible ? "" : "none" }

  const handleToggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return { handleToggleVisibility }
  })

  return (
    <div>
      <div style={show}>
        <div style={{ marginTop: "30px" }}>
          <button onClick={handleToggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>

      <div style={hiden}>
        {props.children}
        <button onClick={handleToggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

export default Togglable
