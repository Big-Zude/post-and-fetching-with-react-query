/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Theme } from '@material-ui/core';


const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 2
    // marginLeft: theme.spacing(3)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: 1
  },
  exportButton: {
    marginRight: 1
  },
  searchInput: {
    marginRight: 1
  }
}));

const ToolBar = props => {
  const { buttonText, formDialog: FormDialog } = props;
  const classes = useStyles();
  const { className, ...rest } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: any) => {
    setOpen(false);
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          onClick={handleClickOpen}
          variant="contained"
        >
          {buttonText}
        </Button>
      </div>
      <FormDialog handleClose={handleClose} open={open} />
    </div>
  );
};

ToolBar.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  formDialog: PropTypes.any.isRequired
};

export default ToolBar;
