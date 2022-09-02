import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class ConfirmationModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { fullScreen } = this.props;

    return (
      <div>
        <Dialog
          open={this.props.dialogOpen}
          onClose={this.props.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {this.props.modalTitle}
          </DialogTitle>
          <DialogContent>{'Are you sure want to delete?'}</DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleDialogClose} color="primary">
              No
            </Button>
            <Button
              onClick={() =>
                this.props.handleConfirmDeleteSituation(
                  this.props.selectedSituationId
                )
              }
              color="primary"
              autoFocus
            >
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmationModal.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ConfirmationModal);
