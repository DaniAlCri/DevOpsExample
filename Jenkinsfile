pipeline {
  agent{
    label "cd-jenkins-jenkins-agent"
  }
  environment {
        PROJECT_ID = '<YOUR_PROJECT_ID>'
        CLUSTER_NAME = '<YOUR_CLUSTER_NAME>'
        LOCATION = '<YOUR_CLUSTER_LOCATION>'
        CREDENTIALS_ID = '<YOUR_CREDENTIAS_ID>'
    }

  stages {
    stage('build') {
      
      steps {
        echo 'Build stage'

        nodejs(nodeJSInstallationName: 'NodeJs') {
          sh 'npm config ls'
          sh 'npm install --global mocha'
          sh 'npm install -g mocha-junit-reporter'
        }

      }
    }
  

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs(nodeJSInstallationName: 'NodeJs') {
          sh 'npm test'
        }
        
      }
    }

    stage('deploy') {
      steps {
        echo 'Deploy stage'
        echo 'Will be deployed'

        $class: 'KubernetesEngineBuilder', 
          projectId: env.PROJECT_ID, 
          clusterName: env.CLUSTER_NAME, 
          location: env.LOCATION, 
          manifestPattern: 'manifest.yaml', 
          credentialsId: env.CREDENTIALS_ID,
          verifyDeployments: true])
      
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