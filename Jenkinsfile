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
        label 'gcloud-builder'
      }*/
      agent {
        image 'docker:dind'
      }
      
      steps {
                
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        echo "Image tag = ${IMAGE_TAG}"

        script{
          sh 'docker --version'
        }

        container (
          '''
          apiVersion: v1
            kind: Pod
            spec:
              containers:
                name: docker
                image: docker:dind
          '''
        ){
          script{
            sh 'ls'
          }
        }


        /*node('builder') {
          script{
            sh "ls"
        //    git '…' // checks out Dockerfile and some project sources
            def newApp = docker.build "eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}"
            newApp.push()
          }
        }*/
        /*script{
          docker.withRegistry("eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}") {
            def newApp = docker.build "eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}"
            //def myImg = docker.image('myImg')
            // or docker.build, etc.
            sh "docker pull --all-tags def newApp = docker.build eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}"//${myImg.imageName()}"
            // runs: docker pull --all-tags docker.mycorp.com/myImg
          }
        }*/


        //docker('docker'){
        /*docker.withServer('tcp://cd-jenkins.default.svc.cluster.local:8080/') {
          docker.build eu.gcr.io/${PROJECT_ID}/addwebpage:${env.BUILD_NUMBER}
            
          //}
        }*/
        /*script{ //container('docker') { 

        sh '''
          apt-get update
          apt-get install docker
          ls
          docker --version
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
      
      // En teoría revertiría el comando de git, evitando subir código no compilable al repositorio
      //git reset --hard HEAD@{1}

    }

  }
}