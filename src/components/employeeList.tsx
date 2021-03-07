import React from 'react';
import MUIDataTable from 'mui-datatables';
import { useQuery } from 'react-query';
import EmployeeForm from './employeeForm'
import ToolBar from './ToolBar';
import axios from '../clientProvider/axiosConfig';

const getEmployee = async () => {
  const { data } = await axios.get('http://dummy.restapiexample.com');
  return data.data;
};
const EmployeeList: React.FC = () => {
  const { data } = useQuery('create', getEmployee);
  return (
    <div style={{ padding: '50px', marginLeft: '250px' }}>
      <ToolBar buttonText="Employee" formDialog={EmployeeForm} />
      <MUIDataTable
        columns={[
          {
            name: '_id',
            label: 'id',
            options: {
              display: 'false',
              filter: false
            }
          },
          {
            name: 'employee_name',
            label: 'Employee Name',
            options: {
              filter: true,
              sort: true
            }
          },
          {
            name: "employee_salary",
            label: 'Employee Salary',
            options: {
              filter: true,
              sort: false,
              customBodyRender: (value, tableMeta, updateValue) => {
                const nf = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "ZMW",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                });
                return nf.format(value);
              }
            }
          },
          {
            name: 'employee_age',
            label: 'Age',
            options: {
              filter: true,
              sort: false
            }
          },
        ]}
        data={data}
        options={{
          filter: true,
          viewColumns: false,
          selectableRows: 'single',
          selectableRowsOnClick: true,
          elevation: 0,
          rowsPerPage: 10,
          responsive: 'simple',
          filterType: 'dropdown',
        }}
        title=""
      />
    </div>
  );
};

export default EmployeeList;
