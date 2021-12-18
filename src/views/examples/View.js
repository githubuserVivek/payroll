import {
  Col,
  Button,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EmployeesHeader from "components/Headers/EmployeesHeader.js";
import "../../assets/scss/myCustomScss/footer.scss";
import { singleUser } from "services/admin/common";
import "assets/scss/myCustomScss/Employee.scss";

const View = () => {
  let { id } = useParams();

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    joining_date: "",
    salary: "",
    dob: "",
    permanent_address: "",
    current_address: "",
    phone_no: "",
    alternate_phone_no: "",
    aadhar_no: "",
    probation: "",
    probation_end_date: "",
    pan_number: "",
    bank_account_number: "",
    ifsc_code: "",
  });

  console.log("employeeData", employeeData);
  /**
Revoke particular data on page load
*/
  useEffect(() => {
    getData(id);
  }, []);

  /**
Revoke singleUser() for particular employee
@param {viewId} employee ID
*/
  const getData = async (viewId) => {
    const result = await singleUser(viewId);
    setEmployeeData(result.data.data);
  };

  return (
    <>
      <EmployeesHeader />

      {/* Page content */}
      <Container className="mt--8 " fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Employee Detail</h3>
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
              </CardHeader>

              <Row className="m-1">
                <Col xs="6">
                  <label className="form-control-label" htmlFor="input-name">
                    Name
                  </label>
                  <p>{employeeData.name}</p>
                </Col>

                <Col xs="6">
                  <label className="form-control-label" htmlFor="input-email">
                    Email
                  </label>
                  <p>{employeeData.email}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-joining_date"
                  >
                    Joining date
                  </label>
                  <p>{employeeData.joining_date}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-Phone_number"
                  >
                    Phone number
                  </label>
                  <p>{employeeData.phone_no}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label className="form-control-label" htmlFor="input-dob">
                    Date of Birth
                  </label>
                  <p>{employeeData.dob}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-Phone_number"
                  >
                    Alternate number
                  </label>
                  <p>{employeeData.alternate_phone_no}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-probationStart"
                  >
                    Probation Start
                  </label>
                  <p>{employeeData.probation}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-probationEnd"
                  >
                    Probation end
                  </label>
                  <p>{employeeData.probation_end_date}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-bankAccount"
                  >
                    Bank account number
                  </label>
                  <p>{employeeData?.bank_details?.bank_account_number}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-ifsc_code"
                  >
                    IFSC code
                  </label>
                  <p>{employeeData?.bank_details?.ifsc_code}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-aadhar_no"
                  >
                    Aadhar number
                  </label>
                  <p>{employeeData.aadhar_no}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-pan_number"
                  >
                    PAN number
                  </label>
                  <p>{employeeData?.bank_details?.pan_number}</p>
                </Col>
              </Row>

              <Row className="m-1">
                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-permanent_address"
                  >
                    Permanent_address
                  </label>
                  <p>{employeeData.permanent_address}</p>
                </Col>

                <Col xs="6">
                  <label
                    className="form-control-label"
                    htmlFor="input-current_address"
                  >
                    Current address
                  </label>
                  <p>{employeeData.current_address}</p>
                </Col>
              </Row>
              <Row className="m-1">
                <Col xs="6">
                  <label className="form-control-label" htmlFor="input-salary">
                    Salary
                  </label>
                  <p>{employeeData.salary}</p>
                </Col>
                <Col xs="6">
                  <label className="form-control-label" htmlFor="input-salary">
                    Designation
                  </label>
                  <p>{employeeData.designation}</p>
                </Col>
              </Row>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default View;
