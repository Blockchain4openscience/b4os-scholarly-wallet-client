pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        echo 'BUILD STAGE'
        sh 'pwd'
      }
    }
    stage('setup') {
      steps {
        sh 'nvm use 12.4.0'
      }
    }
  }
  environment {
    SW_PATH = '/var/www/scholarly-wallet'
  }
}