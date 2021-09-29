pipeline {
  agent {
    label 'cd-jenkins-jenkins-agent'
  }
  environment {
    PROJECT_ID  = 'proyectokubernetes-301509'
    APP_NAME = "addwebpage"
    IMAGE_TAG = "gcr.io/${PROJECT}/${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
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

        //docker.withRegistry('https://registry.hub.docker.com', 'git') {            
        //docker.withRegistry('https://eu.gcr.io/${PROJECT_ID}/addwebpage:v1', 'git') {
        //  app.push("${env.BUILD_NUMBER}")            
        //  app.push("latest")  
        //}
        docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:v1 .
        docker push eu.gcr.io/${PROJECT_ID}/addwebpage:v1
        
      }
      
    }
  }
  
  post {
    success {
      echo 'Succesfull test, sending mail to developer'

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
      echo 'Failed test, sending mail to commiter'

      emailext(
          body: "Compilacion fallida ${env.BUILD_URL}. Por favor, revise el codigo.",
          recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']],
          subject: "Error en compilacion ${APP_NAME}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"
        )

    }

  }
}


