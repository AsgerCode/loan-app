import SignIn from './routes/signin';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

// configuring AWS Amplify with our envs
Amplify.configure(awsExports);

// app entry point
export default function App() {
  return (
    <div className="App">
      <SignIn/>
    </div>
  );
}