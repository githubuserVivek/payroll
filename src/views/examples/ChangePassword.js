import {
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import EmployeesHeader from "components/Headers/EmployeesHeader.js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const ChangePassword = () => {
  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old Password is required."),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters.")
      .required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm Password is required."),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  /**
  get functions to build form with useForm() hook
  */
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (data) => {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  };

  return (
    <>
      <EmployeesHeader />
      {/* Page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h3 className=" mb-4 ">Change Password</h3>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Current Password
                          </label>
                          <Input
                            name="oldPassword"
                            type="text"
                            {...register("oldPassword")}
                            className={`form-control ${
                              errors.oldPassword ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.oldPassword?.message}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-new-password"
                          >
                            New Password
                          </label>
                          <Input
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
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-confirm-password"
                          >
                            Confirm Password
                          </label>
                          <Input
                            name="confirmPassword"
                            type="password"
                            {...register("confirmPassword")}
                            className={`form-control ${
                              errors.confirmPassword ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.confirmPassword?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ChangePassword;
