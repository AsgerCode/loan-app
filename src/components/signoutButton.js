import { Auth } from 'aws-amplify';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function SignoutButton() {
    const navigate = useNavigate();

    async function signOut() {
        try {
            await Auth.signOut();
            navigate("/");
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <Button
            type='submit'
            onClick={signOut}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: 200 }}
        >
            Sign Out
        </Button>
    )
};