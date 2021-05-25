pipeline {
  agent any

  stages {
    stage('build') {
      steps {
        echo 'Build stage'
        nodejs(nodeJSInstallationName: 'Node 14.x', configId: '<config-file-provider-id>') {
          sh 'npm config ls'
          bat 'npm install --global mocha'
          bat 'npm install -g mocha-junit-reporter'
        }
        
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