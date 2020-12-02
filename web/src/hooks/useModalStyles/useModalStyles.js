import { makeStyles } from '@material-ui/core/styles';

const useModalStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'center',
    margin: theme.spacing(5, 'auto'),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    outline: 'none',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
  },
}));

export default useModalStyles;
