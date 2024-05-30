// # test/my-three-tier-app.test.ts
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { ThreeTierAppStack } from '../lib/my-three-tier-app-stack';

test('Stack creation', () => {
  const app = new cdk.App();
  const stack = new ThreeTierAppStack(app, 'MyTestStack');
  const template = Template.fromStack(stack);
  template.resourceCountIs('AWS::EC2::VPC', 1);
  template.resourceCountIs('AWS::ECS::Cluster', 1);
  template.resourceCountIs('AWS::RDS::DBInstance', 1);
  template.resourceCountIs('AWS::ElasticLoadBalancingV2::LoadBalancer', 1);
});
