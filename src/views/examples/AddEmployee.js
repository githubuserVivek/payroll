import React, { useState } from "react";
import EmployeesHeader from "components/Headers/EmployeesHeader.js";
import { Link, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { handleResponse } from "../../ApiActions/common";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { add } from "services/admin/common";
import "assets/scss/myCustomScss/common.scss";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Container,
} from "reactstrap";
import moment from "moment";

const AddEmployee = () => {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  let yearsago = moment(new Date()).subtract(18, "years").format("YYYY-MM-DD");

  console.log("yearsss ago ", yearsago);

  /*
Validation Schema
*/
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const aplphaNumeric = /^[a-z0-9]+$/i;
  const numberOnly = /^[0-9\b]+$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),

    email: Yup.string()
      .required("Email is required")
      .email("Email is invalid."),
    joining_date: Yup.string()
      .required("Joining date is required.")
      .nullable("Date of Birth is required."),

    dob: Yup.string()
      .required("Date of Birth is required.")
      .nullable()
      .test(
        "Date of Birth",
        "Age should be greather than 18",
        function (value) {
          return moment().diff(moment(value), "years") >= 18;
        }
      ),

    phone_no: Yup.string()
      .min(10, "Phone number must be at least 10 characters.")
      .max(10, "Phone number must be  least 10 characters.")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required."),

    alternate_phone_no: Yup.string()
      .min(10, "Alternate phone number must be at least 10 characters.")
      .max(10, "Alternate phone number must be  least 10 characters.")
      .required("Alternate phone number is required.")
      .matches(phoneRegExp, "Phone number is not valid"),

    probation: Yup.string().required("Probation start is required."),

    probation_end_date: Yup.string().required("Probation end is required."),

    pan_number: Yup.string()
      .required("PAN number is required.")
      .matches(aplphaNumeric, "Should be aplhanumeric"),

    aadhar_no: Yup.string()
      .required("Aadhar number is required.")
      .matches(numberOnly, "Should be number only"),

    permanent_address: Yup.string().required("Permanent address is required."),

    current_address: Yup.string().required("Current address is required."),

    salary: Yup.number()
      .positive("Salary must be a positive number")
      .required("Salary is required.")
      .typeError("Salary is required."),

    designation: Yup.string().required("Designation is required."),

    ifsc_code: Yup.string().matches(
      aplphaNumeric,
      "IFSC should be aplhanumeric."
    ),

    bank_account_number: Yup.string().matches(
      numberOnly,
      "Bank account should be number only."
    ),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  /**
get functions to build form with useForm() hook
*/
  const { register, handleSubmit, formState, control } = useForm(formOptions);
  const { errors } = formState;

  /**
  API Call to add users
 */
  const onSubmit = async (data) => {
    const result = await add(data);
    console.log("submit data", result);
    /**
   Handle response of API,
    */
    const response = handleResponse(result);
    if (response.success) {
      toast("User registered successfully");
      setTimeout(() => history.push("/admin/employess"), 2000);
    } else {
      toast(response.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <EmployeesHeader />
      {/* page content */}
      <Container className="mt--8" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card className="bg-secondary shadow">
              <CardBody>
                <Form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="pl-lg-2">
                    <Row className="mb-2">
                      <Col lg="6" xs="6">
                        <h3>Employee Registration</h3>
                      </Col>
                      <Col lg="6" className="text-right" xs="6">
                        <Link to="/admin/employess">
                          <Button
                            className="btn-icon btn-3 btn-sm"
                            color="primary"
                            type="button"
                          >
                            <span className="btn-inner--icon">
                              <i className="ni ni-bold-left" />
                            </span>
                            <span className="btn-inner--text">Back</span>
                          </Button>
                        </Link>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-name"
                          >
                            Name <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter name"
                            name="name"
                            type="text"
                            {...register("name")}
                            className={`form-control ${
                              errors.name ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.name?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter email"
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
                            htmlFor="input-joining-date"
                          >
                            Joining Date <span className="text-danger">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="joining_date"
                            placeholder="enter date"
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <DatePicker
                                placeholderText="Please select a date"
                                onChange={onChange}
                                onBlur={onBlur}
                                selected={value}
                                maxDate={new Date()}
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="yyyy-MM-dd"
                                className={`form-control ${
                                  errors.joining_date ? "is-invalid" : ""
                                }`}
                              />
                            )}
                          />
                          <div className="invalid_feedback">
                            {errors.joining_date?.message}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-joining-date"
                          >
                            Date of Birth <span className="text-danger">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="dob"
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <DatePicker
                                placeholderText="Please select a date"
                                onChange={onChange}
                                maxDate={new Date(yearsago)}
                                selected={value}
                                showYearDropdown
                                dropdownMode="select"
                                dateFormat="yyyy-MM-dd"
                                className={`form-control ${
                                  errors.dob ? "is-invalid" : ""
                                }`}
                              />
                            )}
                          />
                          <div className="invalid_feedback">
                            {errors.dob?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-bank-account"
                          >
                            Bank Account Number (Optional)
                          </label>
                          <Input
                            placeholder="Enter bank account number"
                            name="bank_account_number"
                            type="text"
                            {...register("bank_account_number")}
                            className={`form-control ${
                              errors.bank_account_number ? "is-invalid" : ""
                            }`}
                          />

                          <div className="invalid_feedback">
                            {errors.bank_account_number?.message}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-d.o.b"
                          >
                            IFSC Code (Optional)
                          </label>
                          <Input
                            placeholder="Enter bank account number"
                            name="ifsc_code"
                            type="text"
                            {...register("ifsc_code")}
                            className={`form-control ${
                              errors.ifsc_code ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid_feedback">
                            {errors.ifsc_code?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-phone-number"
                          >
                            Phone Number <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Ener phone number"
                            name="phone_no"
                            type="text"
                            {...register("phone_no")}
                            className={`form-control ${
                              errors.phone_no ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.phone_no?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-alternate_phone_no"
                          >
                            Alternate number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter alternate phone number"
                            name="alternate_phone_no"
                            type="text"
                            {...register("alternate_phone_no")}
                            className={`form-control ${
                              errors.alternate_phone_no ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.alternate_phone_no?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row></Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-pan-number"
                          >
                            PAN Number <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter pan number"
                            name="pan_number"
                            type="text"
                            {...register("pan_number")}
                            className={`form-control ${
                              errors.pan_number ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.pan_number?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-aadhaar-number"
                          >
                            Aadhaar Number{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter aadhar number"
                            name="aadhar_no"
                            type="text"
                            {...register("aadhar_no")}
                            className={`form-control ${
                              errors.aadhar_no ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.aadhar_no?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row></Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-permanent-address"
                          >
                            Permanent Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter permanent address"
                            name="permanent_address"
                            type="text"
                            {...register("permanent_address")}
                            className={`form-control ${
                              errors.permanent_address ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.permanent_address?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-current-address"
                          >
                            Current Address{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter current address"
                            name="current_address"
                            type="text"
                            {...register("current_address")}
                            className={`form-control ${
                              errors.current_address ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.current_address?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-probation-start"
                          >
                            Probation Start
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="probation"
                            render={({ field: { onChange, value } }) => {
                              setStartDate(value);
                              return (
                                <DatePicker
                                  placeholderText="Please select a date"
                                  onChange={onChange}
                                  selected={startDate}
                                  selectsStart
                                  startDate={startDate}
                                  endDate={endDate}
                                  maxDate={new Date(moment().add(1, "month"))}
                                  minDate={
                                    new Date(moment().subtract(1, "month"))
                                  }
                                  dateFormat="yyyy-MM-dd"
                                  className={`form-control ${
                                    errors.probation ? "is-invalid" : ""
                                  }`}
                                />
                              );
                            }}
                          />
                          <div className="invalid_feedback">
                            {errors.probation?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-probation-end"
                          >
                            Probation End
                            <span className="text-danger">*</span>
                          </label>
                          <Controller
                            control={control}
                            name="probation_end_date"
                            render={({ field: { onChange, value } }) => {
                              setEndDate(value);
                              return (
                                <DatePicker
                                  placeholderText="Please select a date"
                                  selected={endDate}
                                  selectsEnd
                                  onChange={onChange}
                                  minDate={startDate}
                                  startDate={startDate}
                                  endDate={endDate}
                                  dateFormat="yyyy-MM-dd"
                                  className={`form-control ${
                                    errors.probation_end_date
                                      ? "is-invalid"
                                      : ""
                                  }`}
                                />
                              );
                            }}
                          />
                          <div className="invalid_feedback">
                            {errors.probation_end_date?.message}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-salary"
                          >
                            Salary <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter salary"
                            name="salary"
                            type="number"
                            {...register("salary")}
                            className={`form-control ${
                              errors.salary ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.salary?.message}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-salary"
                          >
                            Designation <span className="text-danger">*</span>
                          </label>
                          <Input
                            placeholder="Enter designation"
                            type="text"
                            {...register("designation")}
                            className={`form-control ${
                              errors.designation ? "is-invalid" : ""
                            }`}
                          />
                          <div className="invalid-feedback">
                            {errors.designation?.message}
                          </div>
                        </FormGroup>
                      </Col>

                      <Row className="m-3">
                        <button type="submit" className="btn btn-primary ">
                          Submit
                        </button>
                      </Row>
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

export default AddEmployee;
