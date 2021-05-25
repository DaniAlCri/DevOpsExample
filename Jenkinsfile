pipeline {
  agent any

  tools{
    nodejs{
      def nodeHome = tool name: 'node-14.17.0', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
      bat 'npm install --global mocha'
      bat 'npm install -g mocha-junit-reporter'
    }
  }
  stages {
    stage('build') {
      steps {
        echo 'Build stage'
        bat "ls"
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
        failure {
            echo 'Failed test, sending mail to developer'
            mail to: 'dalvac01@estudiantes.unileon.es',
                subject: "Failed Pipeline: ${currentBuild.fullDisplayName}",
                body: "Something is wrong with ${env.BUILD_URL}"
        }
    }
}