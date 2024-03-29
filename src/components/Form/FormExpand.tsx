import React, { ReactNode, useId, useState } from "react";
import styles from "./FormExpand.css";
import Button from "../Button";
import { useFocus } from "react-aria";
import { BaseButtonProps } from "../Button/Button";

export interface BaseFormExpandProps {
  label: string;
  displayLabel: ReactNode;
}

export interface FormProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export interface FormExpandProps extends BaseFormExpandProps {
  buttonProps?: BaseButtonProps;
  formProps?: FormProps;
}

export default function FormExpand({
  label,
  displayLabel,
  buttonProps,
  formProps,
}: FormExpandProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();
  const labelId = `${label}-${inputId}`;

  const { focusProps } = useFocus({
    onBlur: () => {
      if (!formProps?.value) setIsOpen(false);
    },
    onFocus: () => setIsOpen(true),
  });

  return (
    <div
      className={styles.formExpandContainer}
      style={{ borderColor: isOpen ? "gray" : "transparent" }}
    >
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
            className={styles.form}
            type="text"
            id={labelId}
            name={label}
            autoFocus
            autoComplete="off"
            {...formProps}
            {...focusProps}
          />
        </>
      )}
    </div>
  );
}
