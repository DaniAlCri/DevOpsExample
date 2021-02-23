pipeline{
    agent any
    stages {
        stage('build') {
            steps {
                fileExists 'script.js'
                // sh en win10 no funciona, hay que usar bat
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
                publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'webpage', reportFiles: 'index.html', reportName: 'HTML Report', reportTitles: 'addNumber'])

            }
        }
    }
}
