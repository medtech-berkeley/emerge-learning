pipeline {
  agent any
  stages {
    stage('Set up') {
      steps {
        sh 'mkdir reports && chmod -R 777 reports'
        sh 'python3 try_build.py'
      }
    }
    stage('Run tests') {
      steps {
        sh 'docker-compose -f docker-compose.yml -f testing.yml run -T interfaceserver bash run_tests.sh'
      }
    }
    stage('Collect and Publish Reports') {
      steps {
        junit 'reports/junit.xml'
        cobertura(autoUpdateHealth: true, failNoReports: true, failUnstable: true, coberturaReportFile: 'reports/coverage.xml')
      }
    }
  }
  post {
    always {
      sh 'docker-compose down'
      cleanWs(cleanWhenAborted: true, cleanWhenFailure: true, cleanWhenNotBuilt: true, cleanWhenSuccess: true, cleanWhenUnstable: true, cleanupMatrixParent: true, deleteDirs: true)

    }

  }
}