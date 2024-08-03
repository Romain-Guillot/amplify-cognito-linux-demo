import { defineBackend } from "@aws-amplify/backend";

const backend = defineBackend({});

backend.addOutput({
  auth: {
    aws_region: "eu-west-1",
    user_pool_id: "eu-west-1_XXX",
    user_pool_client_id: "XXX",
    identity_pool_id: "eu-west-1:XXX",
    username_attributes: ["email"],
    standard_required_attributes: ["email"],
    user_verification_types: ["email"],
    unauthenticated_identities_enabled: true,
    password_policy: {
      min_length: 8,
      require_lowercase: true,
      require_uppercase: true,
      require_numbers: true,
      require_symbols: true,
    },
    oauth: {
      identity_providers: ["GOOGLE"],
      domain: "XXX",
      redirect_sign_in_uri: [
        "amplify_linux_demo://",
        "http://localhost:3084",
        "http://localhost:3084/",
      ],
      redirect_sign_out_uri: [
        "amplify_linux_demo://",
        "http://localhost:3084",
        "http://localhost:3084/",
      ],
      scopes: [
        "aws.cognito.signin.user.admin",
        "email",
        "openid",
        "phone",
        "profile",
      ],
      response_type: "token",
    },
  },
});
