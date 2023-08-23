import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Auth, API } from 'aws-amplify';

const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

export default function Adviser() {
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        // material UI has this implementation to build tables, so I decided to give it a go
        function createData(id, customerSSN, fullName, loan, equity, salary, date) {
            return { id, customerSSN, fullName, loan, equity, salary, date };
        };

        async function buildData() {
            const apiName = 'loanApi';
            const path = '/loans';
            const init = {
                headers: {
                    Authorization: `Bearer ${(await Auth.currentSession())
                        .getIdToken()
                        .getJwtToken()}`
                },
            };

            // we request the table items from the DB and format it so it can be parsed on the frontend
            API.get(apiName, path, init)
                .then((response) => {
                    let items = response.Items.map((item) => {
                        return createData(item.id["S"], item.customerSSN["S"], item.fullname["S"], item.loan["S"], item.equity["S"], item.salary["S"], item.date["S"]);
                    });
                    setRows(items);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        };

        buildData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main">
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
                        Loan database
                    </Typography>
                </Box>
                <Box
                    sx={{
                        marginTop: 3,
                        flexDirection: 'column',
                        alignItems: 'left',
                    }}
                >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Loan ID</TableCell>
                                <TableCell align="center">SSN</TableCell>
                                <TableCell align="center">Full Name</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Loan Amount</TableCell>
                                <TableCell align="center">Equity Amount</TableCell>
                                <TableCell align="center">Salary Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.id}</TableCell>
                                    <TableCell align="center">{row.customerSSN}</TableCell>
                                    <TableCell align="center">{row.fullName}</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.loan}</TableCell>
                                    <TableCell align="center">{row.equity}</TableCell>
                                    <TableCell align="center">{row.salary}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
            </Container>
        </ThemeProvider>
    )
}