# Deploy Docker Image to Server

This GitHub workflow is designed to deploy a Docker image to a server. It can be triggered manually or as part of an automated CI/CD pipeline.

## Workflow Inputs

### Inputs

`docker_user` (Required):

- Description: The Docker username to use to pull the image.
- Type: String
- Example: `your-docker-username`

`image_name` (Required):

- Description: The name of the Docker image to deploy.
- Type: String
- Example: `my-docker-image`

`deployment_user` (Required):

- Description: The user to SSH into the server as.
- Type: String
- Example: `ssh-user`

`host_port` (Required):

- Description: The port to expose the Docker container on.
- Type: Number
- Example: `8080`

`server_hostname` (Required):

- Description: The hostname of the server to deploy to.
- Type: String
- Example: `example.com`

### Secrets

You must set up the following secrets in your GitHub repository to securely store sensitive information:

`server_ssh_key` (Required):

- Description: The SSH key to use to connect to the server. Use `ssh-keygen` to generate a key pair. Add the public key to the server's `authorized_keys` file, and the private to this Github Secret.
- Example: Your private SSH key.

`server_ssh_port` (Required):

- Description: The SSH port to use to connect to the server.
- Example: `22`
