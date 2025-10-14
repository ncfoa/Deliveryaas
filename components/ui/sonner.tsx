"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group font-adobe"
      style={
        {
          "--normal-bg": "white",
          "--normal-text": "rgb(17 24 39)",
          "--normal-border": "rgb(229 231 235)",
          "--success-bg": "rgb(34 197 94)",
          "--success-text": "white",
          "--success-border": "rgb(34 197 94)",
          "--error-bg": "rgb(239 68 68)",
          "--error-text": "white",
          "--error-border": "rgb(239 68 68)",
          "--warning-bg": "rgb(245 158 11)",
          "--warning-text": "white",
          "--warning-border": "rgb(245 158 11)",
          "--info-bg": "rgb(0 102 204)",
          "--info-text": "white",
          "--info-border": "rgb(0 102 204)",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          borderRadius: "6px",
          border: "1px solid",
          fontFamily: "var(--font-adobe-clean)",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
