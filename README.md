# The Hunt for Dark Matter

An interactive game based on using gravitational lensing to look for dark matter

## Getting Started

This repository uses [NX](https://nx.dev/) to assist and simplify managing the repository. To get started simply clone this repository, run `npm install` and then `npm run nx serve grav-lensing`.

## Contributing

PRs are welcomed, and will be reviewed.

## Project Structure

This project is front-end only and built entirely in React. Styling is done using `emotion`, and routing done using `react-router`. The majority of code is in the `apps/grav-lensing/app` folder. Within this folder there a few useful starting points.

### Top Level Configuration

Common configurations are stored directly in the `config.ts` file. This includes things like the images used for Galaxy Stacking, and Tutorial Chapter markers.

Routes can be configured in `routes.ts` file.

### Components

The `components` folder contains all the various React components used in the app. This includes a wide variety of components from simple SVG icons, to `React Contexts` such as the `Game Manager`, that handle a lot of the logic in the app.

### Pages

The `pages` folder contains high-level React components that represent pages on the site. For example, each Tutorial page is in here. A page is directly linked to a `React Route`, so each page in this folder can be accessed by the appropriate URI.

### Util

The `util` folder contains non-react helper utilities.

### Assets

All assets (images, audio files, fonts, etc...) go in the `assets` folder. This is a special folder that is copied into the build directory when NX builds the app. SVG elements can either go here and be used like images, or can be placed in the `components` folder and used like React Components.

### Environments

NX utilises `environment` files to allow different configurations for different environments (e.g. local testing vs staging vs production). Currently the only configurable environment variable is the API key used for linking the app to an Amplitude account for analytics.

### Production Builds

To build for a production environment, first duplicate `apps/grav-lensing/src/environments/environment.ts` and rename it to `environment.prod.ts`. Then optionally specify an Amplitude API key for analytics (note this production version of the environment file is ignored by default, but be careful not to commit files with sensitive information such as API keys).

If you do choose to build and host a modified version of this app yourself we would be grateful if you placed a prominent link to the original host site https://gravitational-lensing.explored.info/

### Funding/Support

This project received financial support from “la Caixa” Foundation (ID 100010434, fellowship code LCF/BQ/PI19/11690018). This app is part of projects that received funding from the European Research Council (ERC) under support from the European Research Council under the European Union's Seventh Framework Programme (FP/2007-2013) (Grant Agreement Nos. [616170], [647112] and [725456] )
