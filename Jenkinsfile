pipeline {
  agent {
    label 'cd-jenkins-jenkins-agent'
  }
  environment {
    PROJECT_ID  = 'proyectokubernetes-301509'
    APP_NAME = "addwebpage"
    FE_SVC_NAME = "${APP_NAME}-frontend"
    CLUSTER = "jenkins-cd"
    CLUSTER_ZONE = "eu-west1-b"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    JENKINS_CRED = "${PROJECT}"
  }

  stages {
    stage('build') {
      
      steps {
        echo 'Build stage'

        nodejs(nodeJSInstallationName: 'nodejs') {
          sh 'npm config ls'
          sh 'npm install --global mocha'
          sh 'npm install -g mocha-junit-reporter'
        }


      }
    }
  

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs(nodeJSInstallationName: 'nodejs') {
          sh 'npm test'
        }
      }
    }

    stage('deploy') {
            
      steps {
                
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        echo "Image tag = ${IMAGE_TAG}"
        
      }
      
    }
  }
  
  post {
    success {
      echo 'Succesfull test'
      /*emailext(
        body: "Everything is ok in build ${env.BUILD_URL}. Please, compile the new version after cheking for ${IMAGE_TAG}. \
          <br> docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:v1 . %m kubectl --namespace=production apply -f deploy/ %m \
          kubectl --namespace=production scale deployment addwebpage-deploy --replicas=4"
        , recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
        [$class: 'RequesterRecipientProvider']], subject: "Successful in build ${currentBuild.fullDisplayName}")*/
        emailext:
          body: "Everything is ok in build ${env.BUILD_URL}. Please, compile the new version after cheking for ${IMAGE_TAG}. \
            <br> docker build -t IMAGE_TAG . \\ docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:latest . \\ \%m \
            kubectl --namespace=production apply -f deploy/ %m \\ kubectl --namespace=production scale deployment \
            addwebpage-deploy --replicas=4",
          recipientProviders: [developers(), requestor()],
          subject: "Compilación exitosa ${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
    }

    failure {
      echo 'Failed test, sending mail to developer'
      emailext(body: "Build failure ${env.BUILD_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
                  [$class: 'RequesterRecipientProvider']], subject: "Error in build ${currentBuild.fullDisplayName}")
      
      // En teoría revertiría el comando de git, evitando subir código no compilable al repositorio
      //git reset --hard HEAD@{1}

    }

  }
}