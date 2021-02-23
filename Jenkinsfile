pipeline{
    agent node{
        label 'nginx'
        customWorkspace '/usr/share/nginx/html'
    }
    environment{
        HTML_PATH '/usr/share/nginx/html/AddWebpage.html'
        SCRIPT_PATH '/usr/share/nginx/html/script.html'
    }
    stages {
        stage('build') {
            steps {
                sh 'echo "Build stage"'
                sh 'cd ${env.SCRIPT_PATH}'
                sh 'node New.js '
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
