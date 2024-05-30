# Welcome to your CDK TypeScript project

This is a Mock project for CDK development with TypeScript. Idea is to create a three-tier application with AWS CDK using TypeScript involves defining resources for the presentation, application, and data tiers.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template


## A few more useful commands
npm install -g aws-cdk
cdk init app --language typescript
npm install @aws-cdk/aws-s3 @aws-cdk/aws-ec2 @aws-cdk/aws-rds @aws-cdk/aws-ecs @aws-cdk/aws-ecs-patterns


cdk synth
cdk bootstrap aws://615311846444/us-east-1
cdk diff (terraform plan equivalent)
cdk list
cdk deploy --all --require-approval never --profile default
cdk destroy '*' --force



rm -rf cdk.out
cdk synth


rm -rf node_modules
npm install
npm run build
npm run test


aws sts get-session-token --duration-seconds 3600
aws sts get-session-token --duration-seconds 129600

Response: 
{
    "Credentials": {
        "AccessKeyId": "AS...",
        "SecretAccessKey": "L5T...",
        "SessionToken": "IQoJ...",
        "Expiration": "2024-05-31T14:36:15+00:00"
    }
}


aws configure set aws_access_key_id ASI...
aws configure set aws_secret_access_key L5TB...
aws configure set region us-east-1
aws configure set aws_session_token IQo...

export AWS_ACCESS_KEY_ID=ASI...
export AWS_SECRET_ACCESS_KEY=L5T...
export AWS_REGION=us-east-1
export AWS_SESSION_TOKEN=IQo...


## Workflow design

Below is an outline of a rough architecture design based on the AWS CDK code base you are working with, which involves an EC2 instance with an Auto Scaling Group (ASG) and a VPC. Here's the design, application workflow, and AWS services used:

# Architecture Design

# Components:
1. **VPC (Virtual Private Cloud)**:
   - Provides isolated networking for your AWS resources.
   - Contains multiple subnets for distributing resources across different availability zones (AZs).

2. **Subnets**:
   - Public Subnets: Subnets accessible from the internet, typically used for resources that need direct internet access.
   - Private Subnets: Subnets not directly accessible from the internet, used for internal resources.

3. **Internet Gateway**:
   - Allows resources in the VPC to access the internet.

4. **Route Tables**:
   - Manages the routing of traffic within the VPC, includes routes for internet traffic via the Internet Gateway.

5. **EC2 Instance**:
   - Virtual server running in the cloud, hosted within the VPC.
   - Configured to run a specific application or workload.

6. **Auto Scaling Group (ASG)**:
   - Ensures that the number of EC2 instances adjusts automatically based on demand.
   - Uses scaling policies to add or remove instances as needed to maintain performance.

7. **Elastic Load Balancer (ELB)** (if included in your setup):
   - Distributes incoming traffic across multiple EC2 instances to ensure high availability and reliability.

8. **Security Groups**:
   - Acts as a virtual firewall for your EC2 instances to control inbound and outbound traffic.

9. **IAM Roles**:
   - Provides permissions to AWS services for EC2 instances and other resources to interact with other AWS services securely.


# Application Workflow

1. **User Request**:
   - Users send requests to the application via the internet.

2. **Routing via Load Balancer** (if applicable):
   - The Load Balancer receives the user requests and distributes them across multiple EC2 instances in the ASG.

3. **EC2 Instance Processing**:
   - Each EC2 instance processes the incoming request. The application running on the instances handles the business logic, retrieves data from any necessary sources, and generates a response.

4. **Auto Scaling**:
   - The Auto Scaling Group monitors the load on the EC2 instances. If the load increases, it automatically launches additional instances to handle the traffic. If the load decreases, it terminates instances to save costs.

5. **Security**:
   - Security Groups ensure that only the required traffic is allowed to and from the EC2 instances, enhancing the security posture of the application.


# AWS Services Used

1. **Amazon VPC**:
   - Provides networking capabilities and isolated environment for the application.

2. **Amazon EC2**:
   - Hosts the application on virtual servers.

3. **Auto Scaling**:
   - Manages the scaling of EC2 instances to handle varying load.

4. **Elastic Load Balancing** (if applicable):
   - Distributes incoming traffic across multiple EC2 instances.

5. **Amazon Route 53** (if DNS routing is needed):
   - Provides DNS services to route user traffic to the application.

6. **AWS IAM**:
   - Manages permissions and access for AWS services and resources.

7. **Amazon CloudWatch**:
   - Monitors the application and infrastructure, providing metrics and alarms for scaling decisions and operational insights.


# Diagram Representation

Here’s a textual representation of the architecture:

```
                +----------------------+
                |       Internet       |
                +----------+-----------+
                           |
                           v
                +----------------------+
                | Elastic Load Balancer|
                +----------+-----------+
                           |
                           v
               +-----------+-----------+
               |     Auto Scaling      |
               |      Group (ASG)      |
               +-----------+-----------+
                           |
            +--------------+--------------+
            |                             |
            v                             v
    +---------------+             +---------------+
    |   EC2 Instance|             |   EC2 Instance|
    +-------+-------+             +-------+-------+
            |                             |
            v                             v
+-----------+-----------+       +-----------+-----------+
|    Private Subnet     |       |    Private Subnet     |
|  (for internal apps)  |       |  (for internal apps)  |
+-----------+-----------+       +-----------+-----------+
            |
            v
+-----------+-----------+
|    Public Subnet      |
| (for Load Balancer)   |
+-----------+-----------+
            |
            v
+-----------+-----------+
|  Internet Gateway     |
+-----------------------+
```

# Summary

This design ensures that the application is highly available, scalable, and secure. It uses AWS managed services to minimize the operational overhead and provides a robust infrastructure for running web applications.



## File strcture in the project

```
aws-cdk-three-tier-app-infra/
│
├── bin/
│   └── my-three-tier-app.ts
│
├── lib/
│   ├── my-three-tier-app-stack.ts
│   ├── vpc.ts
│   ├── ecs-cluster.ts
│   ├── fargate-service.ts
│   ├── rds-database.ts
│   ├── load-balancer.ts
│
├── test/
│   └── my-three-tier-app.test.ts
│
├── cdk.json
├── package.json
├── README.md
├── tsconfig.json
└── .gitignore
```

Here's a quick explanation of the AWS CDK files and directories as per the above tree structure:


# Root Directory
- **`cdk.json`**: 
  - Contains configuration for the CDK toolkit, specifying how to run your CDK app.
- **`package.json`**: 
  - Manages dependencies and scripts for the project.
- **`README.md`**: 
  - Documentation for the project.
- **`tsconfig.json`**: 
  - TypeScript configuration file.
- **`.gitignore`**: 
  - Specifies files and directories to be ignored by Git.

# `bin/` Directory
- **`bin/my-three-tier-app.ts`**: 
  - Entry point of the CDK application. Defines the app and instantiates the main stack.

# `lib/` Directory
- **`lib/my-three-tier-app-stack.ts`**: 
  - Main stack definition file. Combines all resources to build the infrastructure.
- **`lib/vpc.ts`**: 
  - Defines the VPC (Virtual Private Cloud) configuration, including subnets and networking components.
- **`lib/ecs-cluster.ts`**: 
  - Defines the ECS (Elastic Container Service) cluster configuration.
- **`lib/fargate-service.ts`**: 
  - Defines the Fargate service configuration, including task definitions and container settings.
- **`lib/rds-database.ts`**: 
  - Defines the RDS (Relational Database Service) database configuration.
- **`lib/load-balancer.ts`**: 
  - Defines the Application Load Balancer configuration.

# `test/` Directory
- **`test/my-three-tier-app.test.ts`**: 
  - Contains tests for your CDK stack to ensure resources are created as expected.

This structure helps keep your CDK project organized and modular, making it easier to manage and extend.
