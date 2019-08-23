pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh '''# Node Version Manager with Jenkins
# https://github.com/creationix/nvm , https://www.sitepoint.com/quick-tip-multiple-versions-node-nvm/
set +ex                     # immediate script fail off, echo off
export NVM_DIR="$HOME/.nvm" # set local path to NVM
. ~/.nvm/nvm.sh             # add NVM into the Shell session
#nvm install v6.11.3        # first time only
nvm use v6.11.3             # choose current version
set -ex                     # immediate script fail on (default), echo on (default)'''
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