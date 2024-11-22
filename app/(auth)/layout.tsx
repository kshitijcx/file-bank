import React from "react"

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="font-mono">
        {children}
    </div>
  )
}
export default layout