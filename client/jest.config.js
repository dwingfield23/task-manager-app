export default {
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	moduleFileExtensions: ["js", "jsx"],
	transform: {
		"^.+\\.jsx?$": "babel-jest",
	},
};
