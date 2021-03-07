/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
  CircularProgress
} from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from '../clientProvider/axiosConfig';

const createEmployee = async (data: Employee) => {
  const { data: response } = await axios.post('https://employee.free.beeceptor.com/create', data);
  return response.data;
};

interface Employee {
  name: string;
  job: string;
  id: string;
};

const EmployeeForm = props => {
  const { open, handleClose } = props;
  const queryClient = useQueryClient();
  const { register, handleSubmit, errors } = useForm<Employee>({
    mode: 'onChange'
  });
  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: data => {
      console.log(data);
      const message = "success"
      alert(message)
    },
    onError: () => {
      alert("there was an error")
    },
    onSettled: () => {
      queryClient.invalidateQueries('create');
    }
  });
  const onSubmit = (data: Employee) => {
    const employee = {
      ...data
    };
    mutate(employee);
  };

  return (
    <div>
      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleClose}
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle color="primary" id="form-dialog-title">
            Employee
          </DialogTitle>
          <DialogContent>
            <DialogContentText>Add employee</DialogContentText>

            <TextField
              error={!!errors.name}
              inputRef={register({ required: true })}
              fullWidth
              id="name"
              label="Name"
              margin="dense"
              name="name"
              type="text"
              variant="outlined"
            />

            <TextField
              error={!!errors.job}
              inputRef={register({ required: true })}
              fullWidth
              id="job"
              label="Job"
              margin="dense"
              name="job"
              type="text"
              variant="outlined"
            />

            <TextField
              error={!!errors.id}
              inputRef={register({
                required: true
              })}
              fullWidth
              id="id"
              label="ID"
              margin="dense"
              name="id"
              type="text"
              variant="outlined"
            />

          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              variant="contained"
              disabled={isLoading}
              startIcon={
                isLoading ? (
                  <CircularProgress color="inherit" size={25} />
                ) : null
              }
            >
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

EmployeeForm.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool
};
// }
export default EmployeeForm;
