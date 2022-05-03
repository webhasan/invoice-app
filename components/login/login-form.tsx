import { FormEvent, ChangeEvent, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Box from "../style/box";
import { useRouter } from "next/router";
import Head from "next/head";
import classes from "./login-form.module.css";
import Input from "../form/input";
import Submit from "../form/submit";
import Link from "next/link";
import * as yup from 'yup';
import getValidationError from "../../utils/validation/getValidationError";
import FormErrorNotification from "../form/form-error-notification";


type LoginInput = {
  email: string;
  password: string;
}

export interface SignInResponse {
    error: string | undefined;
    status: number;
    ok: boolean;
    url: string | null;
}

type InputErrors = Record<string, string | null>
type LoginError = string | null;

let schema = yup.object().shape({
  email: yup.string().email('Email address is not valid').required('Email is required!'),
  password: yup.string().required('Password is required!'),
});

const initialErrors  = {
    email: null,
    password: null
}

const LoginForm = () => {

  const [loginInfo, setLoginInfo] = useState<LoginInput>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<InputErrors>(initialErrors);
  const [loginError, setLoginError] = useState<LoginError>(null);
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    setLoginInfo((prevSate) => {  
      const { name, value } = e.target;

      return {
       ...prevSate,
       [name]: value
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const errorMessages = await getValidationError(schema, loginInfo);

    if(errorMessages) {
      setErrors(prev => ({...prev, ...errorMessages}));
      return;
    }

    setErrors(initialErrors);

    let res = await signIn<'credentials'>("credentials", {
      redirect: false,
      email: loginInfo.email,
      password: loginInfo.password,
    });

    if (!res!.error) {
      setLoginError(null);


      const path = router.query.redirect as string;
      router.replace(path ?? '/');

    }else {
      setLoginError(res!.error);
    }
  };

  if (typeof window === "undefined" || loading) {
    return null;
  }

  //redirect if already logged in 
  if (!loading && session) {
    router.replace("/");
    return null;
  }

  return (
    <Box>
      <Head>
        <title>Login | Invoice App</title>
      </Head>

      <div className={classes["form-wrap"]}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name="email"
            type="email"
            onChange={handleChange}
            value={loginInfo.email}
            id="email"
            label="Email"
            error= {errors.email}
          />
          <Input
            name="password"
            type="password"
            onChange={handleChange}
            value={loginInfo.password}
            id="password"
            label="Password"
            error={errors.password}
            showHidePassword = {true}
          />

          <div className={classes.action}>
            <Submit value="Login" />
            <span>
             {"Don't have account? "}
              <Link href="/signup">
                <a>Signup</a>
              </Link>
            </span>
          </div>
          {!!loginError && <FormErrorNotification message={loginError}/>}
        </form>
      </div>
    </Box>
  );
};

export default LoginForm;
