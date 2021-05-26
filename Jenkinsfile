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
        success {
          echo 'Succesfull test'

          //mail to: 'dalvac01@estudiantes.unileon.es',
          //  subject: "Successful comit: ${currentBuild.fullDisplayName}",
          //  body: "Everything is ok ${env.BUILD_URL}"

          //emailext body: 'Test Message',
          //  subject: 'Test Subject',
          //  to: 'dalvac01@estudiantes.unileon.es'

          emailext body: 'A Test EMail from Jenkins', 
            subject: "Successful comit: ${currentBuild.fullDisplayName}",
            to: 'debugthissheet@gmail.com'

        }
        failure {
            echo 'Failed test, sending mail to developer'
            //mail to: 'dalvac01@estudiantes.unileon.es',
            //    subject: "Failed commit: ${currentBuild.fullDisplayName}",
            //    body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}