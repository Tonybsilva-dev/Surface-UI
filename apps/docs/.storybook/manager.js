"use strict";

const { addons } = require("@storybook/manager-api");
const theme = require("./theme");

addons.setConfig({ theme });
