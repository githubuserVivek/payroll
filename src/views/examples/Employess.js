import {
  Col,
  Card,
  CardHeader,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import EmployeesHeader from "components/Headers/EmployeesHeader.js";
import { list } from "services/admin/common";
import { deleteEmployee } from "services/admin/common";
import "assets/scss/myCustomScss/Employee.scss";
import { handleResponse } from "ApiActions/common";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import {
  Dialog,
  DialogContentText,
  DialogTitle,
  DialogContent,
  TablePagination,
} from "@material-ui/core";
import { passworGen } from "services/admin/common";

const Employess = () => {
  const history = useHistory();
  const [apiData, setApiData] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [open, setOpen] = useState(false); //pending
  const [password, setPassword] = useState(""); //pending

  console.log("apiData", apiData);
  /**
  Revoke on load of page
*/
  useEffect(() => {
    getData(limit, page);
  }, [limit, page]);

  /**
Revoke function LIST all the employee's
*/
  const getData = async (limit, page) => {
    const result = await list(limit, page);

    /**
Revoke Handle response
@param {result}, list api response
*/
    const response = handleResponse(result);
    if (response.success) {
      setApiData(response.data.data);
    } else {
      history.push("/auth/login");
      toast(response.error);
    }
  };

  /** pending
Password Generation Pop-up open
*/
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**pending
Password Generation Pop-up close
*/
  const handleClose = () => {
    setOpen(false);
  };

  /**
Handle Change of rows per page (Limit)
  */
  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
  };

  /** 
Handle Change of pages (Page)
  */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /** pending
   Handle Password generator and
Revoke Password Generate Api for employee's 
@param {userID} , employee id
 */
  const passwordGenerator = async (userID) => {
    const result = await passworGen(userID);

    const response = handleResponse(result);
    if (response.success) {
      setPassword(response.data.data);
    } else {
      toast(response.error);
    }
  };

  /**
   Handle delete employee and
Revoke DeleteEmployee Api 
@param {deletedID} , employee id
 */

  const deleteUser = (deletedID) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      allowOutsideClick: false,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEmployee(deletedID);
        getData(limit, page);
      }
    });
  };
  return (
    <>
      <EmployeesHeader />
      <ToastContainer />
      {/* Page content */}

      {/* password pop-up start */}

      {/* Pending task  */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Reset Password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {password}
          </DialogContentText>
        </DialogContent>
       
       </Dialog> */}
      <Container className="mt--8 " fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="6">
                    <h3 className="mb-0">Employee's List</h3>
                  </Col>
                  <Col className="text-right" xs="6">
                    <Link to="/admin/add-employee" size="sm">
                      <Button
                        className="btn-icon btn-3 btn-sm"
                        color="primary"
                        type="button"
                      >
                        <span className="btn-inner--icon">
                          <i className="fa fa-plus"></i>
                        </span>
                        <span className="btn-inner--text"> Add Employee</span>
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Designation </th>

                    <th scope="col">Actions </th>
                  </tr>
                </thead>
                {apiData.length === 0 ? (
                  <div className="loader">
                    <p>No Data found</p>
                  </div>
                ) : (
                  <tbody>
                    {apiData.map((data, index) => {
                      return (
                        <tr key={index}>
                          <td>{data.id}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.phone_no}</td>
                          <td>{data.designation}</td>

                          <td>
                            <div className="threebutton">
                              <Link to={`/admin/view/${data.id}`}>
                                <button
                                  type="button"
                                  rel="tooltip"
                                  className="btn btn-info btn-icon btn-sm m-1 "
                                  title="View"
                                >
                                  <i
                                    className="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link>
                              <Link to={`/admin/edit-employee/${data.id}`}>
                                <button
                                  type="button"
                                  rel="tooltip"
                                  className="btn btn-success btn-icon btn-sm m-1 "
                                  title="Edit"
                                >
                                  <i
                                    className="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link>

                              <Link onClick={() => deleteUser(data.id)} to="#">
                                <button
                                  type="button"
                                  rel="tooltip"
                                  className="btn btn-danger btn-icon btn-sm m-1"
                                  data-original-title=""
                                  title="delete"
                                >
                                  <i
                                    className="fa fa-trash"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link>
                              {/* <Link pending task
                                to="#"
                                onClick={() => passwordGenerator(data.id)}
                              >
                                <button
                                  type="button"
                                  rel="tooltip"
                                  className="btn btn-primary btn-icon btn-sm m-1"
                                  data-original-title=""
                                  title="change password"
                                  onClick={handleClickOpen}
                                >
                                  <i
                                    className="fa fa-key"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link> */}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </Table>
              {/* Table content end */}
            </Card>
          </div>
        </Row>
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
    </>
  );
};

export default Employess;
