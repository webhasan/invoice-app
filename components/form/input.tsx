import { FC, ChangeEvent, useState } from "react";
import classes from './input.module.css';
import {EyeIcon} from '../icons/eye';
import {EyeOffIcon} from '../icons/eye-off';

interface InputAttributesWithoutLabel  {
    type?: string;
    className?: string;
    name: string;
    value: string;
    disabled?: boolean;
    id?: string;
    placeholder?: string;
    error?: string | null;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    showHidePassword?: boolean;
    wrapperClass?: string;
}


interface InputAttributesWithLabel  {
  type?: string;
  className?: string;
  name: string;
  value: string;
  id: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string | null;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  showHidePassword?: boolean;
  wrapperClass?: string;
}

type InputProps = InputAttributesWithLabel  | InputAttributesWithLabel;



const Input: FC<InputProps> = (props) => {
  let { type, id, error, disabled, placeholder, className, label, name, value, onChange, showHidePassword } = props;
  type = type || 'text';

  const [visiblePassword, setVisiblePassword] = useState(false);

  if(showHidePassword) {
    type = visiblePassword ? 'text' : 'password';
  }

  const labelAttrs = id ? {htmlFor: id} : {}
  
  const inputAttributes: InputAttributesWithoutLabel = {
    type,
    name, 
    value,
  }

  if(id) {
    inputAttributes.id = id;
  }

  if(placeholder) {
    inputAttributes.placeholder = placeholder;
  }

  if(onChange) {
    inputAttributes.onChange = onChange;
  }

  if(className) {
    inputAttributes.className = className;
  }

  if(disabled) {
    inputAttributes.disabled = disabled;
  }

  const togglePassword  = () => {
    setVisiblePassword(prev => !prev);
  }


  return <p className={classes['form-control']}>
      { label && <label {...labelAttrs}>{label}</label> }
      <span className={classes['input-wrap']}>
        <input {...inputAttributes} />
        {showHidePassword && 
          <span onClick={togglePassword} className={classes['password-toggler']}>
            {visiblePassword ? <EyeOffIcon/>: <EyeIcon/>}
          </span>
        }
      </span>
      {error && error.length && <span className={classes.error}>{error}</span>}
  </p>;
};

export default Input;
