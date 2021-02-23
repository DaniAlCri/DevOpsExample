pipeline{
    agent node{
        label 'nginx'
        customWorkspace '/usr/share/nginx/html'
    }
    environment{
        HTML_PATH '/usr/share/nginx/html/AddWebpage.html'
    }
    stages {
        stage('build') {
            steps {
                sh 'echo "Build stage"'
            }
        }
        stage('test'){
            steps{
                #Test javascript
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
