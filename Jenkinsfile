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
    stage('deploy') {
      steps {
        sh 'ls dist/*/'
      }
    }
  }
  environment {
    SW_PATH = '/var/www/scholarly-wallet'
  }
}