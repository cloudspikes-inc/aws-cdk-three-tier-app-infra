// # lib/my-three-tier-app-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Vpc } from './vpc';
import { EcsCluster } from './ecs-cluster';
import { FargateService } from './fargate-service';
import { RdsDatabase } from './rds-database';
import { LoadBalancer } from './load-balancer';

export class ThreeTierAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'MyVpc');
    const cluster = new EcsCluster(this, 'MyCluster', { vpc: vpc.vpc });
    const dbInstance = new RdsDatabase(this, 'MyDatabase', { vpc: vpc.vpc });
    const fargateService = new FargateService(this, 'MyFargateService', { cluster: cluster.cluster, vpc: vpc.vpc });
    const loadBalancer = new LoadBalancer(this, 'MyLoadBalancer', { vpc: vpc.vpc, fargateService: fargateService.service });
  }
}