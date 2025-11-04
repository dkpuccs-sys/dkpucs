"use client"
import clsx from "clsx"
import type React from "react"

const Button = ({
  id,
  title,
  rightIcon,
  leftIcon,
  containerClass,
}: {
  id?: string
  title: string
  rightIcon?: React.ReactNode
  leftIcon?: React.ReactNode
  containerClass?: string
}) => {
  return (
    <button
      id={id}
      className={clsx(
        "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity",
        containerClass,
      )}
    >
      {leftIcon}
      <span>{title}</span>
      {rightIcon}
    </button>
  )
}

export default Button
