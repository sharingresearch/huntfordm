module.exports = {
  displayName: "gravitational-lensing-simulation",
  preset: "../../jest.preset.js",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  coverageDirectory: "../../coverage/libs/gravitational-lensing-simulation",
};
