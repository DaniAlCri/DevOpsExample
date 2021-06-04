pipeline {
  agent any

  stages {
    stage('build') {
      steps {
        echo 'Build stage'

        sh '/usr/bin/npm install --global mocha'
        sh '/usr/bin/npm install -g mocha-junit-reporter'
        sh '/usr/bin/npm --version'
      }
    }
  

    stage('test') {
      steps {
        echo 'Test stage'
        sh '/usr/bin/npm test'
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploy stage'
        echo 'Will be deployed'
      }
    }

  }

  post {
        success {
          echo 'Succesfull test'

          //This message is only for debug. Will be removed in final versions.
          emailext body: "Everything is ok ${env.BUILD_URL}",
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
            [$class: 'RequesterRecipientProvider']], 
            subject: "Successful in build ${currentBuild.fullDisplayName}"

        }

        failure {
            echo 'Failed test, sending mail to developer'

            emailext body: "Build failure ${env.BUILD_URL}",
            recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
            [$class: 'RequesterRecipientProvider']], 
            subject: "Error in build ${currentBuild.fullDisplayName}"
        }
    }
}