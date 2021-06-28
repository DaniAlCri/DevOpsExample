pipeline {
  agent {
    label 'cd-jenkins-jenkins-agent'
  }
  stages {
    stage('build') {
      steps {
        echo 'Build stage'
        nodejs('nodejs') {
          sh 'npm config ls'
          sh 'npm install --global mocha'
          sh 'npm install -g mocha-junit-reporter'
        }

      }
    }

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs('nodejs') {
          sh 'npm test'
        }

      }
    }

    stage('deploy') {
      agent {
        dockerfile {
          filename 'Dockerfile'
        }

      }
      steps {
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        script {
          app = docker.build "eu.gcr.io/${PROJECT_ID}/addwebpage:B${env.BUILD_NUMBER}"
          docker.withRegistry("eu.gcr.io/${PROJECT_ID}/addwebpage:B${env.BUILD_NUMBER}", git){
            app.push("B${env.BUILD_NUMBER}")
            app.push('latest')

          }
        }

      }
    }

  }
  environment {
    PROJECT_ID = 'proyectokubernetes-301509'
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