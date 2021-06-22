pipeline {
  agent {
    label 'cd-jenkins-jenkins-agent'
  }
  stages {
    stage('build') {
      steps {
        echo 'Build stage'
        nodejs('NodeJs') {
          sh 'npm config ls'
          sh 'npm install --global mocha'
          sh 'npm install -g mocha-junit-reporter'
        }

      }
    }

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs('NodeJs') {
          sh 'npm test'
        }

      }
    }

    stage('deploy') {
      /*agent {
        node {
          label 'deploy_pod'
        }

      }*/
      steps {
        echo 'Deploy stage'
        echo 'Will be deployed'
        /*node(label: deploy_pod) {
          sh 'http server'
        }*/
        sh 'npm install'
        sh 'npm install --global http-server'
        sh 'http-server'

      }
    }

  }
  post {
    success {
      echo 'Succesfull test'
      emailext(body: "Everything is ok ${env.BUILD_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
                  [$class: 'RequesterRecipientProvider']], subject: "Successful in build ${currentBuild.fullDisplayName}")
    }

    failure {
      echo 'Failed test, sending mail to developer'
      emailext(body: "Build failure ${env.BUILD_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
                  [$class: 'RequesterRecipientProvider']], subject: "Error in build ${currentBuild.fullDisplayName}")
    }

  }
}