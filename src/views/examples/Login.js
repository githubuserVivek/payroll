import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../assets/scss/myCustomScss/Login.scss";

import { login } from "services/Auth";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Form,
  InputGroup,
  CardHeader,
  Input,
  Col,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import { handleResponse } from "ApiActions/common";

const Login = () => {
  const history = useHistory();

  /**
Validation Schema
*/
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  /**
  get functions to build form with useForm() hook
*/
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  /**
Revoke Login API and Handle response
@param {data} form data
@param {result} api response
*/

  const onSubmit = async (data) => {
    const result = await login(data);
    const response = handleResponse(result);

    /**
Set token at local storage 
*/
    if (response.success) {
      localStorage.setItem("token", result.data.token);
      toast("Login Successful");
      setTimeout(() => history.push("/index"), 1000);
    } else {
      toast(response.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent  border-0">
            <div className="btn-wrapper text-center">
              <img
                className="image_logo"
                alt="..."
                src={
                  require("../../assets/img/logo/soft-radix-logo.png").default
                }
              />{" "}
            </div>
          </CardHeader>

          <CardBody className="px-lg-5 py-lg-5">
            <Form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    name="email"
                    type="text"
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </InputGroup>
              </FormGroup>

              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    name="password"
                    type="password"
                    {...register("password")}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                  />
                  <div className="invalid-feedback">
                    {errors.password?.message}
                  </div>
                </InputGroup>
              </FormGroup>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  Remember me
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4 btn btn-primary btn"
                  color="btn-primary"
                  type="submit"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
