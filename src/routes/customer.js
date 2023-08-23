import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth, API } from 'aws-amplify';

// setting our theme up
const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Customer() {
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // initial setup for requesting out api to add this loan application to the DB later
    const apiName = 'loanApi';
    const path = '/loans';
    const init = {
      body: {
        // we are taking the ssn and concatenating it to a date string, then encoding into base64 to create a unique id
        id: btoa(data.get('ssn') + new Date().toLocaleString()),
        customerSSN: data.get('ssn'),
        fullname: data.get('fullname'),
        loan: data.get('loan'),
        equity: data.get('equity'),
        salary: data.get('salary'),
        date: new Date().toLocaleDateString()
      },
      headers: {
        // get the JWT token from our cognito user for authentication
        Authorization: `Bearer ${(await Auth.currentSession())
          .getIdToken()
          .getJwtToken()}`
      }
    };

    // field validity check
    if (!init.body.customerSSN || !init.body.fullname || !init.body.loan || !init.body.equity || !init.body.salary) {
      setError("Please fill all fields before applying for a loan.");
      return;
    };

    // regex for only numbers
    var numberReg = /^\d+$/;
    if (!numberReg.test(init.body.customerSSN)) {
      setError("Please input only numbers on the SSN field and try again.")
      return;
    }
    if (!numberReg.test(init.body.loan)) {
      setError("Please input only numbers on the Loan Amount field and try again.")
      return;
    }
    if (!numberReg.test(init.body.equity)) {
      setError("Please input only numbers on the Equity Amount field and try again.")
      return;
    }
    if (!numberReg.test(init.body.salary)) {
      setError("Please input only numbers on the Salary Amount field and try again.")
      return;
    }

    // regex for fullname with unicode for international names
    var fullNameReg = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    if (!fullNameReg.test(init.body.fullname)) {
      setError("Please input a valid name on the Full Name field and try again.")
      return;
    }

    // api call to add the loan to the DB
    API.post(apiName, path, init)
      .then((response) => {
        setError("")
        setSuccess("You have successfully submitted a loan application. Please standby as we review it.")
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Loan Request
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {error && <Grid item xs={12}>
                <Alert severity="error">{error.toString()}</Alert>
              </Grid>}
              {success && <Grid item xs={12}>
              <Alert severity="success">{success}</Alert>
              </Grid>}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ssn"
                  label="SSN"
                  name="ssn"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="fullname"
                  label="Full Name"
                  name="fullname"
                  autoComplete="full-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="loan"
                  label="Loan Amount"
                  id="loan"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="equity"
                  label="Equity Amount"
                  id="equity"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="salary"
                  label="Salary Amount"
                  id="salary"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Apply for loan
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}