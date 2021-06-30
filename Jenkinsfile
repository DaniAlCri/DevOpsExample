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
        nodejs('nodejs') {
          sh 'npm config ls'
          sh 'npm install --global mocha'
          sh 'npm install -g mocha-junit-reporter'
        }

      }
    }

    stage('test') {
      steps {
        echo 'Test stage'
        nodejs('nodejs') {
          sh 'npm test'
        }

      }
    }

    stage('deploy') {
      
      /*agent {
        dockerfile { filename 'Dockerfile' }
      }*/
      
      
      steps {
                
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        echo "Image tag = ${IMAGE_TAG}"
        
        /*withEnv(['GCLOUD_PATH=/var/jenkins_home/google-cloud-sdk/bin']) {
          sh 'ls'
          sh '$GCLOUD_PATH/gcloud --version'
        }*/

        container('gcloud') {
        ithEnv(['GCLOUD_PATH=/var/jenkins_home/google-cloud-sdk/bin']) {
          sh "PYTHONUNBUFFERED=1 gcloud builds submit -t ${IMAGE_TAG} ."
        }
        //sh "gcloud builds submit --config . ."

        echo 'container finished'
        /*script{ //container('docker') { 

        sh '''
          ls
          
          echo start building
          docker.build -t eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER} /
          echo Build success
          docker push eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}
          docker push eu.gcr.io/${PROJECT_ID}/addwebpage:
          kubectl create deployment addwebpage-app --image=eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}
          kubectl get services
        '''
        }*/
        
        
      }
      
      

      /*steps {
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"

        script{
          app = docker.build "eu.gcr.io/${PROJECT_ID}/addwebpage:B${env.BUILD_NUMBER}"
          docker.withRegistry("eu.gcr.io/${PROJECT_ID}/addwebpage:B${env.BUILD_NUMBER}", git){
            app.push("B${env.BUILD_NUMBER}") 
            app.push('latest')

          }
        }
        
        sh '''
          ls
          echo start building
          docker build -t eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER} /
          echo Build success
          docker push eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}
          docker push eu.gcr.io/${PROJECT_ID}/addwebpage:latest
          kubectl create deployment addwebpage-app --image=eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}
          kubectl get services
        '''



      }*/
    }

  }
  post {
    success {
      echo 'Succesfull test'
      //emailext(body: "Everything is ok ${env.BUILD_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
      //            [$class: 'RequesterRecipientProvider']], subject: "Successful in build ${currentBuild.fullDisplayName}")
    }

    failure {
      echo 'Failed test, sending mail to developer'
      //emailext(body: "Build failure ${env.BUILD_URL}", recipientProviders: [[$class: 'DevelopersRecipientProvider'], 
      //            [$class: 'RequesterRecipientProvider']], subject: "Error in build ${currentBuild.fullDisplayName}")
    }

  }
}