import React, { useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useHistory, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Row,
  Col,
  Container,
} from "reactstrap";
import config from "ApiActions/apiConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import EmployeesHeader from "components/Headers/EmployeesHeader.js";
import { singleUser } from "services/admin/common";
import { getUserToken } from "ApiActions/common";
import { handleResponse } from "ApiActions/common";

const EditEmployee = () => {
  const history = useHistory();
  const { id } = useParams();

  const [employeeData, setEmployeeData] = useState("");
  let yearsago = moment(new Date()).subtract(18, "years").format("YYYY-MM-DD");

  /**
  GET data for a particular employee
 */
  const getDataById = async (employeeID) => {
    const result = await singleUser(employeeID);
    setEmployeeData(result.data.data);
  };

  /**
  Revoke function on page load
  */
  useEffect(() => {
    getDataById(id);
  }, [id]);

  /*
  Validation Schema
  */
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const aplphaNumeric = /^[a-z0-9]+$/i;
  const numberOnly = /^[0-9\b]+$/;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),

    joining_date: Yup.string()
      .required("Joining date is required.")
      .nullable("Date of Birth is required."),

    dob: Yup.date()
      .required("Date of Birth is required.")
      .nullable("Date of Birth is required.")
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
      .required("Phone number is required."),

    alternate_phone_no: Yup.string()
      .min(10, "Alternate phone number must be at least 10 characters.")
      .max(10, "Alternate phone number must be  least 10 characters.")
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Alternate phone number is required."),

    probation: Yup.string()
      .nullable("Probation start date is required.")
      .required("Probation start date is required."),

    probation_end_date: Yup.string()
      .nullable("Probation end date is required.")
      .required("Probation end date is required."),

    salary: Yup.number()
      .positive("Salary must be a positive number")
      .required("Salary is required.")
      .typeError("Salary is required."),

    pan_number: Yup.string()
      .required("PAN number is required.")
      .matches(aplphaNumeric, "Should be aplhanumeric"),

    aadhar_no: Yup.string().required("Aadhar number is required."),

    permanent_address: Yup.string().required("Permanent address is required."),

    current_address: Yup.string().required("Current address is required."),

    ifsc_code: Yup.string().matches(aplphaNumeric, "Should be aplhanumeric"),

    bank_account_number: Yup.string().matches(
      numberOnly,
      "Bank account should be number only"
    ),
    designation: Yup.string().required("Designation is required"),
  });

  /**
UPDATE the employee's data 
@params {data} handlesubmit data
*/
  const onSubmit = async (data) => {
    const result = await axios
      .put(
        `${config.api_base_url}employee/${id}`,
        data,

        {
          headers: {
            Authorization: getUserToken(),
          },
        }
      )
      .then((response) => response)
      .catch((error) => error);

    /**
    handle resonse of API
    */
    const response = handleResponse(result);
    if (response.success) {
      toast("User updated successuly");
      setTimeout(() => history.push("/admin/employess"), 2000);
    } else {
      toast(response.error);
    }
  };

  return (
    <>
      <ToastContainer />

      <EmployeesHeader />
      {employeeData && (
        <Formik
          initialValues={{
            name: employeeData?.name,
            joining_date: employeeData?.joining_date,
            salary: employeeData?.salary,
            dob: employeeData?.dob,
            permanent_address: employeeData?.permanent_address,
            current_address: employeeData?.current_address,
            phone_no: employeeData?.phone_no,
            alternate_phone_no: employeeData?.alternate_phone_no,
            aadhar_no: employeeData?.aadhar_no,
            probation: employeeData?.probation,
            probation_end_date: employeeData?.probation_end_date,
            pan_number: employeeData?.bank_details?.pan_number,
            bank_account_number:
              employeeData?.bank_details?.bank_account_number,
            ifsc_code: employeeData?.bank_details?.ifsc_code,
            designation: employeeData?.designation,
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <div>
              <Container className="mt--8" fluid>
                <Row>
                  <Col className="order-xl-1" xl="12">
                    <Card className="bg-secondary shadow">
                      <CardBody>
                        <Form>
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
                                    <span className="btn-inner--text">
                                      Back
                                    </span>
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
                                    Name
                                    <small className="text-danger">*</small>
                                  </label>
                                  <Field
                                    name="name"
                                    type="text"
                                    className={`form-control ${
                                      errors.name && touched.name
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.name && touched.name ? (
                                    <small className="text-danger">
                                      {errors.name}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-name"
                                  >
                                    Email <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    disabled={true}
                                    value={employeeData.email}
                                    className={`form-control`}
                                  />
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
                                    Joining Date
                                    <span className="text-danger">*</span>
                                  </label>

                                  <DatePicker
                                    placeholderText={values.joining_date}
                                    maxDate={new Date()}
                                    name="joining_date"
                                    selected={new Date(values.joining_date)}
                                    onChange={(date) =>
                                      setFieldValue("joining_date", date)
                                    }
                                    showYearDropdown
                                    dropdownMode="select"
                                    dateFormat="yyyy-MM-dd"
                                    className={`form-control ${
                                      errors.joining_date &&
                                      touched.joining_date
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                  />

                                  {errors.joining_date &&
                                  touched.joining_date ? (
                                    <small className="text-danger">
                                      {errors.joining_date}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-joining-date"
                                  >
                                    Date of Birth
                                    <span className="text-danger">*</span>
                                  </label>
                                  <DatePicker
                                    // type="date"
                                    placeholderText="Please select a date"
                                    maxDate={new Date(yearsago)}
                                    showYearDropdown
                                    dropdownMode="select"
                                    name="dob"
                                    selected={new Date(values.dob)}
                                    onChange={(date) =>
                                      setFieldValue("dob", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className={`form-control ${
                                      errors.dob && touched.dob
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.dob && touched.dob ? (
                                    <small className="text-danger">
                                      {errors.dob}
                                    </small>
                                  ) : null}
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
                                    Bank Account Number (Optional)
                                  </label>
                                  <Field
                                    name="bank_account_number"
                                    type="text"
                                    className={`form-control ${
                                      errors.bank_account_number &&
                                      touched.bank_account_number
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.bank_account_number &&
                                  touched.bank_account_number ? (
                                    <small className="text-danger">
                                      {errors.bank_account_number}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-ifsc_code"
                                  >
                                    IFSC Code (Optional)
                                  </label>
                                  <Field
                                    name="ifsc_code"
                                    type="text"
                                    className={`form-control ${
                                      errors.ifsc_code && touched.ifsc_code
                                        ? " is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.ifsc_code && touched.ifsc_code ? (
                                    <small className="text-danger">
                                      {errors.ifsc_code}
                                    </small>
                                  ) : null}
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
                                    Phone Number
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    placeholder="Ener phone number"
                                    name="phone_no"
                                    type="text"
                                    value={values.phone_no}
                                    className={`form-control ${
                                      errors.phone_no && touched.phone_no
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.phone_no && touched.phone_no ? (
                                    <small className="text-danger">
                                      {errors.phone_no}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-alternate_phone_no"
                                  >
                                    Alternate number
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    placeholder="Ener phone number"
                                    name="alternate_phone_no"
                                    type="text"
                                    className={`form-control ${
                                      errors.alternate_phone_no &&
                                      touched.alternate_phone_no
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.alternate_phone_no &&
                                  touched.alternate_phone_no ? (
                                    <small className="text-danger">
                                      {errors.alternate_phone_no}
                                    </small>
                                  ) : null}
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
                                  <DatePicker
                                    placeholderText="Please select a date"
                                    selected={new Date(values.probation)}
                                    onChange={(date) =>
                                      setFieldValue("probation", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    showYearDropdown
                                    dropdownMode="select"
                                    maxDate={new Date(moment().add(1, "month"))}
                                    minDate={
                                      new Date(moment().subtract(1, "month"))
                                    }
                                    className={`form-control ${
                                      errors.probation ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.probation ? (
                                    <small className="text-danger">
                                      {errors.probation}
                                    </small>
                                  ) : null}
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

                                  <DatePicker
                                    placeholderText="Please select a date"
                                    showYearDropdown
                                    dropdownMode="select"
                                    selected={
                                      new Date(values.probation_end_date)
                                    }
                                    maxDate={new Date(moment().add(1, "month"))}
                                    minDate={
                                      new Date(moment().subtract(1, "month"))
                                    }
                                    onChange={(date) =>
                                      setFieldValue("probation_end_date", date)
                                    }
                                    dateFormat="yyyy-MM-dd"
                                    className={`form-control ${
                                      errors.probation_end_date
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.probation_end_date ? (
                                    <small className="text-danger">
                                      {errors.probation_end_date}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-pan-number"
                                  >
                                    PAN Number
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    placeholder="Enter pan number"
                                    name="pan_number"
                                    type="text"
                                    className={`form-control ${
                                      errors.pan_number ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.pan_number && touched.pan_number ? (
                                    <small className="text-danger">
                                      {errors.pan_number}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-aadhaar-number"
                                  >
                                    Aadhaar Number
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    name="aadhar_no"
                                    type="nummber"
                                    className={`form-control ${
                                      errors.aadhar_no ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.aadhar_no && touched.aadhar_no ? (
                                    <small className="text-danger">
                                      {errors.aadhar_no}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>
                            </Row>
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
                                  <Field
                                    placeholder="Enter permanent address"
                                    name="permanent_address"
                                    type="text"
                                    className={`form-control ${
                                      errors.permanent_address
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  />
                                  {errors.permanent_address &&
                                  touched.permanent_address ? (
                                    <small className="text-danger">
                                      {errors.permanent_address}
                                    </small>
                                  ) : null}
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
                                  <Field
                                    placeholder="Enter current_address"
                                    name="current_address"
                                    type="text"
                                    className={`form-control ${
                                      errors.current_address ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.current_address &&
                                  touched.current_address ? (
                                    <small className="text-danger">
                                      {errors.current_address}
                                    </small>
                                  ) : null}
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
                                    Salary
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    placeholder="Enter designation"
                                    name="salary"
                                    type="number"
                                    className={`form-control ${
                                      errors.salary ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.salary && touched.salary ? (
                                    <small className="text-danger">
                                      {errors.salary}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Col lg="6">
                                <FormGroup>
                                  <label
                                    className="form-control-label"
                                    htmlFor="input-designation"
                                  >
                                    Designation{" "}
                                    <span className="text-danger">*</span>
                                  </label>
                                  <Field
                                    placeholder="Enter salary"
                                    name="designation"
                                    type="text"
                                    className={`form-control ${
                                      errors.designation ? "is-invalid" : ""
                                    }`}
                                  />
                                  {errors.designation ? (
                                    <small className="text-danger">
                                      {errors.designation}
                                    </small>
                                  ) : null}
                                </FormGroup>
                              </Col>

                              <Row className="m-3">
                                <button
                                  type="submit"
                                  className="btn btn-primary "
                                >
                                  Update
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
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default EditEmployee;
