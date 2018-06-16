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
        sh 'docker-compose -f testing.yml up -d'
        sh 'docker-compose exec -T interfaceserver bash run_tests.sh'
      }
    }
    stage('Collect and Publish Reports') {
      steps {
        cobertura(autoUpdateHealth: true, failNoReports: true, failUnstable: true, coberturaReportFile: 'reports/coverage.xml')
        junit 'reports/junit.xml'
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