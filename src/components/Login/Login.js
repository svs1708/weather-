import React, { useState, useEffect, useReducer , useContext} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-contex";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};
const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      pass: action.val,
      isValid: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      pass: state.pass,
      isValid: state.pass == null ? false : state.pass.trim().length > 6,
    };
  }
  return {
    pass: "",
    isValid: false,
  };
};
const Login = () => {
  const ctx= useContext(AuthContext);
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passState, dispatchPassword] = useReducer(passwordReducer, {
    pass: "",
    isValid: null,
  });
  useEffect(()=>{

    const interval = setTimeout(() => {
      console.log("checking form valid")
      setFormIsValid(
        emailState.isValid && passState.isValid
      );
    }, 500);

    return ()=>{
      console.log("CLEAN UP")
      clearTimeout(interval)
    }
  },[emailState.isValid,passState.isValid])

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
    // setFormIsValid(passState.pass.trim().length > 6 && event.target.value);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({
      type: "USER_INPUT",
      val: event.target.value,
    });

    // setFormIsValid(event.target.value.trim().length > 6 && emailState.isValid);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(emailState.value, passState.pass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input id = "email" label = "E-mail" type = "email" isValid = {emailState.isValid} value = {emailState.value} onChange = {emailChangeHandler} onBlur = {validateEmailHandler}></Input>
       <Input id = "password" label = "Password" type = "password" isValid = {passState.isValid} value = {passState.value} onChange = {passwordChangeHandler} onBlur = {validatePasswordHandler}></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
