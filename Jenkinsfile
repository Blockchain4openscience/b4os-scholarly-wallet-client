pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        echo 'BUILD STAGE'
        sh 'pwd'
      }
    }
  }
  environment {
    SW_PATH = '/var/www/scholarly-wallet'
  }
}