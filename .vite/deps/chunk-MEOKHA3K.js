import {
  ThemeContext,
  createTheme_default,
  init_createTheme,
  init_resolveProps,
  init_styled_engine,
  require_jsx_runtime,
  resolveProps
} from "./chunk-FJOTTHUP.js";
import {
  _extends,
  _objectWithoutPropertiesLoose,
  init_extends,
  init_objectWithoutPropertiesLoose
} from "./chunk-XNISMBCV.js";
import {
  require_prop_types
} from "./chunk-QTX26RTD.js";
import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/system/esm/useThemeWithoutDefault.js
var React = __toESM(require_react());
init_styled_engine();
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme(defaultTheme = null) {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}
var useThemeWithoutDefault_default = useTheme;

// node_modules/@mui/system/esm/useTheme.js
init_createTheme();
var systemDefaultTheme = createTheme_default();
function useTheme2(defaultTheme = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme);
}
var useTheme_default = useTheme2;

// node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
init_resolveProps();
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

// node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme_default(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

// node_modules/@mui/system/esm/RtlProvider/index.js
init_extends();
init_objectWithoutPropertiesLoose();
var React2 = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["value"];
var RtlContext = React2.createContext();
function RtlProvider(_ref) {
  let {
    value
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  return (0, import_jsx_runtime.jsx)(RtlContext.Provider, _extends({
    value: value != null ? value : true
  }, props));
}
true ? RtlProvider.propTypes = {
  children: import_prop_types.default.node,
  value: import_prop_types.default.bool
} : void 0;
var useRtl = () => {
  const value = React2.useContext(RtlContext);
  return value != null ? value : false;
};
var RtlProvider_default = RtlProvider;

export {
  useThemeWithoutDefault_default,
  useTheme_default,
  useThemeProps,
  useRtl,
  RtlProvider_default
};
//# sourceMappingURL=chunk-MEOKHA3K.js.map
