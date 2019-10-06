# SCSS styleguide

We will use Sass 3 syntax for styles, known as SCSS.

In the project `devDependecies` we have installed and integrated stylelint which will lint our SCSS files according to defined rules from `stylelint-config-recommended`.

To make easier for us to automatically fix stylelint errors, we can set Prettier extension for our IDE (recommended IDE VS code which fully support this plugin and help us to speed up development process on proper way)
[Code formatting with prettier in VS Code](https://scotch.io/tutorials/code-formatting-with-prettier-in-visual-studio-code#toc-installing-the-prettier-extension) which will fix style `onSave`.

# BEM methodology

While writing the style, we will follow BEM methodology. Read more about [BEM methodology](https://en.bem.info/methodology/quick-start/). Also, if is necessary, BEM methodology approach could be combined with SMACSS methodolgy. Reda more about it in this [article](https://www.sitepoint.com/bem-smacss-advice-from-developers/).

## BEM methodology naming convention

There is many different naming convention for BEM methodology and all are mentioned in this [document](https://en.bem.info/methodology/naming-convention/). Since all developers should follow same naming convention, we should pick just one and follow it. Proposed and preferable naming convention for project should be [**two dashes style**](https://en.bem.info/methodology/naming-convention/#two-dashes-style). This can be changed and agreed between developers.
