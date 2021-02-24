pipeline {
  agent any
  stages {
    stage('build') {
      steps {
        sh 'echo "Build stage"'
        sh 'ls'
      }
    }

    stage('test') {
      steps {
        sh 'echo "Test stage"'
      }
    }

    stage('deploy') {
      steps {
        sh 'echo "Deploy stage"'
      }
    }

  }
}