"use client";
import "./chunk-UVPG6FN2.js";
import "./chunk-N6IHGAAP.js";
import {
  createBox
} from "./chunk-GL553UFU.js";
import "./chunk-J2ICA2KM.js";
import "./chunk-MEOKHA3K.js";
import {
  init_esm
} from "./chunk-4775JX3R.js";
import {
  ClassNameGenerator_default,
  createTheme_default2 as createTheme_default,
  generateUtilityClasses,
  identifier_default,
  init_generateUtilityClasses,
  init_identifier
} from "./chunk-FJOTTHUP.js";
import "./chunk-7Q5DTEMT.js";
import "./chunk-XNISMBCV.js";
import {
  require_prop_types
} from "./chunk-QTX26RTD.js";
import "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/material/Box/Box.js
var import_prop_types = __toESM(require_prop_types());

// node_modules/@mui/material/className/index.js
init_esm();

// node_modules/@mui/material/Box/Box.js
init_identifier();

// node_modules/@mui/material/Box/boxClasses.js
init_generateUtilityClasses();
var boxClasses = generateUtilityClasses("MuiBox", ["root"]);
var boxClasses_default = boxClasses;

// node_modules/@mui/material/Box/Box.js
var defaultTheme = createTheme_default();
var Box = createBox({
  themeId: identifier_default,
  defaultTheme,
  defaultClassName: boxClasses_default.root,
  generateClassName: ClassNameGenerator_default.generate
});
true ? Box.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Box_default = Box;
export {
  boxClasses_default as boxClasses,
  Box_default as default
};
//# sourceMappingURL=@mui_material_Box.js.map
