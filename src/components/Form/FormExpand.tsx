import React, { ReactNode, useId, useState } from "react";
import styles from "./FormExpand.scss";
import Button from "../Button";
import { useFocus } from "react-aria";
import { BaseButtonProps } from "../Button/Button";

export interface BaseFormExpandProps {
  label: string;
  displayLabel: ReactNode;
  buttonProps?: BaseButtonProps;
}

export interface FormExpandProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    BaseFormExpandProps {}

export default function FormExpand({
  label,
  displayLabel,
  buttonProps,
  ...rest
}: FormExpandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();
  const labelId = `${label}-${inputId}`;

  const { focusProps } = useFocus({
    onBlur: () => setIsOpen(false),
    onFocus: () => setIsOpen(true),
  });

  return (
    <div className={styles.formExpandContainer}>
      {!isOpen && (
        <Button {...focusProps} {...buttonProps} aria-label={label}>
          {displayLabel}
        </Button>
      )}

      {isOpen && (
        <>
          <label className={styles.label} aria-label={label} htmlFor={labelId}>
            {displayLabel}
          </label>
          <input
            {...rest}
            className={styles.form}
            type="text"
            id={labelId}
            name={label}
            autoFocus
            autoComplete="off"
            {...focusProps}
          />
        </>
      )}
    </div>
  );
}
