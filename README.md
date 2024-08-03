# Repro steps
* flutter create amplify_linux_demo
* cd amplify_linux_demo
* npm create amplify@latest -y
* flutter pub add amplify_flutter
* flutter pub add amplify_auth_cognito
* flutter pub add amplify_authenticator
* remplace main.dart by https://docs.amplify.aws/flutter/start/quickstart/
* rm -r amplify/data amplify/auth
* replace amplify/backend.ts with the below snippet
* npx ampx sandbox --outputs-format dart --outputs-out-dir lib
* run:
    * web: flutter run -d chrome --web-port 3084
        * result: OK
    * linux: flutter run -d linux
        * result: KO
        * open the default web brower (https://accounts.google.com/v3/signin/identifier?...)
        * when the Google login succeed, here the redirect url: http://localhost:3084/?code=xx-xx-xx-xx-xx&state=xx-xx
        * no redirection, the webpage display "Not found" (the request returns 404)
        * On the application, the button "Sign In with Google" does nothing 
        * Closing the chrome tab/chrome app change nothing
        * No debug log

# `backend.ts`

```ts
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

```