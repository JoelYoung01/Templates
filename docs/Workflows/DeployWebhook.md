### DeployWebhook workflow

Deploy an app by triggering an external deployment webhook from GitHub Actions.

#### What it does
- Sends a POST request to your webhook with header `x-webhook-secret` and JSON body `{ "appName": "<name>" }`.

#### Inputs
- **app_name** (string, required): The application identifier to include in the payload.

#### Required secrets
- **WEBHOOK_URL**: The full URL of the deployment webhook endpoint.
- **WEBHOOK_SECRET**: Shared secret used in the `x-webhook-secret` header.

#### Example: call this reusable workflow
```yaml
# .github/workflows/Call-DeployWebhook.yaml
name: Deploy via Webhook
on:
  workflow_dispatch:
    inputs:
      app_name:
        description: App name to deploy
        required: true
        type: string

jobs:
  deploy:
    uses: <owner>/<repo>/.github/workflows/DeployWebhook.yaml@main
    with:
      app_name: ${{ inputs.app_name }}
    secrets:
      WEBHOOK_URL: ${{ secrets.WEBHOOK_URL }}
      WEBHOOK_SECRET: ${{ secrets.WEBHOOK_SECRET }}
```

#### Request sent
Headers:
- `Content-Type: application/json`
- `x-webhook-secret: <WEBHOOK_SECRET>`

Body:
```json
{ "appName": "<app_name>" }
```

#### Notes
- If the webhook responds with 401/403, verify `WEBHOOK_SECRET` and endpoint URL.
- The job runs on `ubuntu-latest` and uses `curl` to perform the request.


