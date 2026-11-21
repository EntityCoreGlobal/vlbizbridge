import * as path from "node:path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as lambdaNode from "aws-cdk-lib/aws-lambda-nodejs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as logs from "aws-cdk-lib/aws-logs";

export interface ContactApiStackProps extends cdk.StackProps {
  /** Verified SES domain identity, e.g. "vlbizbridge.com". */
  sesDomain: string;
  /** Mailbox that receives enquiries. */
  toAddress: string;
  /** Exact browser origins allowed to call the API (no wildcard). */
  allowedOrigins: string[];
}

/**
 * Backend for the website enquiry form: HTTP API → Lambda → Amazon SES.
 * Modelled on EntityCore's ContactApiStack (company-portal/infrastructure).
 */
export class ContactApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ContactApiStackProps) {
    super(scope, id, props);

    const logGroup = new logs.LogGroup(this, "ContactHandlerLogs", {
      retention: logs.RetentionDays.ONE_MONTH,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const handler = new lambdaNode.NodejsFunction(this, "ContactHandler", {
      entry: path.join(__dirname, "../lambda/contact-handler/index.ts"),
      handler: "handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 256,
      timeout: cdk.Duration.seconds(10),
      logGroup,
      environment: {
        SES_FROM_ADDRESS: `VL Bizbridge Website <no-reply@${props.sesDomain}>`,
        TO_ADDRESS: props.toAddress,
      },
      bundling: { minify: true, sourceMap: true },
    });

    // Least privilege: may only send as the verified vlbizbridge.com identity.
    handler.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ["ses:SendEmail", "ses:SendRawEmail"],
        resources: [`arn:aws:ses:${this.region}:${this.account}:identity/${props.sesDomain}`],
      }),
    );

    const httpApi = new apigwv2.HttpApi(this, "ContactApi", {
      apiName: "vlbizbridge-contact-api",
      description: "VL Bizbridge website enquiry form backend",
      corsPreflight: {
        allowOrigins: props.allowedOrigins,
        allowMethods: [apigwv2.CorsHttpMethod.POST, apigwv2.CorsHttpMethod.OPTIONS],
        allowHeaders: ["Content-Type"],
        maxAge: cdk.Duration.hours(1),
      },
      createDefaultStage: true,
    });

    httpApi.addRoutes({
      path: "/contact",
      methods: [apigwv2.HttpMethod.POST],
      integration: new integrations.HttpLambdaIntegration("ContactIntegration", handler),
    });

    // Stage throttling is the primary abuse guard; the honeypot field is the second layer.
    const stage = httpApi.defaultStage!.node.defaultChild as apigwv2.CfnStage;
    stage.defaultRouteSettings = { throttlingBurstLimit: 10, throttlingRateLimit: 5 };

    new cdk.CfnOutput(this, "ContactEndpoint", {
      value: `${httpApi.apiEndpoint}/contact`,
      description: "Set as formEndpoint in src/config.js",
    });
  }
}
