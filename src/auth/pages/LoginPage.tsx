import { FormEvent, useEffect } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";
import "./LoginPage.css";

const loginFormFields = {
  loginEmail: "",
  loginPassword: "",
};

const registerFormFields = {
  registerName: "",
  registerEmail: "",
  registerPassword: "",
  registerPassword2: "",
};

export const LoginPage = () => {
  const { startLogin, startRegister, errorMessage } = useAuthStore();
  const {
    loginEmail,
    loginPassword,
    onInputChange: onLoginInputChange,
  } = useForm(loginFormFields);
  const {
    registerEmail,
    registerName,
    registerPassword,
    registerPassword2,
    onInputChange: onRegisterInputChange,
  } = useForm(registerFormFields);

  const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    startLogin({ email: loginEmail, password: loginPassword });
  };
  const registerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerPassword !== registerPassword2) {
      Swal.fire("Sign Up Error", "Passwords do not match", "error");
      return;
    }

    startRegister({
      email: registerEmail,
      name: registerName,
      password: registerPassword,
    });
  };

  useEffect(() => {
    if (errorMessage !== null) {
      Swal.fire("Authentication Error", errorMessage, "error");
    }
  }, [errorMessage]);

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Sign In</h3>
          <form onSubmit={loginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="email"
                name="loginEmail"
                value={loginEmail}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="loginPassword"
                value={loginPassword}
                onChange={onLoginInputChange}
              />
            </div>
            <div className="d-grid gap-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Sign Up</h3>
          <form onSubmit={registerSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="name"
                name="registerName"
                value={registerName}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="email"
                name="registerEmail"
                value={registerEmail}
                onChange={onRegisterInputChange}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                name="registerPassword"
                value={registerPassword}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Write your password again"
                name="registerPassword2"
                value={registerPassword2}
                onChange={onRegisterInputChange}
              />
            </div>

            <div className="d-grid gap-2">
              <input
                type="submit"
                className="btnSubmit"
                value="Create account"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
