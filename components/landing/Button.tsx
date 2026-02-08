"use client";
import clsx from "clsx";
import type React from "react";
import Link from "next/link";

type ButtonProps = {
  id?: string;
  title: string;
  href?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
};

const Button = ({
  id,
  title,
  href,
  rightIcon,
  leftIcon,
  containerClass,
  onClick,
}: ButtonProps) => {
  const className = clsx(
    "flex items-center gap-2 px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity",
    containerClass,
  );

  const content = (
    <>
      {leftIcon}
      <span>{title}</span>
      {rightIcon}
    </>
  );

  if (href) {
    return (
      <Link id={id} href={href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button id={id} className={className} onClick={onClick} type="button">
      {content}
    </button>
  );
};

export default Button;
