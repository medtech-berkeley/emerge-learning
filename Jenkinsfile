pipeline {
  agent any
  environment {
    ID = "${env.GIT_BRANCH}-${env.BUILD_ID}";
  }
  stages {
    stage('Set up and build') {
      steps {
        sh 'mkdir reports && chmod -R 777 reports'
        sh 'docker-compose -p $ID build'
        sh 'mkdir -p reports && chmod 777 reports'
      }
    }
    stage('Run Django Tests') {
      steps {
        sh 'docker-compose -p $ID -f docker-compose.yml -f testing.yml run -T interfaceserver sh test.sh'
      }
    }
    stage('Run React Tests') {
      steps {
        sh 'docker-compose -f docker-compose.yml -f testing.yml -p $ID run reactserver npm run test || true'
      }
    }
    stage('Collect and Publish Reports') {
      steps {
        junit 'reports/junit.xml'
        junit 'reports/js-xunit.xml'
        cobertura(autoUpdateHealth: true, failNoReports: true, failUnstable: true, coberturaReportFile: 'reports/coverage.xml')
      }
    }
    stage('Publish Live') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker tag builder.pernixsoft.ml:5000/stanford-quiz:$ID builder.pernixsoft.ml:5000/stanford-quiz:latest'
        sh 'docker push builder.pernixsoft.ml:5000/stanford-quiz:latest'
      }
    }
    stage('Publish to Development Server') {
      when {
        branch 'dev'
      }
      steps {
        sh 'docker tag builder.pernixsoft.ml:5000/stanford-quiz:$ID builder.pernixsoft.ml:5000/stanford-quiz:dev'
        sh 'docker push builder.pernixsoft.ml:5000/stanford-quiz:dev'
      }
    }
  }
  post {
    always {
      sh 'docker-compose -f docker-compose.yml -f testing.yml down -v'
      sh 'docker stop $(docker ps -qf "name=.*$ID.*") || true'
      sh 'docker container prune -f'
      sh 'docker rmi -f builder.pernixsoft.ml:5000/stanford-quiz:$ID'
      sh 'docker image prune -f'
      sh 'docker volume prune -f'
      sh 'docker network prune -f'
    }

  }
}

