pipeline{
    docker { image 'nginx' }
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

            }
        }
    }
}
