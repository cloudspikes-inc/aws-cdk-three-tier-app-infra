// # lib/load-balancer.ts
import * as cdk from 'aws-cdk-lib';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';

interface LoadBalancerProps {
  vpc: ec2.Vpc;
  fargateService: ecs.FargateService;
}

export class LoadBalancer extends Construct {
  constructor(scope: Construct, id: string, props: LoadBalancerProps) {
    super(scope, id);

    const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
      vpc: props.vpc,
      internetFacing: true,
    });

    const listener = lb.addListener('Listener', {
      port: 80,
    });

    listener.addTargets('ECS', {
      port: 80,
      targets: [props.fargateService],
      healthCheck: {
        interval: cdk.Duration.seconds(60),
        path: '/',
        timeout: cdk.Duration.seconds(5),
      },
    });

    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: lb.loadBalancerDnsName,
    });
  }
}
