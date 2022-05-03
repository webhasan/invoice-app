import { FormEvent, ChangeEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { SignUp } from "../../utils/api/auth/signUp";
import Box from "../style/box";
import { useRouter } from "next/router";
import Head from "next/head";
import Input from "../form/input";
import Submit from "../form/submit";
import Link from "next/link";
import * as yup from 'yup';
import getValidationError from '../../utils/validation/getValidationError';
import FormErrorNotification from "../form/form-error-notification";
import PasswordStrengthBar from 'react-password-strength-bar';
import { toast } from 'react-toastify';
import { SignupData } from "../../utils/api/auth/signUp";

import classes from "./signup-form.module.css";


type RegisterInput = Record<string, string>
type InputErrors = Record<string, string | null>;
type SignUpError = string | null;

let schema = yup.object().shape({
  name: yup.string().required('Name is required!'),
  email: yup.string().email('Email address is not valid').required('Email is required!'),
  password: yup.string().required('Password is required!').min(6, 'Password length must be at list 6 character long.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Does not match password!')
});

const initialErrors  = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
}

const SignUpForm = () => {
  
  const [registerInfo, setRegisterInfo] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<InputErrors>(initialErrors);

  const [signUpError, setSignUpError] = useState<SignUpError>(null);


  const { data: session, status } = useSession();
  const loading = status === "loading";

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo((prevSate) => {  
      const { name, value } = e.target;
      return {
       ...prevSate,
       [name]: value
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errorMessages = await getValidationError(schema, registerInfo);

    if(errorMessages) {
      setErrors({...initialErrors, ...errorMessages});
      return false;
    }

    try {
      let res = await SignUp(registerInfo as SignupData);
      
      setSignUpError(null);
      toast.success('Successfully registered!', {
        onClose: () => router.replace('/login')
      });
      
    }catch(e) {
      const errorMessage = e as string;
      setSignUpError(errorMessage);
    }
  };

  if (typeof window === "undefined" || loading) {
    return null;
  }

  if (!loading && session) {
    router.replace("/");
    return null;
  }

  return (
    <Box>
      <Head>
        <title>Register | Invoice App</title>
      </Head>

      <div className={classes["form-wrap"]}>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            onChange={handleChange}
            value={registerInfo.name}
            id="name"
            label="Name"
            error= {errors.name}
          />

          <Input
            name="email"
            type="email"
            onChange={handleChange}
            value={registerInfo.email}
            id="email"
            label="Email"
            error= {errors.email}
          />

          <Input
            name="password"
            type="password"
            onChange={handleChange}
            value={registerInfo.password}
            id="password"
            label="Password"
            error={errors.password}
            showHidePassword = {true}
          />
          <PasswordStrengthBar password={registerInfo.password}/>

          <Input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={registerInfo.confirmPassword}
            id="confirmPassword"
            label="Confirm Password"
            error={errors.confirmPassword}
            showHidePassword = {true}
            className={classes['confirm-password']}
          />

          <div className={classes.action}>
            <Submit value="SignUp" />
            <span>
              Already have account?{" "}
              <Link href="/login">
                <a>Login</a>
              </Link>
            </span>
          </div>

          {!!signUpError && <FormErrorNotification message={signUpError}/>}
        </form>
      </div>
    </Box>
  );
};

export default SignUpForm;
