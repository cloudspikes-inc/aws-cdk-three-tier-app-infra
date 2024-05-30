// # lib/fargate-service.ts
import * as cdk from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

interface FargateServiceProps {
  cluster: ecs.Cluster;
  vpc: ec2.Vpc;
}

export class FargateService extends Construct {
  public readonly service: ecs.FargateService;

  constructor(scope: Construct, id: string, props: FargateServiceProps) {
    super(scope, id);

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
      memoryLimitMiB: 512,
      cpu: 256,
    });

    const container = taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromRegistry('amazon/amazon-ecs-sample'), // Replace with your Java application image
      logging: new ecs.AwsLogDriver({ streamPrefix: 'MyApp' }),
    });

    container.addPortMappings({
      containerPort: 8080,
    });

    this.service = new ecs.FargateService(this, 'FargateService', {
      cluster: props.cluster,
      taskDefinition: taskDefinition,
      desiredCount: 2,
      assignPublicIp: true,
    });
  }
}
