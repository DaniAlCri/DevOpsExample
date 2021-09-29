pipeline {
  agent any

  environment {
    PROJECT_ID  = 'proyectokubernetes-301509'
    APP_NAME = 'addwebpage'
    IMAGE_TAG = "eu.gcr.io/${PROJECT_ID}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
  }

  stages {
    stage('build') {
      
      steps {
        echo 'Build stage'

        nodejs('nodejs') {
          bat '''
            npm config ls
            npm install --global mocha
            npm install -g mocha-junit-reporter
          '''
        }


      }
    }
  

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs('nodejs') {
          bat 'npm test'
        }
      }
    }

    stage('deploy') {            
      steps {                
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        echo "Image tag = ${IMAGE_TAG}"

        docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:latest . 
        docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER} . 
        
      }      
    }
  }
  
post {
    success {
      echo 'Succesfull test'

        emailext(
          body: "Compilacion exitosa en build ${env.BUILD_URL}. Por favor, actualice la version del repositorio de ${IMAGE_TAG} \
            con los siguientes comandos. \
            <br> docker build -t ${IMAGE_TAG} . <br> docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:latest . <br>   \
            kubectl --namespace=production apply -f deploy/ <br> kubectl --namespace=production scale deployment \
            addwebpage-deploy --replicas=4",
          recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Compilacion exitosa ${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
        )
    }

    failure {
      echo 'Failed test, sending mail to developer'

      emailext(
          body: "Compilacion fallida ${env.BUILD_URL}. Por favor, revise el codigo.",
          recipientProviders: [[$class: 'DevelopersRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Error en build ${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
        )

    }

  }
}

