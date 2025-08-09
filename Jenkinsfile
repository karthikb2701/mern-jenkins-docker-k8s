pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/karthikb2701/mern-jenkins-docker-k8s'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                sshagent(['aws-ec2-key']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no ec2-user@YOUR_EC2_PUBLIC_IP "
                        cd /var/www/mern-app &&
                        git pull &&
                        cd backend && npm install &&
                        cd ../frontend && npm install && npm run build &&
                        pm2 restart all
                        "
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
    }
}
