pipeline {
  agent any

  tools{
      sh 'npm install --global mocha'
      sh 'npm install -g mocha-junit-reporter'
  }
  stages {
    stage('build') {
      steps {
        sh echo 'Build stage'
        sh 'ls'
      }
    }

    stage('test') {
      steps {
        sh echo 'Test stage'
        sh 'npm test'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploy stage'
      }
    }

  }

  post {
        failure {
            echo 'Failed test, sending mail to developer'
            mail to: 'dalvac01@estudiantes.unileon.es',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}