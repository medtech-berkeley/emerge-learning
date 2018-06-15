pipeline {
  agent any
  stages {
    stage('Set up') {
      steps {
        sh 'ls -la'
        sh 'exec python3 try_build.sh'
      }
    }
    stage('Run tests') {
      steps {
        sh '''docker-compose -f testing.yml up -d
'''
        sh 'docker-compose exec interfaceserver python3 manage.py jenkins --with-coverage'
      }
    }
    stage('Collect and Publish Reports') {
      steps {
        cobertura(autoUpdateHealth: true, failNoReports: true, failUnstable: true, coberturaReportFile: 'reports/coverage.xml')
        junit 'reports/junit.xml'
      }
    }
  }
}