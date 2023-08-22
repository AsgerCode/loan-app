import SignIn from './routes/signin';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function App() {
  return (
    <div className="App">
      <SignIn/>
    </div>
  );
}