import { useContext, useEffect, useRef, useState } from "react";
import { Layout } from "../../../../containers/app/layout";
import { EmployeesWrapper } from "./styled";
import { Row } from "../../../../components/flex/styled";
import { BaseFieldSet } from "../../../../components/form/fieldset/styled";
import { BaseSelect } from "../../../../components/form/select/styled";
import { Label, P } from "../../../../components/typography/styled";
import { Span } from "../../../../components/typography/styled";
import { Table } from "../../../../components/table";
import { getAllEmployees } from "../../../../utils/apis/employee/getAllEmployees";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { BaseInput } from "../../../../components/form/input/styled";
import { getDepartments } from "../../../../utils/apis/department/getDepartments";
import { deleteEmployeeService } from "../../../../utils/apis/employee/deleteEmployee";
import { SuccessModal } from "../../../../containers/app/modals/successmodal";
import { AddEmployeeModal } from "../../../../containers/app/modals/addemployeemodal";
import { Context } from "../../../../context";
import { EmployeeBulkUploadModal } from "../../../../containers/app/modals/employeebulkuploadmodal";

export const Employees = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { setIsAddEmployeeModalOpen, isEmployeeBulkUploadModalOpen, setIsEmployeeBulkUploadModalOpen } =
    useContext(Context);

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [activeEmployeeId, setActiveEmployeeId] = useState(null);
  const [filter, setFilter] = useState({
    username: "",
    departmentId: "",
    jobTitle: "",
    status: "",
  });
  const [flag, setFlag] = useState(null);

  const handleCloseSuccessModal = () => {
    setFlag(null);
    return setIsSuccessModalOpen(false);
  };

  const handlePersistModal = () => {
    setIsSuccessModalOpen(true);
  };

  useEffect(() => {
    getAllEmployees(TOKEN, COMPANY_ID, filter)
      .then((data) => setEmployees(data))
      .catch((err) => {
        console.error("Failed to fetch employees:", err);
      });
  }, [TOKEN, COMPANY_ID, filter, activeEmployeeId, isEmployeeBulkUploadModalOpen]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await getDepartments(TOKEN, COMPANY_ID);
        return setDepartments(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, [TOKEN, COMPANY_ID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDropDownClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveEmployeeId(null);
    }
  };

  useEffect(() => {
    if (activeEmployeeId !== null) {
      document.addEventListener("mousedown", handleDropDownClickOutside);
    } else {
      document.removeEventListener("mousedown", handleDropDownClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleDropDownClickOutside);
    };
  }, [activeEmployeeId]);

  const handleAddEmployeeButtonClick = (e) => {
    e.stopPropagation();
    setFlag("add");
    setIsAddEmployeeModalOpen(true);
  };

  const navigateToAddNewEmployee = (e) => {
    e.preventDefault();
    return navigate("/addnewemployee");
  };

  const handleRowItemClick = (e, employeeId) => {
    e.stopPropagation();
    return setActiveEmployeeId(employeeId);
  };

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await deleteEmployeeService(
        TOKEN,
        COMPANY_ID,
        employeeId
      );
      if (response.status === "Success") {
        setFlag("delete");
        return setIsSuccessModalOpen(true);
      } else {
        setError("Delete department operation failed. Please try again.");
        return console.error(
          "Delete department operation failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowItemActionClick = async (e, employeeId, action) => {
    e.stopPropagation();
    if (!activeEmployeeId) return;
    switch (action) {
      case "edit":
        navigate(`/employees/${employeeId}`);
        break;
      case "delete":
        await deleteEmployee(employeeId);
        break;
      default:
        return;
    }
    return setActiveEmployeeId(null);
  };

  const handleUploadActionItemClick = (e, action) => {
    e.stopPropagation();
    switch (action) {
      case "single-employee-upload":
        navigateToAddNewEmployee(e);
        break;
      case "bulk-upload":
        setIsAddEmployeeModalOpen(false);
        setIsEmployeeBulkUploadModalOpen(true);
        break;
      case "download-template":
        // window.open(
        //   "https://res.cloudinary.com/dqj8v4x2h/raw/upload/v1698236485/Employee_Upload_Template"
        // );
        break;
      default:
        return;
    };
  };

  return (
    <Layout
      id={"employees"}
      title={"Employees"}
      location={"employees"}
      handleCallToActionClick={handleAddEmployeeButtonClick}
    >
      <EmployeesWrapper>
        <SuccessModal
          open={isSuccessModalOpen}
          handleClickOutside={handlePersistModal}
          className={"delete-employee-success-modal"}
          title={"Success"}
          message={`Employee has been successfully ${flag === "delete" ? "deleted" : "added"}`}
          callToAction={"Close"}
          handleCallToActionClick={handleCloseSuccessModal}
        />
        <AddEmployeeModal
          handleActionItemClick={handleUploadActionItemClick}
        />
        <EmployeeBulkUploadModal
          width={"40%"}
          height={"350px"}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
        />
        <Row className="heading-row" justifycontent={"space-between"}>
          <Span>Employee List</Span>
          <Span>See all</Span>
        </Row>
        <Row className="filter">
          <BaseFieldSet>
            <Label>Employee</Label>
            <BaseInput
              type="text"
              name="username"
              placeholder="Search by Employee"
              value={filter.username}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Department</Label>
            <BaseSelect
              name="departmentId"
              onChange={handleChange}
              value={filter.departmentId}
            >
              <option value="" hidden>
                Select Department
              </option>
              {departments.map((department, index) => (
                <option key={index} value={department.id}>
                  {department.name.replace(/\b\w/g, (char) =>
                    char.toUpperCase()
                  )}
                </option>
              ))}
            </BaseSelect>
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Job Title</Label>
            <BaseInput
              type="text"
              name="jobTitle"
              placeholder="Search by jobtitle"
              value={filter.jobTitle}
              onChange={handleChange}
            />
          </BaseFieldSet>
          <BaseFieldSet>
            <Label>Status</Label>
            <BaseSelect
              name="status"
              onChange={handleChange}
              value={filter.status}
            >
              <option value="" hidden>
                Select Status
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </BaseSelect>
          </BaseFieldSet>
        </Row>
        <div className="employees-table">
          <Table
            columnTitles={[
              "Employee",
              "Department",
              "Salary",
              "Hire Date",
              "Role",
              "Status",
              "Action",
            ]}
            rowItems={employees}
            location={"Employee Table"}
            activeRowId={activeEmployeeId}
            handleRowItemClick={handleRowItemClick}
            handleRowItemActionClick={handleRowItemActionClick}
            dropdownRef={dropdownRef}
          />
        </div>
        <div>{error && <P style={{ color: "red" }}>{error}</P>}</div>
      </EmployeesWrapper>
    </Layout>
  );
};
