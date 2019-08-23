pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh 'nvm use 12.4.0'
      }
    }
    stage('build') {
      steps {
        echo 'BUILD STAGE'
        sh 'pwd'
      }
    }
  }
  environment {˘
    SW_PATH = '/var/www/scholarly-wallet'
  }
}
