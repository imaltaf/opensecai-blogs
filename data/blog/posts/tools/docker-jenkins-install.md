---
title: Installing Jenkins in Docker Compose, and Docker
date: '2023-01-24'
tags: ['Tools', 'Docker', 'Jenkins']
draft: false
summary: "
This guide details the installation of Jenkins on a Linux machine. It covers updating the system, adding necessary repositories, and installing each component. Docker and Docker Compose setup are followed by Jenkins installation and configuration. A Docker Compose file is provided to run Jenkins in a container. Finally, it explains how to access Jenkins and retrieve the initial admin password for setup.
"
---


# Installing Docker, Jenkins, and Docker-Compose Jenkins

This guide will walk you through the steps to install Docker, Jenkins, and set up Jenkins with Docker-Compose.

## Prerequisites

- A machine with a supported Linux distribution (Ubuntu 20.04 is used in this guide).
- A user with sudo privileges.


## Step 1 : Install Jenkins

1. **Add Jenkins repository key:**

    ```sh
    curl -fsSL https://pkg.jenkins.io/debian/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
    ```

2. **Add the Jenkins repository:**

    ```sh
    echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
    ```

3. **Update package database:**

    ```sh
    sudo apt update
    ```

4. **Install Jenkins:**

    ```sh
    sudo apt install jenkins
    ```

5. **Start Jenkins:**

    ```sh
    sudo systemctl start jenkins
    ```

6. **Enable Jenkins to start at boot:**

    ```sh
    sudo systemctl enable jenkins
    ```

7. **Verify Jenkins installation:**

    ```sh
    sudo systemctl status jenkins
    ```

8. **Access Jenkins:**

    Open a web browser and navigate to `http://your_server_ip_or_domain:8080`. You will be prompted to enter an initial admin password.

    - Retrieve the password with:

      ```sh
      sudo cat /var/lib/jenkins/secrets/initialAdminPassword
      ```

## Step 2: Configure Jenkins with Docker-Compose

1. **Create a Docker Compose file for Jenkins:**

    ```yaml
        version: '3.8'

        services:
        jenkins:
            image: jenkins/jenkins:lts
            container_name: jenkins
            restart: always   # <-- Add restart policy here
            ports:
            - "8004:8080"
            - "50000:50000"
            volumes:
            - jenkins_home:/var/jenkins_home

        volumes:
        jenkins_home:

    ```

    Save this content to a file named `docker-compose.yml`.

2. **Start Jenkins using Docker Compose:**

    ```sh
    sudo docker-compose up -d
    ```

3. **Verify the Jenkins container is running:**

    ```sh
    sudo docker ps
    ```

4. **Access Jenkins:**

    Open a web browser and navigate to `http://your_server_ip_or_domain:8080`. Retrieve the initial admin password from the container:

    ```sh
    sudo docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
    ```
    ```sh
    docker ps
    ```
    ```
    CONTAINER ID   IMAGE                   COMMAND                  CREATED          STATUS                  PORTS                                                                                      NAMES
    7ccfa721451c   jenkins/jenkins:lts     "/usr/bin/tini -- /u…"   13 minutes ago   Up 12 minutes           0.0.0.0:50000->50000/tcp, :::50000->50000/tcp, 0.0.0.0:8004->8080/tcp, :::8004->8080/tcp   jenkins
    ```
    ```sh
    docker exec -it 7ccfa721451c /bin/bash
    ```

    
    ```sh
    cat /var/jenkins_home/secrets/initialAdminPassword
    ```

## Conclusion

You have successfully installed Docker, Docker Compose, and Jenkins. Additionally, you've set up Jenkins using Docker Compose. You can now start configuring Jenkins for your CI/CD pipelines.

For further customization and plugin installations, refer to the [Jenkins documentation](https://www.jenkins.io/doc/).
