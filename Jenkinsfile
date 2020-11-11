#!/usr/bin/env groovy

pipeline {
    agent {
        label {
            label 'aam-identity-prodcd'
        }
    }

    options {
        timestamps()
        timeout(time: 35, unit: 'MINUTES')
    }

    environment {
        TAG = "${getTag()}"
        REGISTRY = "886366864302.dkr.ecr.eu-west-1.amazonaws.com"
        IMAGE_NAME = "artsalliancemedia/screenwriter-online-frontend"
    }

    stages {

        stage('Terraform check') {
            environment {
                AWS_DEFAULT_REGION = "eu-west-1"
                TF_VAR_image_name = "${env.IMAGE_NAME}"
                TF_VAR_image_tag = "${env.TAG}"
            }
            parallel {
                stage("staging") {
                    steps {
                        dir ("infrastructure/staging") {
                            sh 'terraform init'
                            sh 'terraform plan -no-color -lock=false'
                        }
                    }
                }
                stage("production") {
                    steps {
                        dir ("infrastructure/production") {
                            sh 'terraform init'
                            sh 'terraform plan -no-color -lock=false'
                        }
                    }
                }
            }
        }

        stage('Build images') {
            steps {
                sh "make docker-build-frontend"
            }
        }

        stage('Git release') {
            when { anyOf { branch 'master' } }
            environment {
                GITHUB_TOKEN = "${env.GITHUB_TOKEN}"
            }
            steps {
                sh "git remote set-url origin git@github.com:artsalliancemedia/screenwriter-online-frontend.git"
                sh "git tag -f v${env.TAG}"
                sh "git push --tags"
            }
        }

        stage('Push images') {
            when { anyOf { branch 'master' } }
            steps {
                sh "make docker-push-frontend"
            }
        }


    }
    post {
        success {
            script {
                currentBuild.description = "Application version of this build: ${env.TAG}"
            }
        }
    }
}

def getTag() {
    if ("${env.BRANCH_NAME}" == "master")
        return sh(script: "make version", returnStdout: true).trim()
    return sh(script: "VERSION_SUFFIX=b${env.BUILD_NUMBER} make version", returnStdout: true).trim()
}
