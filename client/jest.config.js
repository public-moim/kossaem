module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest',
    },
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png)$": "identity-obj-proxy",
        "axios": "axios/dist/node/axios.cjs"
      },
      "testEnvironment": "jsdom"
  };