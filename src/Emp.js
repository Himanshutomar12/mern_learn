import axios from "axios";
import { useEffect, useState } from "react";
import {Container, Row, Col, Form, Table, Button} from "react-bootstrap";
import * as Common from "./api";

function Emp() {
  const [empName, setEmpName] = useState("");
  const [empLastName, setEmpLastName] = useState("");
  const [empNum, setEmpNum] = useState("");
  const [onceRun, setOnceRun] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [empId, setEmpId] = useState("");
  const [updateForm, setUpdateForm] = useState(false);

  useEffect(() => {
    if(onceRun){
      return;
    }else {
      getEmployee();
      setOnceRun(true);
    }
  });

  const getEmployee = () => {
    Common.callApi(Common.apiShowEmployee, ["getapi"], (result) => {
      const resp = JSON.parse(result);
      setEmployeeList(resp);
    });
  }

  const addEmployee = () => {
    const obj = {
      firstName: empName,
      lastName: empLastName,
      mobile: empNum
    }
    Common.callApi(Common.apiAddEmployee, [JSON.stringify(obj)], (result) => {
      const resp = JSON.parse(result);
      if(resp.message == 1){
        setEmpName("");
        setEmpLastName("");
        setEmpNum("");
        getEmployee();
      }
    });
  }

  const deleteEmployee = (id) => {
    Common.callApi(Common.apiDeleteEmployee, ["deleteapi", id], (result) => {
      const resp = JSON.parse(result);
      if(resp.msg === 1){
          getEmployee();
      }
    });
  }

  const openEditForm = (id) => {
    setUpdateForm(true);
    Common.callApi(Common.apiFindById, ["getapis", id], (result) => {
      const resp = JSON.parse(result);
      console.log(resp);
      setFirstName(resp.firstName);
      setLastName(resp.lastName);
      setPhone(resp.mobile);
      setEmpId(resp._id);
    });
  }

  const updateEmployee = () => {
    const obj = {
      name: firstName,
      lname: lastName,
      phone: phone,
      id: empId
    }
    Common.callApi(Common.apiUpdateEmployee, ["updateapi", JSON.stringify(obj)], (result) => {
      const resp = JSON.parse(result);
      if(resp.msg === 1){
        setUpdateForm(false);
        getEmployee();
      }
    });
  }

  return (
    <>
    <Container>
      <h3 className="text-center">This is to learn mern stack</h3>
    {
      !updateForm ?
      <>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Employee Name</Form.Label>
              <Form.Control value={empName} onChange={e => setEmpName(e.target.value)} placeholder="first name"/>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Employee Last Name</Form.Label>
              <Form.Control value={empLastName} onChange={e => setEmpLastName(e.target.value)} placeholder="last name"/>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Employee Contact No</Form.Label>
              <Form.Control value={empNum} onChange={e => setEmpNum(e.target.value)} placeholder="Contact No"/>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <Button variant="outline-success" className="mt-4" size='sm' onClick={() => addEmployee()}>Add Employee</Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Table responsive bordered striped>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Joining date</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {
              employeeList.map(data => (
                <tr>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.mobile}</td>
                  <td>{data.createdAt}</td>
                  <td><span style={{cursor: "pointer", color: "blue"}} onClick={() => deleteEmployee(data._id)}>delete</span> 
                    <span className="mx-3" style={{cursor: "pointer", color: "blue"}} onClick={() => openEditForm(data._id)}>Edit</span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </Row>
      </>:
      <>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Id</Form.Label>
                <Form.Control value={empId} onChange={e => setEmpId(e.target.value)} disabled />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control value={firstName} onChange={e => setFirstName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>&nbsp;</Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control value={phone} onChange={e => setPhone(e.target.value)} />
              </Form.Group>
            </Col>
            <Col>&nbsp;</Col>
          </Row>
          <Row className="mt-3">
            <Col className="col-md-6">
              <Button variant="outline-success" size="sm" onClick={() => updateEmployee()}>Save Changes</Button>
              <Button variant="outline-danger" size="sm" className="mx-2" onClick={() => setUpdateForm(false)}>Back</Button>
            </Col>
          </Row>
        </Form>
      </>
    }
    </Container>
    </>
  );
}

export default Emp;
