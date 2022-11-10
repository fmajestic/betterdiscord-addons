import type { ChangeEvent, HTMLInputTypeAttribute } from "react";

interface InputFieldProps {
  name: string;
  label: string;
  hint?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: HTMLInputTypeAttribute | "textarea";
  [inputProp: string]: any
}

export default function InputField({ name, label, hint, value, onChange, type, ...inputProps }: InputFieldProps) {
  return (
    <div className="ec-form-control">
      <div>
        <label htmlFor={name}>{label}{hint && <small> ({hint})</small>}</label>
      </div>
      {type === 'textarea'
        ? <textarea id={name} name={name} value={value} onChange={onChange} {...inputProps} />
        : <input type={type} id={name} name={name} value={value} onChange={onChange} {...inputProps} />}
    </div>
  )
}
