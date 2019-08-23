pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh '''export NVM_DIR="$HOME/.nvm" # set local path to NVM
. ~/.nvm/nvm.sh             # add NVM into the Shell session
nvm use v12.4.0             # choose current version
'''
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