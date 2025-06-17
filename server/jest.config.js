//*
export default {
	testEnvironment: "node",
	transform: {
		"^.+\\.(ts|tsx)?$": "ts-jest",
		"^.+\\.(js|jsx)$": "babel-jest",
	},
	setupFiles: ["dotenv/config"],
};
//*/
/*
 module.exports = {
 //preset: "ts-jest",
 testEnvironment: "node",
 moduleFileExtensions: ["js"],
 setupFiles: ["dotenv/config"],
 transform: {
 "^.+\\.(js|jsx)$": "babel-jest",
 },
 };
 //*/
