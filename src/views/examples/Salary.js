import EmployeesHeader from "components/Headers/EmployeesHeader";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";

import {
  Col,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Input,
} from "reactstrap";
import Swal from "sweetalert2";
import { handleResponse } from "ApiActions/common";
import { listSalaryData } from "services/admin/common";
import { finalSalaryApi } from "services/admin/common";

function Salary() {
  const [startDate, setStartDate] = useState(new Date());
  const [getAll, setgetAll] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [toggleInput, setToggleInput] = useState(false);
  const [monthlyWorkingdays, setMonthlyWorkingDays] = useState();
  const moments = require("moment-business-days");

  console.log("monthlyWorkingdays", monthlyWorkingdays);

  /**
   *handle date change and working days
   */
  const handleChangeDate = (date) => {
    setStartDate(date);

    const diff = moments(startDate).monthBusinessDays();
    setMonthlyWorkingDays(diff.length);
  };

  /*  
swal pop-up on final button click
*/
  const finalSalary = () => {
    Swal.fire({
      title: "You won't be able to make any changes after saving the data",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Save`,
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        setToggleInput(true);
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  /**
GET all users data  
*/

  const getAllData = async () => {
    const result = await listSalaryData();
    const response = handleResponse(result);
    if (response.success) {
      setgetAll(response.data.data);
    } else {
      toast(response.error);
    }
  };
  /**
Revoke getall API on page load
*/
  useEffect(() => {
    getAllData();
    handleChangeDate();
  }, []);

  /**
Dropdown select options data
  */
  const option = getAll.map((user) => ({
    value: user.id,
    label: user.name,
    name: user.name,
    id: user.id,
    salary: user.salary,
    bonus: user.salaries.bonus || 0,
    casual_leave: user.salaries.casual_leave || 0,
    non_casual_leave: user.salaries.non_casual_leave || 0,
    calculated_salary: user.salaries.calculated_salary || 0,
  }));

  /**
Set the selected employee in a state
    */
  const onChangeOptions = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  /*
   * handle change for Salary Calculation
   */
  const handleNonCl = (id, e) => {
    // debugger;
    let value = e.target.value;
    console.log("idddddddddddd", id);

    const selectedId = selectedOption.filter((user) => {
      return user.id === id;
    });

    selectedId[0].nonCasual = parseFloat(value) || 0;
    const tSalary = salaryCalculation(selectedId[0], monthlyWorkingdays);
    selectedId[0].calculated_salary = tSalary;
    setSelectedOption([...selectedOption], selectedId);
    console.log("idddddddddddd", selectedId);

    // const selectedUserId = selectedId[0].id;
  };

  /*
   * handle change for Bonus Calculation
   */
  const handleBonus = (id, e) => {
    // debugger;
    const value = e.target.value;
    const selectedId = selectedOption.filter((user) => {
      return user.id === id;
    });

    selectedId[0].bonus = parseFloat(value) || 0;
    const tSalary = salaryCalculation(selectedId[0], monthlyWorkingdays);
    selectedId[0].calculated_salary = tSalary;
    console.log("salaryyyyyyyy change in bonus", tSalary);
    console.log("monthlyWorkingdayschange in bonus", monthlyWorkingdays);

    setSelectedOption([...selectedOption], selectedId);
  };

  /**
   * 
salary calculation function
   */

  const salaryCalculation = (selectedId, monthlyWorkingdays) => {
    // debugger;
    console.log("selecteddd", selectedId);
    const monthlySalary = selectedId.salary;
    const workingDaysInMonth = monthlyWorkingdays || 0;
    const nonClLeaves = selectedId.nonCasual || 0;
    const bonus = selectedId.bonus || 0;
    const perDaySalary = monthlySalary / workingDaysInMonth;
    const nonClLeavesDeduction = perDaySalary * nonClLeaves;
    const totalSalary =
      monthlySalary - nonClLeavesDeduction + parseFloat(bonus);

    const salary = totalSalary.toFixed(2);
    console.log("salaryyyyy cal", salary);

    return salary;
  };

  console.log("state data of selectedOption", selectedOption);

  /**
   * save final salary api
   */

  const finalSalaryData = async () => {
    const result = await finalSalaryApi();
    console.log("result", result);

    const response = handleResponse(result);
    if (response.success) {
      toast("User registered successuly");
    } else {
      toast(response.error);
    }
  };

  return (
    <>
      <ToastContainer />
      <EmployeesHeader />
      {/* Page content */}

      <Container className="mt--8 " fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="mb-4">
                  <Col xs="8">
                    <button type="button" className="btn btn-outline-primary">
                      CSV
                    </button>
                    <button type="button" className="btn btn-outline-primary">
                      Bank CSV
                    </button>
                  </Col>{" "}
                  <Col xs="4" className="text-right">
                    <button onClick={finalSalary} className="btn btn-primary">
                      Final Salary
                    </button>

                    <button
                      className="btn btn-primary"
                      onClick={() => finalSalaryData(selectedOption)}
                      debugger
                    >
                      Save
                    </button>
                  </Col>
                </Row>
                <Row className="mb-2 row align-items-end">
                  <Col xs="4">
                    <label className="form-control-label" htmlFor="input-email">
                      Select month
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleChangeDate}
                      dateFormat="MMMM"
                      showMonthYearPicker
                      className="form-control"
                      placeholderText="Select date"
                    />
                  </Col>
                  <Col xs="4">
                    <label className="form-control-label" htmlFor="input-email">
                      Select year
                    </label>
                    <DatePicker
                      selected={startDate}
                      onChange={handleChangeDate}
                      dateFormat="yyyy"
                      showYearPicker
                      className="form-control"
                      placeholderText="Select year"
                    />
                  </Col>

                  <Col xs="4">
                    <label className="form-control-label" htmlFor="input-email">
                      Total working days
                    </label>
                    <Input
                      placeholder="working days"
                      value={monthlyWorkingdays}
                    />
                  </Col>
                </Row>
                <Row className="row align-items-end ">
                  <Col xs="12">
                    <label className="form-control-label" htmlFor="input-email">
                      Select Employee
                    </label>
                    <Select
                      placeholder="Select Employee"
                      onChange={onChangeOptions}
                      options={option}
                      isMulti
                    />
                  </Col>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead">
                  <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Salary</th>
                    <th scope="col">casual leaves</th>
                    <th scope="col">Non-casual</th>
                    <th scope="col">bonus</th>
                    <th scope="col">final salary</th>
                  </tr>
                </thead>
                {selectedOption.map((userData) => {
                  return (
                    <tbody>
                      <tr key={userData.id}>
                        <td>{userData.id}</td>
                        <td>{userData.label}</td>
                        <td>{userData.salary}</td>
                        <td>
                          <Input
                            type="number"
                            name="CL"
                            disabled={toggleInput}
                            // defaultValue={userData.casual_leave}
                            placeholder={userData.casual_leave}
                          />
                        </td>
                        <td>
                          <Input
                            type="number"
                            // defaultValue={userData.non_casual_leave}
                            placeholder={userData.non_casual_leave}
                            name="nonCasual"
                            disabled={toggleInput}
                            onChange={(e) => handleNonCl(userData.id, e)}
                          />
                        </td>

                        <td>
                          <Input
                            type="number"
                            name="bonus"
                            disabled={toggleInput}
                            placeholder={userData.bonus}
                            // defaultValue={userData.bonus}
                            onChange={(e) => handleBonus(userData.id, e)}
                          />
                        </td>
                        <td>{userData.calculated_salary || userData.salary}</td>
                      </tr>
                    </tbody>
                  );
                })}
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Salary;
