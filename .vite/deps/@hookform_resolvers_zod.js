import {
  appendErrors,
  get,
  set
} from "./chunk-YIBVMIVI.js";
import "./chunk-2PA4WPI3.js";
import "./chunk-ROME4SDB.js";

// node_modules/@hookform/resolvers/dist/resolvers.mjs
var t = function(e, t3, i2) {
  if (e && "reportValidity" in e) {
    var n3 = get(i2, t3);
    e.setCustomValidity(n3 && n3.message || ""), e.reportValidity();
  }
};
var i = function(r, e) {
  var i2 = function(i3) {
    var n4 = e.fields[i3];
    n4 && n4.ref && "reportValidity" in n4.ref ? t(n4.ref, i3, r) : n4.refs && n4.refs.forEach(function(e2) {
      return t(e2, i3, r);
    });
  };
  for (var n3 in e.fields)
    i2(n3);
};
var n = function(t3, n3) {
  n3.shouldUseNativeValidation && i(t3, n3);
  var f = {};
  for (var a in t3) {
    var s = get(n3.fields, a), u = Object.assign(t3[a] || {}, { ref: s && s.ref });
    if (o(n3.names || Object.keys(t3), a)) {
      var c = Object.assign({}, get(f, a));
      set(c, "root", u), set(f, a, c);
    } else
      set(f, a, u);
  }
  return f;
};
var o = function(r, e) {
  return r.some(function(r2) {
    return r2.startsWith(e + ".");
  });
};

// node_modules/@hookform/resolvers/zod/dist/zod.mjs
var n2 = function(e, o2) {
  for (var n3 = {}; e.length; ) {
    var t3 = e[0], s = t3.code, i2 = t3.message, a = t3.path.join(".");
    if (!n3[a])
      if ("unionErrors" in t3) {
        var u = t3.unionErrors[0].errors[0];
        n3[a] = { message: u.message, type: u.code };
      } else
        n3[a] = { message: i2, type: s };
    if ("unionErrors" in t3 && t3.unionErrors.forEach(function(r) {
      return r.errors.forEach(function(r2) {
        return e.push(r2);
      });
    }), o2) {
      var c = n3[a].types, f = c && c[t3.code];
      n3[a] = appendErrors(a, o2, n3, s, f ? [].concat(f, t3.message) : t3.message);
    }
    e.shift();
  }
  return n3;
};
var t2 = function(r, t3, s) {
  return void 0 === s && (s = {}), function(i2, a, u) {
    try {
      return Promise.resolve(function(o2, n3) {
        try {
          var a2 = Promise.resolve(r["sync" === s.mode ? "parse" : "parseAsync"](i2, t3)).then(function(r2) {
            return u.shouldUseNativeValidation && i({}, u), { errors: {}, values: s.raw ? i2 : r2 };
          });
        } catch (r2) {
          return n3(r2);
        }
        return a2 && a2.then ? a2.then(void 0, n3) : a2;
      }(0, function(r2) {
        if (function(r3) {
          return null != r3.errors;
        }(r2))
          return { values: {}, errors: n(n2(r2.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u) };
        throw r2;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
};
export {
  t2 as zodResolver
};
//# sourceMappingURL=@hookform_resolvers_zod.js.map
