pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh 'nvm use 12.4.0'
        sh 'npm install'
      }
    }
    stage('build') {
      steps {
        echo 'BUILD STAGE'
        sh 'ng build --prod'
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