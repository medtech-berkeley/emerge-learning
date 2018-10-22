pipeline {
  agent any
  environment {
    ID = "${env.GIT_BRANCH}-${env.BUILD_ID}";
  }
  stages {
    stage('Set up and build') {
      steps {
        sh 'mkdir reports && chmod -R 777 reports'
        sh 'python3 build.py'
        sh 'mkdir -p reports && chmod 777 reports'
      }
    }
    stage('Run tests') {
      steps {
        sh 'docker-compose -p $ID -f docker-compose.yml -f testing.yml run -T interfaceserver sh test.sh'
      }
    }
    stage('Collect and Publish Reports') {
      steps {
        junit 'reports/junit.xml'
        cobertura(autoUpdateHealth: true, failNoReports: true, failUnstable: true, coberturaReportFile: 'reports/coverage.xml')
      }
    }
    stage('Publish Changes') {
      when {
        branch 'master'
      }
      steps {
        sh 'docker tag builder.pernixsoft.ml:5000/stanford-quiz:$ID builder.pernixsoft.ml:5000/stanford-quiz:latest'
        sh 'docker push builder.pernixsoft.ml:5000/stanford-quiz:latest'
      }
    }
  }
  post {
    always {
      sh 'docker-compose -f docker-compose.yml -f testing.yml down'
      sh 'docker container prune -f'
      sh 'docker volume prune -f'
      sh 'docker network prune -f'
    }

  }
}

