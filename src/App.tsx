import React from 'react'
import  queryClient from './clientProvider/clientProvider';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import EmployeeList from './components/employeeList';
import ResponsiveDrawer from './components/drawer';
const App=()=> {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <ResponsiveDrawer/>
        <EmployeeList/>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
