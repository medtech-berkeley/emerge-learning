'use strict';
var path = require('path');

module.exports = {
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/*',
  ],
  modulePaths: [
    'frontend/assets',
    'frontend/assets/js'
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  setupFiles: [
    './jest-setup.js',
  ],
  collectCoverageFrom: [
    'frontend/assets/js/**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    'frontend/assets/js/app.jsx',
    'frontend/assets/js/index.jsx',
    'frontend/assets/js/tests/*',
  ],
  coverageThreshold: {
    global: {
      statements: 10,
    },
  },
  reporters: [
        'default', // keep the default reporter
        [
          "jest-junit", 
          {
            suiteName: "jest tests",
            outputDirectory: path.join(process.cwd(), "reports"),
            outputName: "js-xunit.xml",
            classNameTemplate: "{classname}-{title}",
            titleTemplate: "{classname}-{title}",
            ancestorSeparator: " › ",
            usePathForSuiteName: "true",
          }
        ]
    ]
};


