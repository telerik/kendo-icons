# Kendo UI Icons
The **kendo-icons** is a monorepo for all Kendo UI icons that are used in the Kendo UI and Telerik UI for Blazor components. This repo contains all SVG and font icons, the related CSS, metadata and files, needed to use them in a project. The Kendo UI icons are available as NPM packages:
* font icons - https://www.npmjs.com/package/@progress/kendo-font-icons
* SVG icons - https://www.npmjs.com/package/@progress/kendo-svg-icons


## Setting up the repo
To setup the `kendo-icons` repo for work, follow these steps:
1. Clone the repository.
1. Run `npm run setup` in the terminal.

## Directory structure
The **kendo-icons** repo is organized in the following way:
- docs - contains a page, which visualizes all font icons.
- packages
    - font-icons - contains the Kendo UI icons font, the related CSS and font files.
    - svg-icons - contains the Kendo UI SVG icons definitions and metadata.
- scripts - various javascript files.
- src/telerik-icons - contains all Kendo UI SVG icons, a list with all available icons, the relevant icons categories, ids and other properties.

## Usage
More details about the icons, their installation, usage etc. could be found in the **Progress Design System**:

* Font Icons - https://www.telerik.com/design-system/docs/foundation/iconography/font-icons/

* SVG Icons - https://www.telerik.com/design-system/docs/foundation/iconography/svg-icons/

## SVG creation - the design flow:
- Create your icon in Adobe Illustrator and follow the guidelines described in https://www.telerik.com/design-system/docs/foundation/iconography/svg-icons/

- The final file is saved (exported) together with the canvas and these properties: 
<img src="https://github.com/telerik/web-components-ux/assets/52446546/ba24ed10-b2c9-408f-8299-c1d924f25396" width="460px">


  1. When the SVG icon file is ready add (upload) it to the folder https://github.com/telerik/kendo-icons/tree/develop/src/telerik-icons/solid
  2. Create a Branch with a meaningful name (e.g. "sparkles") and commit a message (e.g. "feat: add sparkles icon").
  3. In the created Pull Request write an additional note about the category in which the icon should be, as well as alias names if any, and assign Reviewers from the FE team.
