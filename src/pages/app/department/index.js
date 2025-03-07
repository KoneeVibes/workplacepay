import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../containers/app/layout";
import { DepartmentWrapper } from "./styled";
import { H3 } from "../../../components/typography/styled";
import { getDepartments } from "../../../utils/apis/department/getDepartments";
import Cookies from "universal-cookie";
import { Table } from "../../../components/table";
import { deleteDepartmentService } from "../../../utils/apis/department/deleteDepartment";

export const Department = () => {
  const cookies = new Cookies();
  const TOKEN = cookies.get("TOKEN");
  const COMPANY_ID = cookies.get("COMPANY_ID");
  const columnHeaders = ["Department", "Action"]

  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [activeDepartmentId, setActiveDepartmentId] = useState(null);

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
  }, [TOKEN, COMPANY_ID, activeDepartmentId]);

  const handleDropDownClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setActiveDepartmentId(null);
    }
  };

  useEffect(() => {
    if (activeDepartmentId !== null) {
      document.addEventListener("mousedown", handleDropDownClickOutside);
    } else {
      document.removeEventListener("mousedown", handleDropDownClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleDropDownClickOutside);
    };
  }, [activeDepartmentId]);

  const navigateToAddNewDepartment = (e) => {
    e.preventDefault();
    return navigate("/adddepartment");
  };

  const handleRowItemClick = (e, departmentId) => {
    e.stopPropagation();
    return setActiveDepartmentId(departmentId);
  }

  const deleteDepartment = async (departmentId) => {
    try {
      await deleteDepartmentService(TOKEN, COMPANY_ID, departmentId);
      // open modal here
    } catch (error) {
      console.error(error);
    }
  }

  const handleRowItemActionClick = async (e, departmentId, action) => {
    e.stopPropagation();
    if (!activeDepartmentId) return;
    switch (action) {
      case "edit":
        navigate(`/departments/${departmentId}`)
        break;
      case "delete":
        await deleteDepartment(departmentId);
        break;
      default:
        return
    };
    return setActiveDepartmentId(null);
  }

  return (
    <Layout
      id={"departments"}
      title={"Departments"}
      location={"departments"}
      callToAction={"Add Department"}
      handleCallToActionClick={navigateToAddNewDepartment}
    >
      <DepartmentWrapper>
        <div
          className="heading"
        >
          <H3>All Departments</H3>
        </div>
        <div
          className="departments-table"
        >
          <Table
            columnTitles={columnHeaders}
            rowItems={departments}
            location={"Departments Table"}
            activeRowId={activeDepartmentId}
            handleRowItemClick={handleRowItemClick}
            handleRowItemActionClick={handleRowItemActionClick}
            dropdownRef={dropdownRef}
          />
        </div>
      </DepartmentWrapper>
    </Layout>
  );
};
