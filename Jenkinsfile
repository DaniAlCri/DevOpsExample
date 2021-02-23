pipeline{
    agent any
    stages {
        stage('build') {
            steps {
                fileExists 'script.js'
                // sh en win10 no funciona, hay que usar bat
                bat 'echo "Build stage"'
            }
        }
        stage('test'){
            steps{
                bat 'echo "Test stage"'
            }
        }
        stage('deploy'){
            steps{
                bat 'echo "Deploy stage"'

            }
        }
    }
    post{

    }
}
