const validationMessage = ({ serverMessage }) => {
  let color = ""
  serverMessage.startsWith("A new blog added:")
    ? (color = "green")
    : (color = "red")

  const styles = {
    display: "flexbox",
    width: "20%",
    border: `${color} solid 3px`,
    background: "#d3d3d3",
    padding: "10px",
    color: `${color}`,
    margin: "10px",
  }
  return (
    <div style={styles}>
      <div style={{ textSizeAdjust: "auto", marginRight: "30px" }}>
        {serverMessage}
      </div>
    </div>
  )
}

export default validationMessage
