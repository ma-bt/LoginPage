import { Box } from "@chakra-ui/react"
import * as React from "react"
import { Navigate, useNavigate } from "react-router-dom"

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("access_token")

  const navigate = useNavigate()
  if (!token) {
    return (
      <Navigate to="/" />
    )


  }
  return (
    <Box>
      {children}
    </Box>
  )

}
