import * as React from "react"
import Checkbox from "@mui/material/Checkbox"

export default function Pre({ session }) {
  const [checked, setChecked] = React.useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked)
  }

  return (
    <div style={{ margin: "auto" }}>
      <h3 style={{ display: "inline-block" }}>pre</h3>
      <Checkbox
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
      />
      {checked && <pre>{JSON.stringify(session, null, 2)}</pre>}
    </div>
  )
}
