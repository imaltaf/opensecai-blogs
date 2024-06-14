pipeline {
    agent {
        label 'DevOps_server'
    }

    environment {
        APP_NAME = "opensecai-blogs"
        RELEASE = "2.0.0"
        DOCKER_USER = "darkmechanic"
        DOCKER_PASS = 'dockerhub-credentials'  // Use Jenkins credentials for security
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
    }

    stages {
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

        stage('Clone Repository') {
            steps {
                script {
                    git(url: 'https://github.com/imaltaf/opensecai-blogs.git', branch: 'main')
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def dockerImage = docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'dockerhub-credentials') {
                        def dockerImage = docker.image("${IMAGE_NAME}:${IMAGE_TAG}")
                        dockerImage.push()
                    }
                }
            }
        }

        stage('Clean Up and Redeploy') {
            steps {
                script {
                    // Stop and remove existing containers
                    sh 'docker-compose down'

                    // Remove the old image
                    sh "docker rmi ${DOCKER_USER}/${APP_NAME}:latest || true"

                    // Redeploy the application with updated image
                    sh 'docker-compose up -d'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Add further actions here if needed.'
        }

        failure {
            echo 'Pipeline failed! Add further error handling here if needed.'
        }
    }
}
