import {
  init_ClassNameGenerator,
  init_capitalize,
  init_clamp,
  init_composeClasses,
  init_deepmerge,
  init_formatMuiErrorMessage,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_getDisplayName,
  init_resolveProps
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
  __esm,
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js
function chainPropTypes(propType1, propType2) {
  if (false) {
    return () => null;
  }
  return function validate(...args) {
    return propType1(...args) || propType2(...args);
  };
}
var init_chainPropTypes = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/chainPropTypes.js"() {
  }
});

// node_modules/@mui/utils/esm/chainPropTypes/index.js
var init_chainPropTypes2 = __esm({
  "node_modules/@mui/utils/esm/chainPropTypes/index.js"() {
    init_chainPropTypes();
  }
});

// node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js
function isHostComponent(element) {
  return typeof element === "string";
}
var isHostComponent_default;
var init_isHostComponent = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/isHostComponent.js"() {
    isHostComponent_default = isHostComponent;
  }
});

// node_modules/@mui/utils/esm/isHostComponent/index.js
var init_isHostComponent2 = __esm({
  "node_modules/@mui/utils/esm/isHostComponent/index.js"() {
    init_isHostComponent();
  }
});

// node_modules/@mui/utils/esm/setRef/setRef.js
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
var init_setRef = __esm({
  "node_modules/@mui/utils/esm/setRef/setRef.js"() {
  }
});

// node_modules/@mui/utils/esm/setRef/index.js
var init_setRef2 = __esm({
  "node_modules/@mui/utils/esm/setRef/index.js"() {
    init_setRef();
  }
});

// node_modules/@mui/utils/esm/useForkRef/useForkRef.js
function useForkRef(...refs) {
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }
    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, refs);
}
var React;
var init_useForkRef = __esm({
  "node_modules/@mui/utils/esm/useForkRef/useForkRef.js"() {
    "use client";
    React = __toESM(require_react());
    init_setRef2();
  }
});

// node_modules/@mui/utils/esm/useForkRef/index.js
var init_useForkRef2 = __esm({
  "node_modules/@mui/utils/esm/useForkRef/index.js"() {
    init_useForkRef();
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js
function appendOwnerState(elementType, otherProps, ownerState) {
  if (elementType === void 0 || isHostComponent_default(elementType)) {
    return otherProps;
  }
  return _extends({}, otherProps, {
    ownerState: _extends({}, otherProps.ownerState, ownerState)
  });
}
var appendOwnerState_default;
var init_appendOwnerState = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/appendOwnerState.js"() {
    init_extends();
    init_isHostComponent2();
    appendOwnerState_default = appendOwnerState;
  }
});

// node_modules/@mui/utils/esm/appendOwnerState/index.js
var init_appendOwnerState2 = __esm({
  "node_modules/@mui/utils/esm/appendOwnerState/index.js"() {
    init_appendOwnerState();
  }
});

// node_modules/@mui/utils/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default;
var init_clsx = __esm({
  "node_modules/@mui/utils/node_modules/clsx/dist/clsx.mjs"() {
    clsx_default = clsx;
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js
function extractEventHandlers(object, excludeKeys = []) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => prop.match(/^on[A-Z]/) && typeof object[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var extractEventHandlers_default;
var init_extractEventHandlers = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/extractEventHandlers.js"() {
    extractEventHandlers_default = extractEventHandlers;
  }
});

// node_modules/@mui/utils/esm/extractEventHandlers/index.js
var init_extractEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/extractEventHandlers/index.js"() {
    init_extractEventHandlers();
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js
function omitEventHandlers(object) {
  if (object === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object).filter((prop) => !(prop.match(/^on[A-Z]/) && typeof object[prop] === "function")).forEach((prop) => {
    result[prop] = object[prop];
  });
  return result;
}
var omitEventHandlers_default;
var init_omitEventHandlers = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/omitEventHandlers.js"() {
    omitEventHandlers_default = omitEventHandlers;
  }
});

// node_modules/@mui/utils/esm/omitEventHandlers/index.js
var init_omitEventHandlers2 = __esm({
  "node_modules/@mui/utils/esm/omitEventHandlers/index.js"() {
    init_omitEventHandlers();
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js
function mergeSlotProps(parameters) {
  const {
    getSlotProps,
    additionalProps,
    externalSlotProps,
    externalForwardedProps,
    className
  } = parameters;
  if (!getSlotProps) {
    const joinedClasses2 = clsx_default(additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
    const mergedStyle2 = _extends({}, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
    const props2 = _extends({}, additionalProps, externalForwardedProps, externalSlotProps);
    if (joinedClasses2.length > 0) {
      props2.className = joinedClasses2;
    }
    if (Object.keys(mergedStyle2).length > 0) {
      props2.style = mergedStyle2;
    }
    return {
      props: props2,
      internalRef: void 0
    };
  }
  const eventHandlers = extractEventHandlers_default(_extends({}, externalForwardedProps, externalSlotProps));
  const componentsPropsWithoutEventHandlers = omitEventHandlers_default(externalSlotProps);
  const otherPropsWithoutEventHandlers = omitEventHandlers_default(externalForwardedProps);
  const internalSlotProps = getSlotProps(eventHandlers);
  const joinedClasses = clsx_default(internalSlotProps == null ? void 0 : internalSlotProps.className, additionalProps == null ? void 0 : additionalProps.className, className, externalForwardedProps == null ? void 0 : externalForwardedProps.className, externalSlotProps == null ? void 0 : externalSlotProps.className);
  const mergedStyle = _extends({}, internalSlotProps == null ? void 0 : internalSlotProps.style, additionalProps == null ? void 0 : additionalProps.style, externalForwardedProps == null ? void 0 : externalForwardedProps.style, externalSlotProps == null ? void 0 : externalSlotProps.style);
  const props = _extends({}, internalSlotProps, additionalProps, otherPropsWithoutEventHandlers, componentsPropsWithoutEventHandlers);
  if (joinedClasses.length > 0) {
    props.className = joinedClasses;
  }
  if (Object.keys(mergedStyle).length > 0) {
    props.style = mergedStyle;
  }
  return {
    props,
    internalRef: internalSlotProps.ref
  };
}
var mergeSlotProps_default;
var init_mergeSlotProps = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/mergeSlotProps.js"() {
    init_extends();
    init_clsx();
    init_extractEventHandlers2();
    init_omitEventHandlers2();
    mergeSlotProps_default = mergeSlotProps;
  }
});

// node_modules/@mui/utils/esm/mergeSlotProps/index.js
var init_mergeSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/mergeSlotProps/index.js"() {
    init_mergeSlotProps();
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js
function resolveComponentProps(componentProps, ownerState, slotState) {
  if (typeof componentProps === "function") {
    return componentProps(ownerState, slotState);
  }
  return componentProps;
}
var resolveComponentProps_default;
var init_resolveComponentProps = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/resolveComponentProps.js"() {
    resolveComponentProps_default = resolveComponentProps;
  }
});

// node_modules/@mui/utils/esm/resolveComponentProps/index.js
var init_resolveComponentProps2 = __esm({
  "node_modules/@mui/utils/esm/resolveComponentProps/index.js"() {
    init_resolveComponentProps();
  }
});

// node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js
function useSlotProps(parameters) {
  var _parameters$additiona;
  const {
    elementType,
    externalSlotProps,
    ownerState,
    skipResolvingSlotProps = false
  } = parameters, rest = _objectWithoutPropertiesLoose(parameters, _excluded);
  const resolvedComponentsProps = skipResolvingSlotProps ? {} : resolveComponentProps_default(externalSlotProps, ownerState);
  const {
    props: mergedProps,
    internalRef
  } = mergeSlotProps_default(_extends({}, rest, {
    externalSlotProps: resolvedComponentsProps
  }));
  const ref = useForkRef(internalRef, resolvedComponentsProps == null ? void 0 : resolvedComponentsProps.ref, (_parameters$additiona = parameters.additionalProps) == null ? void 0 : _parameters$additiona.ref);
  const props = appendOwnerState_default(elementType, _extends({}, mergedProps, {
    ref
  }), ownerState);
  return props;
}
var _excluded, useSlotProps_default;
var init_useSlotProps = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/useSlotProps.js"() {
    "use client";
    init_extends();
    init_objectWithoutPropertiesLoose();
    init_useForkRef2();
    init_appendOwnerState2();
    init_mergeSlotProps2();
    init_resolveComponentProps2();
    _excluded = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
    useSlotProps_default = useSlotProps;
  }
});

// node_modules/@mui/utils/esm/useSlotProps/index.js
var init_useSlotProps2 = __esm({
  "node_modules/@mui/utils/esm/useSlotProps/index.js"() {
    init_useSlotProps();
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js
function isClassComponent(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function acceptingRef(props, propName, componentName, location, propFullName) {
  const element = props[propName];
  const safePropName = propFullName || propName;
  if (element == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  const elementType = element.type;
  if (typeof elementType === "function" && !isClassComponent(elementType)) {
    warningHint = "Did you accidentally use a plain function component for an element instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types, elementAcceptingRef;
var init_elementAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/elementAcceptingRef.js"() {
    import_prop_types = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementAcceptingRef = chainPropTypes(import_prop_types.default.element, acceptingRef);
    elementAcceptingRef.isRequired = chainPropTypes(import_prop_types.default.element.isRequired, acceptingRef);
  }
});

// node_modules/@mui/utils/esm/elementAcceptingRef/index.js
var init_elementAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementAcceptingRef/index.js"() {
    init_elementAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js
function isClassComponent2(elementType) {
  const {
    prototype = {}
  } = elementType;
  return Boolean(prototype.isReactComponent);
}
function elementTypeAcceptingRef(props, propName, componentName, location, propFullName) {
  const propValue = props[propName];
  const safePropName = propFullName || propName;
  if (propValue == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window === "undefined") {
    return null;
  }
  let warningHint;
  if (typeof propValue === "function" && !isClassComponent2(propValue)) {
    warningHint = "Did you accidentally provide a plain function component instead?";
  }
  if (warningHint !== void 0) {
    return new Error(`Invalid ${location} \`${safePropName}\` supplied to \`${componentName}\`. Expected an element type that can hold a ref. ${warningHint} For more information see https://mui.com/r/caveat-with-refs-guide`);
  }
  return null;
}
var import_prop_types2, elementTypeAcceptingRef_default;
var init_elementTypeAcceptingRef = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/elementTypeAcceptingRef.js"() {
    import_prop_types2 = __toESM(require_prop_types());
    init_chainPropTypes2();
    elementTypeAcceptingRef_default = chainPropTypes(import_prop_types2.default.elementType, elementTypeAcceptingRef);
  }
});

// node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js
var init_elementTypeAcceptingRef2 = __esm({
  "node_modules/@mui/utils/esm/elementTypeAcceptingRef/index.js"() {
    init_elementTypeAcceptingRef();
  }
});

// node_modules/@mui/utils/esm/exactProp/exactProp.js
function exactProp(propTypes) {
  if (false) {
    return propTypes;
  }
  return _extends({}, propTypes, {
    [specialProperty]: (props) => {
      const unsupportedProps = Object.keys(props).filter((prop) => !propTypes.hasOwnProperty(prop));
      if (unsupportedProps.length > 0) {
        return new Error(`The following props are not supported: ${unsupportedProps.map((prop) => `\`${prop}\``).join(", ")}. Please remove them.`);
      }
      return null;
    }
  });
}
var specialProperty;
var init_exactProp = __esm({
  "node_modules/@mui/utils/esm/exactProp/exactProp.js"() {
    init_extends();
    specialProperty = "exact-prop: ​";
  }
});

// node_modules/@mui/utils/esm/exactProp/index.js
var init_exactProp2 = __esm({
  "node_modules/@mui/utils/esm/exactProp/index.js"() {
    init_exactProp();
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js
var init_HTMLElementType = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/HTMLElementType.js"() {
  }
});

// node_modules/@mui/utils/esm/HTMLElementType/index.js
var init_HTMLElementType2 = __esm({
  "node_modules/@mui/utils/esm/HTMLElementType/index.js"() {
    init_HTMLElementType();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js
var ponyfillGlobal_default;
var init_ponyfillGlobal = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/ponyfillGlobal.js"() {
    ponyfillGlobal_default = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
  }
});

// node_modules/@mui/utils/esm/ponyfillGlobal/index.js
var init_ponyfillGlobal2 = __esm({
  "node_modules/@mui/utils/esm/ponyfillGlobal/index.js"() {
    init_ponyfillGlobal();
  }
});

// node_modules/@mui/utils/esm/refType/refType.js
var import_prop_types3, refType, refType_default;
var init_refType = __esm({
  "node_modules/@mui/utils/esm/refType/refType.js"() {
    import_prop_types3 = __toESM(require_prop_types());
    refType = import_prop_types3.default.oneOfType([import_prop_types3.default.func, import_prop_types3.default.object]);
    refType_default = refType;
  }
});

// node_modules/@mui/utils/esm/refType/index.js
var init_refType2 = __esm({
  "node_modules/@mui/utils/esm/refType/index.js"() {
    init_refType();
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
var init_createChainedFunction = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/createChainedFunction.js"() {
  }
});

// node_modules/@mui/utils/esm/createChainedFunction/index.js
var init_createChainedFunction2 = __esm({
  "node_modules/@mui/utils/esm/createChainedFunction/index.js"() {
    init_createChainedFunction();
  }
});

// node_modules/@mui/utils/esm/debounce/debounce.js
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
var init_debounce = __esm({
  "node_modules/@mui/utils/esm/debounce/debounce.js"() {
  }
});

// node_modules/@mui/utils/esm/debounce/index.js
var init_debounce2 = __esm({
  "node_modules/@mui/utils/esm/debounce/index.js"() {
    init_debounce();
    init_debounce();
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js
function deprecatedPropType(validator2, reason) {
  if (false) {
    return () => null;
  }
  return (props, propName, componentName, location, propFullName) => {
    const componentNameSafe = componentName || "<<anonymous>>";
    const propFullNameSafe = propFullName || propName;
    if (typeof props[propName] !== "undefined") {
      return new Error(`The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`);
    }
    return null;
  };
}
var init_deprecatedPropType = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/deprecatedPropType.js"() {
  }
});

// node_modules/@mui/utils/esm/deprecatedPropType/index.js
var init_deprecatedPropType2 = __esm({
  "node_modules/@mui/utils/esm/deprecatedPropType/index.js"() {
    init_deprecatedPropType();
  }
});

// node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js
function isMuiElement(element, muiNames) {
  var _muiName, _element$type;
  return React2.isValidElement(element) && muiNames.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (_muiName = element.type.muiName) != null ? _muiName : (_element$type = element.type) == null || (_element$type = _element$type._payload) == null || (_element$type = _element$type.value) == null ? void 0 : _element$type.muiName
  ) !== -1;
}
var React2;
var init_isMuiElement = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/isMuiElement.js"() {
    React2 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/isMuiElement/index.js
var init_isMuiElement2 = __esm({
  "node_modules/@mui/utils/esm/isMuiElement/index.js"() {
    init_isMuiElement();
  }
});

// node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
var init_ownerDocument = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/ownerDocument.js"() {
  }
});

// node_modules/@mui/utils/esm/ownerDocument/index.js
var init_ownerDocument2 = __esm({
  "node_modules/@mui/utils/esm/ownerDocument/index.js"() {
    init_ownerDocument();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
var init_ownerWindow = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/ownerWindow.js"() {
    init_ownerDocument2();
  }
});

// node_modules/@mui/utils/esm/ownerWindow/index.js
var init_ownerWindow2 = __esm({
  "node_modules/@mui/utils/esm/ownerWindow/index.js"() {
    init_ownerWindow();
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js
function requirePropFactory(componentNameInError, Component) {
  if (false) {
    return () => null;
  }
  const prevPropTypes = Component ? _extends({}, Component.propTypes) : null;
  const requireProp = (requiredProp) => (props, propName, componentName, location, propFullName, ...args) => {
    const propFullNameSafe = propFullName || propName;
    const defaultTypeChecker = prevPropTypes == null ? void 0 : prevPropTypes[propFullNameSafe];
    if (defaultTypeChecker) {
      const typeCheckerResult = defaultTypeChecker(props, propName, componentName, location, propFullName, ...args);
      if (typeCheckerResult) {
        return typeCheckerResult;
      }
    }
    if (typeof props[propName] !== "undefined" && !props[requiredProp]) {
      return new Error(`The prop \`${propFullNameSafe}\` of \`${componentNameInError}\` can only be used together with the \`${requiredProp}\` prop.`);
    }
    return null;
  };
  return requireProp;
}
var init_requirePropFactory = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/requirePropFactory.js"() {
    init_extends();
  }
});

// node_modules/@mui/utils/esm/requirePropFactory/index.js
var init_requirePropFactory2 = __esm({
  "node_modules/@mui/utils/esm/requirePropFactory/index.js"() {
    init_requirePropFactory();
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js
var React3, useEnhancedEffect, useEnhancedEffect_default;
var init_useEnhancedEffect = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/useEnhancedEffect.js"() {
    "use client";
    React3 = __toESM(require_react());
    useEnhancedEffect = typeof window !== "undefined" ? React3.useLayoutEffect : React3.useEffect;
    useEnhancedEffect_default = useEnhancedEffect;
  }
});

// node_modules/@mui/utils/esm/useEnhancedEffect/index.js
var init_useEnhancedEffect2 = __esm({
  "node_modules/@mui/utils/esm/useEnhancedEffect/index.js"() {
    init_useEnhancedEffect();
  }
});

// node_modules/@mui/utils/esm/useId/useId.js
function useGlobalId(idOverride) {
  const [defaultId, setDefaultId] = React4.useState(idOverride);
  const id = idOverride || defaultId;
  React4.useEffect(() => {
    if (defaultId == null) {
      globalId += 1;
      setDefaultId(`mui-${globalId}`);
    }
  }, [defaultId]);
  return id;
}
function useId(idOverride) {
  if (maybeReactUseId !== void 0) {
    const reactId = maybeReactUseId();
    return idOverride != null ? idOverride : reactId;
  }
  return useGlobalId(idOverride);
}
var React4, globalId, maybeReactUseId;
var init_useId = __esm({
  "node_modules/@mui/utils/esm/useId/useId.js"() {
    "use client";
    React4 = __toESM(require_react());
    globalId = 0;
    maybeReactUseId = React4["useId".toString()];
  }
});

// node_modules/@mui/utils/esm/useId/index.js
var init_useId2 = __esm({
  "node_modules/@mui/utils/esm/useId/index.js"() {
    init_useId();
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js
function unsupportedProp(props, propName, componentName, location, propFullName) {
  if (false) {
    return null;
  }
  const propFullNameSafe = propFullName || propName;
  if (typeof props[propName] !== "undefined") {
    return new Error(`The prop \`${propFullNameSafe}\` is not supported. Please remove it.`);
  }
  return null;
}
var init_unsupportedProp = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/unsupportedProp.js"() {
  }
});

// node_modules/@mui/utils/esm/unsupportedProp/index.js
var init_unsupportedProp2 = __esm({
  "node_modules/@mui/utils/esm/unsupportedProp/index.js"() {
    init_unsupportedProp();
  }
});

// node_modules/@mui/utils/esm/useControlled/useControlled.js
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = React5.useRef(controlled !== void 0);
  const [valueState, setValue] = React5.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  if (true) {
    React5.useEffect(() => {
      if (isControlled !== (controlled !== void 0)) {
        console.error([`MUI: A component is changing the ${isControlled ? "" : "un"}controlled ${state} state of ${name} to be ${isControlled ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${name} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join("\n"));
      }
    }, [state, name, controlled]);
    const {
      current: defaultValue
    } = React5.useRef(defaultProp);
    React5.useEffect(() => {
      if (!isControlled && !Object.is(defaultValue, defaultProp)) {
        console.error([`MUI: A component is changing the default ${state} state of an uncontrolled ${name} after being initialized. To suppress this warning opt to use a controlled ${name}.`].join("\n"));
      }
    }, [JSON.stringify(defaultProp)]);
  }
  const setValueIfUncontrolled = React5.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
var React5;
var init_useControlled = __esm({
  "node_modules/@mui/utils/esm/useControlled/useControlled.js"() {
    "use client";
    React5 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/useControlled/index.js
var init_useControlled2 = __esm({
  "node_modules/@mui/utils/esm/useControlled/index.js"() {
    init_useControlled();
  }
});

// node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js
function useEventCallback(fn) {
  const ref = React6.useRef(fn);
  useEnhancedEffect_default(() => {
    ref.current = fn;
  });
  return React6.useRef((...args) => (
    // @ts-expect-error hide `this`
    (0, ref.current)(...args)
  )).current;
}
var React6, useEventCallback_default;
var init_useEventCallback = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/useEventCallback.js"() {
    "use client";
    React6 = __toESM(require_react());
    init_useEnhancedEffect2();
    useEventCallback_default = useEventCallback;
  }
});

// node_modules/@mui/utils/esm/useEventCallback/index.js
var init_useEventCallback2 = __esm({
  "node_modules/@mui/utils/esm/useEventCallback/index.js"() {
    init_useEventCallback();
  }
});

// node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js
function useLazyRef(init, initArg) {
  const ref = React7.useRef(UNINITIALIZED);
  if (ref.current === UNINITIALIZED) {
    ref.current = init(initArg);
  }
  return ref;
}
var React7, UNINITIALIZED;
var init_useLazyRef = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/useLazyRef.js"() {
    "use client";
    React7 = __toESM(require_react());
    UNINITIALIZED = {};
  }
});

// node_modules/@mui/utils/esm/useLazyRef/index.js
var init_useLazyRef2 = __esm({
  "node_modules/@mui/utils/esm/useLazyRef/index.js"() {
    init_useLazyRef();
  }
});

// node_modules/@mui/utils/esm/useOnMount/useOnMount.js
function useOnMount(fn) {
  React8.useEffect(fn, EMPTY);
}
var React8, EMPTY;
var init_useOnMount = __esm({
  "node_modules/@mui/utils/esm/useOnMount/useOnMount.js"() {
    "use client";
    React8 = __toESM(require_react());
    EMPTY = [];
  }
});

// node_modules/@mui/utils/esm/useTimeout/useTimeout.js
function useTimeout() {
  const timeout = useLazyRef(Timeout.create).current;
  useOnMount(timeout.disposeEffect);
  return timeout;
}
var Timeout;
var init_useTimeout = __esm({
  "node_modules/@mui/utils/esm/useTimeout/useTimeout.js"() {
    "use client";
    init_useLazyRef();
    init_useOnMount();
    Timeout = class _Timeout {
      constructor() {
        this.currentId = null;
        this.clear = () => {
          if (this.currentId !== null) {
            clearTimeout(this.currentId);
            this.currentId = null;
          }
        };
        this.disposeEffect = () => {
          return this.clear;
        };
      }
      static create() {
        return new _Timeout();
      }
      /**
       * Executes `fn` after `delay`, clearing any previously scheduled call.
       */
      start(delay, fn) {
        this.clear();
        this.currentId = setTimeout(() => {
          this.currentId = null;
          fn();
        }, delay);
      }
    };
  }
});

// node_modules/@mui/utils/esm/useTimeout/index.js
var init_useTimeout2 = __esm({
  "node_modules/@mui/utils/esm/useTimeout/index.js"() {
    init_useTimeout();
    init_useTimeout();
  }
});

// node_modules/@mui/utils/esm/useOnMount/index.js
var init_useOnMount2 = __esm({
  "node_modules/@mui/utils/esm/useOnMount/index.js"() {
    init_useOnMount();
  }
});

// node_modules/@mui/utils/esm/useIsFocusVisible/useIsFocusVisible.js
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = React9.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = React9.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      hadFocusVisibleRecentlyTimeout.start(100, () => {
        hadFocusVisibleRecently = false;
      });
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
var React9, hadKeyboardEvent, hadFocusVisibleRecently, hadFocusVisibleRecentlyTimeout, inputTypesWhitelist;
var init_useIsFocusVisible = __esm({
  "node_modules/@mui/utils/esm/useIsFocusVisible/useIsFocusVisible.js"() {
    "use client";
    React9 = __toESM(require_react());
    init_useTimeout();
    hadKeyboardEvent = true;
    hadFocusVisibleRecently = false;
    hadFocusVisibleRecentlyTimeout = new Timeout();
    inputTypesWhitelist = {
      text: true,
      search: true,
      url: true,
      tel: true,
      email: true,
      password: true,
      number: true,
      date: true,
      month: true,
      week: true,
      time: true,
      datetime: true,
      "datetime-local": true
    };
  }
});

// node_modules/@mui/utils/esm/useIsFocusVisible/index.js
var init_useIsFocusVisible2 = __esm({
  "node_modules/@mui/utils/esm/useIsFocusVisible/index.js"() {
    init_useIsFocusVisible();
    init_useIsFocusVisible();
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js
var init_getScrollbarSize = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/getScrollbarSize.js"() {
  }
});

// node_modules/@mui/utils/esm/getScrollbarSize/index.js
var init_getScrollbarSize2 = __esm({
  "node_modules/@mui/utils/esm/getScrollbarSize/index.js"() {
    init_getScrollbarSize();
  }
});

// node_modules/@mui/utils/esm/scrollLeft/scrollLeft.js
var init_scrollLeft = __esm({
  "node_modules/@mui/utils/esm/scrollLeft/scrollLeft.js"() {
  }
});

// node_modules/@mui/utils/esm/scrollLeft/index.js
var init_scrollLeft2 = __esm({
  "node_modules/@mui/utils/esm/scrollLeft/index.js"() {
    init_scrollLeft();
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js
var React10;
var init_usePreviousProps = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/usePreviousProps.js"() {
    "use client";
    React10 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/usePreviousProps/index.js
var init_usePreviousProps2 = __esm({
  "node_modules/@mui/utils/esm/usePreviousProps/index.js"() {
    init_usePreviousProps();
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js
var React11;
var init_getValidReactChildren = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/getValidReactChildren.js"() {
    React11 = __toESM(require_react());
  }
});

// node_modules/@mui/utils/esm/getValidReactChildren/index.js
var init_getValidReactChildren2 = __esm({
  "node_modules/@mui/utils/esm/getValidReactChildren/index.js"() {
    init_getValidReactChildren();
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js
var visuallyHidden, visuallyHidden_default;
var init_visuallyHidden = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/visuallyHidden.js"() {
    visuallyHidden = {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      whiteSpace: "nowrap",
      width: "1px"
    };
    visuallyHidden_default = visuallyHidden;
  }
});

// node_modules/@mui/utils/esm/visuallyHidden/index.js
var init_visuallyHidden2 = __esm({
  "node_modules/@mui/utils/esm/visuallyHidden/index.js"() {
    init_visuallyHidden();
  }
});

// node_modules/@mui/utils/esm/integerPropType/integerPropType.js
function getTypeByValue(value) {
  const valueType = typeof value;
  switch (valueType) {
    case "number":
      if (Number.isNaN(value)) {
        return "NaN";
      }
      if (!Number.isFinite(value)) {
        return "Infinity";
      }
      if (value !== Math.floor(value)) {
        return "float";
      }
      return "number";
    case "object":
      if (value === null) {
        return "null";
      }
      return value.constructor.name;
    default:
      return valueType;
  }
}
function ponyfillIsInteger(x) {
  return typeof x === "number" && isFinite(x) && Math.floor(x) === x;
}
function requiredInteger(props, propName, componentName, location) {
  const propValue = props[propName];
  if (propValue == null || !isInteger(propValue)) {
    const propType = getTypeByValue(propValue);
    return new RangeError(`Invalid ${location} \`${propName}\` of type \`${propType}\` supplied to \`${componentName}\`, expected \`integer\`.`);
  }
  return null;
}
function validator(props, propName, ...other) {
  const propValue = props[propName];
  if (propValue === void 0) {
    return null;
  }
  return requiredInteger(props, propName, ...other);
}
function validatorNoop() {
  return null;
}
var isInteger;
var init_integerPropType = __esm({
  "node_modules/@mui/utils/esm/integerPropType/integerPropType.js"() {
    isInteger = Number.isInteger || ponyfillIsInteger;
    validator.isRequired = requiredInteger;
    validatorNoop.isRequired = validatorNoop;
  }
});

// node_modules/@mui/utils/esm/integerPropType/index.js
var init_integerPropType2 = __esm({
  "node_modules/@mui/utils/esm/integerPropType/index.js"() {
    init_integerPropType();
    init_integerPropType();
  }
});

// node_modules/@mui/utils/esm/types.js
var init_types = __esm({
  "node_modules/@mui/utils/esm/types.js"() {
  }
});

// node_modules/@mui/utils/esm/index.js
var init_esm = __esm({
  "node_modules/@mui/utils/esm/index.js"() {
    init_chainPropTypes2();
    init_deepmerge();
    init_deepmerge();
    init_elementAcceptingRef2();
    init_elementTypeAcceptingRef2();
    init_exactProp2();
    init_formatMuiErrorMessage();
    init_getDisplayName();
    init_HTMLElementType2();
    init_ponyfillGlobal2();
    init_refType2();
    init_capitalize();
    init_createChainedFunction2();
    init_debounce2();
    init_deprecatedPropType2();
    init_isMuiElement2();
    init_ownerDocument2();
    init_ownerWindow2();
    init_requirePropFactory2();
    init_setRef2();
    init_useEnhancedEffect2();
    init_useId2();
    init_unsupportedProp2();
    init_useControlled2();
    init_useEventCallback2();
    init_useForkRef2();
    init_useLazyRef2();
    init_useTimeout2();
    init_useOnMount2();
    init_useIsFocusVisible2();
    init_getScrollbarSize2();
    init_scrollLeft2();
    init_usePreviousProps2();
    init_getValidReactChildren2();
    init_visuallyHidden2();
    init_integerPropType2();
    init_resolveProps();
    init_composeClasses();
    init_generateUtilityClass();
    init_generateUtilityClass();
    init_generateUtilityClass();
    init_generateUtilityClasses();
    init_ClassNameGenerator();
    init_clamp();
    init_useSlotProps2();
    init_resolveComponentProps2();
    init_extractEventHandlers2();
    init_types();
  }
});

export {
  useEnhancedEffect_default,
  init_useEnhancedEffect2 as init_useEnhancedEffect,
  chainPropTypes,
  init_chainPropTypes2 as init_chainPropTypes,
  elementTypeAcceptingRef_default,
  init_elementTypeAcceptingRef2 as init_elementTypeAcceptingRef,
  exactProp,
  init_exactProp2 as init_exactProp,
  refType_default,
  init_refType2 as init_refType,
  createChainedFunction,
  init_createChainedFunction2 as init_createChainedFunction,
  debounce,
  init_debounce2 as init_debounce,
  deprecatedPropType,
  init_deprecatedPropType2 as init_deprecatedPropType,
  isMuiElement,
  init_isMuiElement2 as init_isMuiElement,
  ownerDocument,
  init_ownerDocument2 as init_ownerDocument,
  ownerWindow,
  init_ownerWindow2 as init_ownerWindow,
  requirePropFactory,
  init_requirePropFactory2 as init_requirePropFactory,
  setRef,
  init_setRef2 as init_setRef,
  useId,
  init_useId2 as init_useId,
  unsupportedProp,
  init_unsupportedProp2 as init_unsupportedProp,
  useControlled,
  init_useControlled2 as init_useControlled,
  useEventCallback_default,
  init_useEventCallback2 as init_useEventCallback,
  useForkRef,
  init_useForkRef2 as init_useForkRef,
  useTimeout,
  init_useTimeout2 as init_useTimeout,
  useIsFocusVisible,
  init_useIsFocusVisible2 as init_useIsFocusVisible,
  visuallyHidden_default,
  isHostComponent_default,
  init_isHostComponent2 as init_isHostComponent,
  extractEventHandlers_default,
  init_extractEventHandlers2 as init_extractEventHandlers,
  useSlotProps_default,
  init_useSlotProps2 as init_useSlotProps,
  init_esm
};
//# sourceMappingURL=chunk-4775JX3R.js.map
