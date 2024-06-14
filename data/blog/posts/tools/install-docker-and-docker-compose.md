---
title: Installing Docker Compose, and Docker
date: '2023-01-24'
tags: ['Tools', 'Docker', 'Jenkins']
draft: false
summary: "
This guide details the installation of Docker and Docker Compose on a Linux machine. It covers updating the system, adding necessary repositories
"
---

# Installing Docker and Docker-Compose
This guide will walk you through the steps to install Docker, Jenkins, and set up Jenkins with Docker-Compose.

## Prerequisites

- A machine with a supported Linux distribution (Ubuntu 20.04 is used in this guide).
- A user with sudo privileges.

## Step 1: Install Docker

1. **Update your system:**

    ```sh
    sudo apt update
    sudo apt upgrade
    ```

2. **Install required packages:**

    ```sh
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    ```

3. **Add Docker’s official GPG key:**

    ```sh
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    ```

4. **Add the Docker repository:**

    ```sh
    echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    ```

5. **Update package database with Docker packages:**

    ```sh
    sudo apt update
    ```

6. **Install Docker:**

    ```sh
    sudo apt install docker-ce
    ```

7. **Verify Docker installation:**

    ```sh
    sudo systemctl status docker
    sudo docker --version
    ```

## Step 2: Install Docker Compose

1. **Download the latest version of Docker Compose:**

    ```sh
    sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep 'tag_name' | cut -d\" -f4)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    ```

2. **Apply executable permissions:**

    ```sh
    sudo chmod +x /usr/local/bin/docker-compose
    ```

3. **Verify Docker Compose installation:**

    ```sh
    docker-compose --version
    ```
## Conclusion

You have successfully installed Docker, Docker Compose,