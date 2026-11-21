#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ContactApiStack } from "../lib/contact-api-stack";

const app = new cdk.App();

new ContactApiStack(app, "VlBizbridgeContactApiStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
  // Verified SES domain identity (Easy DKIM records live in the Route 53 zone).
  sesDomain: "vlbizbridge.com",
  // Mailbox that receives website enquiries (GoDaddy Professional Email).
  toAddress: "support@vlbizbridge.com",
  allowedOrigins: [
    "https://www.vlbizbridge.com",
    "https://vlbizbridge.com",
    "https://main.d1g20vxn9j9w65.amplifyapp.com",
    "http://localhost:5173",
    "http://localhost:4173",
  ],
  tags: { project: "vlbizbridge" },
});
