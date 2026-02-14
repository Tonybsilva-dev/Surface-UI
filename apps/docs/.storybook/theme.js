"use strict";

const { create } = require("@storybook/theming");

/**
 * Tema customizado do Storybook.
 * Substitui a logo e o título na barra lateral.
 * Ficheiros estáticos (logo, favicon) vêm de apps/docs/public/.
 */
module.exports = create({
  base: "light",
  brandTitle: "Design System",
  brandUrl: "/",
  brandImage: "/surface.png",
  brandTarget: "_self",
});
