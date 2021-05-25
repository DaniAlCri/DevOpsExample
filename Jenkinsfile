pipeline {
  agent any

  stages {
    stage('build') {
      steps {
        echo 'Build stage'

        bat 'npm install --global mocha'
        bat 'npm install -g mocha-junit-reporter'
        bat 'npm --version'
      }
    }
  

    stage('test') {
      steps {
        echo 'Test stage'
        bat 'npm test'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploy stage'
      }
    }

  }

  post {
        sucess{
          echo 'Succesfull test'
        }
        failure {
            echo 'Failed test, sending mail to developer'
            mail to: 'dalvac01@estudiantes.unileon.es',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}