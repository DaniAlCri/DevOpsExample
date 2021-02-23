pipeline{
    agent any
    stages {
        stage('build') {
            steps {
                fileExists 'script.js'
                sh 'echo "Build stage"'
            }
        }
        stage('test'){
            steps{
                sh 'echo "Test stage"'
            }
        }
        stage('deploy'){
            steps{
                sh 'echo "Deploy stage"'

            }
        }
    }
    post{

    }
}
