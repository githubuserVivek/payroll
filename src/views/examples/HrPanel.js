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

const HrPanel = () => {
  /**
Validation schema
*/
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  /**
Get functions to build form with useForm() hook
*/

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  /**
handle Submit
*/
  function onSubmit(data) {
    // display form data on success
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    return false;
  }

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
                  <div className="pl-lg-2">
                    <Row className="mb-2">
                      <Col lg="6" xs="6">
                        <h3>Account Details</h3>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name
                          </label>
                          <Input
                            name="username"
                            type="text"
                            {...register("username")}
                            className={`form-control ${
                              errors.username ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.username?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
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
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-password"
                          >
                            First Name
                          </label>
                          <input
                            name="firstName"
                            type="text"
                            {...register("firstName")}
                            className={`form-control ${
                              errors.firstName ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.firstName?.message}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-joining-date"
                          >
                            Last Name
                          </label>
                          <Input
                            name="lastName"
                            type="text"
                            {...register("lastName")}
                            className={`form-control ${
                              errors.lastName ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.lastName?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row className="m-3">
                      <button type="submit" className="btn btn-primary ">
                        Submit
                      </button>
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HrPanel;
