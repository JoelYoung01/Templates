# Build Docker Image

This GitHub workflow is designed to build a Docker image from your code and push it to Docker Hub. It can be triggered manually or as part of an automated CI/CD pipeline.

## Prerequisites

Before you can use this workflow, ensure you have the following:

- A GitHub repository where your Docker project is hosted.
- A Docker Hub account where you want to push the Docker image.
- Access to the secrets mentioned below.

## Workflow Inputs

### Inputs

`docker_username` (Required):

- Description: Your Docker Hub username.
- Type: String
- Example: `your-docker-username`

`image_name` (Required):

- Description: The name of the Docker image you want to build and push.
- Type: String
- Example: `my-docker-image`

### Secrets

You must set up the following secret in your GitHub repository to securely store sensitive information:

`docker_access_key` (Required):

- Description: Your Docker Hub access key or password.
- Example: A long and secure access key generated from your Docker Hub account.
