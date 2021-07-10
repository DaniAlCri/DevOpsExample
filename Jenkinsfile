pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        echo 'Build stage'
        nodejs('nodejs') {
          bat '''
            npm config ls
            npm install --global mocha
            npm install -g mocha-junit-reporter
          '''
        }

      }
    }

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs('nodejs') {
          bat 'npm test'
        }

      }
    }

    stage('deploy') {
      steps {
        echo 'Deploy stage'
      }
    }

  }
  post {
    success {
      echo 'Succesfull test'
    }

    failure {
      echo 'Failed test, sending mail to developer'
    }

  }
}