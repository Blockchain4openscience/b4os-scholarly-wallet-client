pipeline {
  agent any
  stages {
    stage('setup') {
      steps {
        sh '''export NVM_DIR="$HOME/.nvm" # set local path to NVM
. ~/.nvm/nvm.sh             # add NVM into the Shell session
nvm use v12.4.0             # choose current version
npm install
'''
      }
    }
    stage('build') {
      steps {
        echo 'BUILD STAGE'
        sh '''set +ex                     # immediate script fail off, echo off
export NVM_DIR="$HOME/.nvm" # set local path to NVM
. ~/.nvm/nvm.sh             # add NVM into the Shell session
nvm use 12.4.0            # choose current version
set -ex                     # immediate script fail on (default), echo on (default)
ng build --prod'''
      }
    }
    stage('deploy') {
      environment {
        SW_PATH = credentials('sw-path')
      }
      steps {
        sh 'cp -r dist/* $SW_PATH'
      }
    }
  }
}
