module.exports = {
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest" // 确保Jest使用babel-jest来转换这些文件
    },
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: [
      "**/__tests__/**/*.ts",
      "**/?(*.)+(spec|test).ts",
      "**/__tests__/**/*.js",
      "**/?(*.)+(spec|test).js",
    ],
    moduleFileExtensions: ["ts", "js", "json", "node"]
};