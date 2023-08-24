## Loan APP

This project was bootstrapped with Create React App, and then adapted to run 100% serverless with the Amplify CLI. Amplify CLI bootstrapped most of the backend code, wrote Cloudformation provisions to include the best services on AWS and as such this project was possible to be jumpstarted quickly. This seemed like the best decision to include as many features as possible in the least amount of time.
The tech stack used on this project is React on the frontend, with a backend written in Node.js, hosted on AWS, with Lambda, DynamoDB and API Gateway.
Tools used in the project are CloudWatch and Cognito.

## Requirements

I will be addressing the requirements one by one and explaining my decisions when relevant:
1. The project was developed entirely in Javascript, HTML and a little CSS.
2. The project is 100% serverless.
3. The application is secure with authentication through Cognito user pools. Checks are being made on the front-end to block bad login attempts.
4. The application has full CloudWatch coverage, provisioned by Amplify.
5. While the project is set up to be able to start implementing tests with Jest, these weren't written due to lack of time.
6. Git was used for version control.

## Bonus points

On this section I will be addressing the bonus points one by one and explaining my decisions when relevant:
1. All backend functionality is written on Lambda.
2. While I have read about Artillery, I never used it. I know that adapting your application to an event-driven approach using SQS or EventBridge can highly impact costs and performance for the better.
3. Amplify fully manages CI/CD. I have no experience writing pipelines, but I know what they are and what they achieve.
4. My understanding is that these 3 concepts are related. A VPC is a private cloud where you can host any service you want (if allowed). The load balancer distributes traffic to those services hosted on diferent VPC's, based on which VPC's have the least traffic. Auto scaling simply provisions new VPC's based on the load that the other VPC's have. If all VPC's are overloaded, new ones are created, if resources are not being used, some VPC's are taken down.
5. The provisions for this application were managed by Amplify. I don't have experience developing Terraform and rely on other services to help me provision. However you can find the CloudFormation script on this directory, under amplify/backend/awscloudformation.

## The application is live!

You can head over [HERE](https://dev.dz04ne4fxzh72.amplifyapp.com/) and use the application right now, straight from the cloud!
The homepage is a login screen, but there's an option to create an account.
When logging in, the app will redirect you to the relevant page, depending on if the registered user is a customer or an adviser.

## Available Scripts

Firstly, open a terminal on the project's root directory and run `npm install`. Let it finish.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Runs but there are no tests implemented.