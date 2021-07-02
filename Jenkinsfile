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
      /*agent {
        docker {
          image 'docker:dind'
        }
      }*/
      agent{
        kubernetes{
          yaml '''
          apiVersion: v1
            spec:
              containers:
                - name: jnlp
                  image: jenkins/inbound-agent:4.6-1
                  resources:
                    limits:
                      cpu: 1
                      memory: 2Gi
                    requests:
                      cpu: 1
                      memory: 2Gi
                  imagePullPolicy: Always
                  env:
                  - name: POD_IP
                    valueFrom:
                      fieldRef:
                        fieldPath: status.podIP
                  - name: DOCKER_HOST
                    value: tcp://localhost:8080
                - name: dind
                  image: docker:18.05-dind
                  securityContext:
                    privileged: true
                  volumeMounts:
                    - name: dind-storage
                      mountPath: /var/lib/docker
              volumes:
                - name: dind-storage
                  emptyDir: {}
      '''
        }
      }
      
      steps {
                
        echo 'Deploy stage'
        echo "Build number = ${env.BUILD_NUMBER}"
        echo "Image tag = ${IMAGE_TAG}"

        script{
          sh 'ls'
          sh 'docker --version'
        }

        /*container (
          '''
            apiVersion: v1 
            kind: Pod 
            metadata: 
                name: dind 
            spec: 
                containers: 
                  - name: docker-cmds 
                    image: docker:1.12.6 
                    command: ['docker', 'run', '-p', '80:80', 'httpd:latest'] 
                    resources: 
                        requests: 
                            cpu: 10m 
                            memory: 256Mi 
                    env: 
                      - name: DOCKER_HOST 
                        value: tcp://localhost:2375 
                  - name: dind-daemon 
                    image: docker:1.12.6-dind 
                    resources: 
                        requests: 
                            cpu: 20m 
                            memory: 512Mi 
                    securityContext: 
                        privileged: true 
                    volumeMounts: 
                      - name: docker-graph-storage 
                        mountPath: /var/lib/docker 
                volumes: 
                  - name: docker-graph-storage 
                    emptyDir: {}
          '''
        ){
          sh 'ls'
          script{
            sh 'ls'
            sh 'docker --version'
          }
        }*/


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