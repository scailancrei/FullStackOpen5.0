const validationMessage = ({ message }) => {
  return (
    <div
      style={{
        display: "flexbox",
        width: "20%",
        border: "red 3px solid",
        background: "grey",
        padding: "10px",
        color: "white",
        margin: "10px",
      }}
    >
      <div style={{ textSizeAdjust: "auto", marginRight: "30px" }}>
        {message}
      </div>
    </div>
  )
}

export default validationMessage
