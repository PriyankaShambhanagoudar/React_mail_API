import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

//////////////////////////////////////////////////
//email
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

///////////////////////////////////////////////////////
//password
const passwordReducer = (state, action) => {
  if(action.type === "USER_INPUT"){
    return { value: action.val, isValid: action.val.trim().length > 6  };
  }
  if(action.type === "INPUT_BLUR"){
    
  return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: "", isValid: false };
};
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //email
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  //password
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  //useEffect summary
  /* useEffect will run one time  and  bases on  dependencies cleanup function will run  (it will clear the useeffect)
   */
  useEffect(() => {
    console.log("Effect runing");

    return () => {
      console.log("Clean Up function ");
    };
  }, [passwordState.value]);
  
const { isValid : emailIsValid } = emailState;
const { isValid : passwordIsValid  } = passwordState;



    useEffect(() => {
      const identifier = setTimeout(() => {
        console.log("checking form validity!");
        setFormIsValid(
          emailIsValid    && passwordIsValid
        );
      }, 500);

      //clean up function
      return () => {
        console.log('Cleanup');
        clearTimeout(identifier);
      };
    }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   //event.target.value.includes("@") && enteredPassword.trim().length > 6
    //  // event.target.value.includes("@") && passwordState.value.trim().length > 6 //pwd
    //   event.target.value.includes("@") && passwordState.isValid 
    // );
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);
      dispatchPassword({type : "USER_INPUT", val : event.target.value}); //pwd

    setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
   // setPasswordIsValid(enteredPassword.trim().length > 6);
   // setPasswordIsValid(passwordState.value.trim().length > 6);  //pwd
   dispatchPassword({type : "INPUT_BLUR"}); //PWD

  };

  const submitHandler = (event) => {
    event.preventDefault();
   // props.onLogin(emailState.value, enteredPassword);
    props.onLogin(emailState.value, passwordState.value); //pwd

  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            //passwordIsValid === false ? classes.invalid : ""
            passwordState.isValid === false ? classes.invalid : "" //pwd
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            // value={enteredPassword}
            value={passwordState.value} // pwd

            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
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
