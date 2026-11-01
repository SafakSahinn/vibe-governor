#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// cli/index.ts
var fs = __toESM(require("node:fs"));
var path = __toESM(require("node:path"));

// src/lib/rules.ts
var RULE_DEFS = [
  { id: "rust_unsafe", language: "Rust", toggle: "rustNoUnsafe", summary: "Rust no-unsafe" },
  { id: "rust_clone", language: "Rust", toggle: "rustLimitClone", summary: "Rust clone restrictions" },
  { id: "ts_any", language: "TypeScript", toggle: "tsNoAny", summary: "TypeScript no-any" },
  { id: "py_type_hints", language: "Python", toggle: "pyTypeHints", summary: "Python type hints" },
  { id: "py_no_global", language: "Python", toggle: "pyNoGlobalState", summary: "Python no global state / wildcard imports" },
  { id: "cpp_raw_ptr", language: "C++", toggle: "cppNoRawPointers", summary: "C++ no raw new/delete & reinterpret_cast" },
  { id: "go_errors", language: "Go", toggle: "goCheckErrors", summary: "Go explicit error checks" },
  { id: "verilog_assign", language: "Verilog", toggle: "hdlAssignmentRules", summary: "Verilog non-blocking (<=) sequential / blocking (=) combinational" },
  { id: "verilog_latch", language: "Verilog", toggle: "hdlLatchPrevention", summary: "Verilog latch prevention (case default)" },
  { id: "vhdl_numeric_std", language: "VHDL", toggle: "hdlAssignmentRules", summary: "VHDL ieee.numeric_std only" }
];
function isToggleActive(data, toggle, languages) {
  return Boolean(data.constraints[toggle]) && languages.some((l) => data.languages.includes(l));
}
function getEnabledRules(data) {
  return RULE_DEFS.filter((r) => isToggleActive(data, r.toggle, [r.language])).map((r) => r.id);
}
function getSafetySummary(data) {
  const enabled = new Set(getEnabledRules(data));
  const list2 = RULE_DEFS.filter((r) => enabled.has(r.id)).map((r) => r.summary);
  return list2.length > 0 ? list2.join(", ") : "strict typing & modularity";
}

// node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});

// node_modules/zod/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};
var ZodError = class _ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof _ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
};
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}

// node_modules/zod/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path: path2, errorMaps, issueData } = params;
  const fullPath = [...path2, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var ParseStatus = class _ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return _ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
};
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

// node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/v3/types.js
var ParseInputLazyPath = class {
  constructor(parent, value, path2, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path2;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
};
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
var ZodType = class {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
};
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
var ZodString = class _ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new _ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
var ZodNumber = class _ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
};
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodBigInt = class _ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new _ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new _ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
};
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
var ZodBoolean = class extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};
var ZodDate = class _ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new _ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
};
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
var ZodSymbol = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
var ZodUndefined = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
var ZodNull = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
var ZodAny = class extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
var ZodUnknown = class extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
};
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
var ZodNever = class extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
};
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
var ZodVoid = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
};
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
var ZodArray = class _ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new _ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new _ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new _ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
var ZodObject = class _ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {
      } else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new _ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new _ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new _ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index) {
    return new _ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new _ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
};
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
var ZodUnion = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
};
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [void 0];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [void 0, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};
var ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(discriminator, options, params) {
    const optionsMap = /* @__PURE__ */ new Map();
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new _ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
var ZodIntersection = class extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
};
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
var ZodTuple = class _ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new _ZodTuple({
      ...this._def,
      rest
    });
  }
};
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
var ZodRecord = class _ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new _ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new _ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
};
var ZodMap = class extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
};
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
var ZodSet = class _ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new _ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new _ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
};
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
var ZodFunction = class _ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new _ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new _ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new _ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
};
var ZodLazy = class extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
};
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
var ZodLiteral = class extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
};
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
var ZodEnum = class _ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return _ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
};
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
var ZodPromise = class extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
};
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
var ZodEffects = class extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
};
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
var ZodOptional = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
var ZodNullable = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
var ZodDefault = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
};
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
var ZodCatch = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
};
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
var ZodNaN = class extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
};
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");
var ZodBranded = class extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
};
var ZodPipeline = class _ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new _ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
};
var ZodReadonly = class extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
};
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;

// src/lib/schema.ts
var TARGET_PLATFORMS = [
  "CLAUDE_CLI",
  "ANTIGRAVITY",
  "CURSOR",
  "WINDSURF",
  "CLINE",
  "GITHUB_COPILOT"
];
var CODING_LANGUAGES = ["Rust", "TypeScript", "Python", "C++", "Go", "Verilog", "VHDL"];
var MAX_LINES_MIN = 200;
var MAX_LINES_MAX = 1500;
var DOC_SCORE_MIN = 5;
var DOC_SCORE_MAX = 10;
var MEMORY_TEXT_MAX = 5e3;
var memoryText = external_exports.string().max(MEMORY_TEXT_MAX, "text_too_long");
var wizardSchema = external_exports.object({
  locale: external_exports.enum(["tr", "en"]),
  targetPlatforms: external_exports.array(external_exports.enum(TARGET_PLATFORMS)).min(1, "platforms_min"),
  languages: external_exports.array(external_exports.enum(CODING_LANGUAGES)).min(1, "languages_min"),
  constraints: external_exports.object({
    maxLines: external_exports.number({ invalid_type_error: "max_lines_range" }).int("max_lines_range").min(MAX_LINES_MIN, "max_lines_range").max(MAX_LINES_MAX, "max_lines_range"),
    docScoreThreshold: external_exports.number({ invalid_type_error: "doc_score_range" }).int("doc_score_range").min(DOC_SCORE_MIN, "doc_score_range").max(DOC_SCORE_MAX, "doc_score_range"),
    rustNoUnsafe: external_exports.boolean(),
    rustLimitClone: external_exports.boolean(),
    tsNoAny: external_exports.boolean(),
    pyTypeHints: external_exports.boolean(),
    pyNoGlobalState: external_exports.boolean(),
    cppNoRawPointers: external_exports.boolean(),
    goCheckErrors: external_exports.boolean(),
    hdlAssignmentRules: external_exports.boolean(),
    hdlLatchPrevention: external_exports.boolean()
  }),
  memoryBank: external_exports.object({
    projectName: external_exports.string().trim().min(1, "project_name_required").max(80, "project_name_too_long"),
    projectBrief: memoryText,
    productContext: memoryText,
    systemPatterns: memoryText,
    techContext: memoryText,
    activeContext: memoryText,
    progress: memoryText
  }),
  automation: external_exports.object({
    includeCheckGuidelines: external_exports.boolean(),
    includePreCommitHook: external_exports.boolean(),
    includeGitHubCI: external_exports.boolean(),
    includeAuditPrompt: external_exports.boolean(),
    includeGitignore: external_exports.boolean()
  })
}).superRefine((data, ctx) => {
  const a = data.automation;
  if ((a.includePreCommitHook || a.includeGitHubCI) && !a.includeCheckGuidelines) {
    ctx.addIssue({
      code: external_exports.ZodIssueCode.custom,
      path: ["automation", "includeCheckGuidelines"],
      message: "checker_required"
    });
  }
});
var DEFAULT_FORM_DATA = {
  locale: "tr",
  targetPlatforms: ["ANTIGRAVITY", "CLAUDE_CLI", "CURSOR", "WINDSURF", "CLINE", "GITHUB_COPILOT"],
  languages: ["TypeScript", "Python", "Rust"],
  constraints: {
    maxLines: 800,
    docScoreThreshold: 8,
    rustNoUnsafe: true,
    rustLimitClone: true,
    tsNoAny: true,
    pyTypeHints: true,
    pyNoGlobalState: true,
    cppNoRawPointers: true,
    goCheckErrors: true,
    hdlAssignmentRules: true,
    hdlLatchPrevention: true
  },
  memoryBank: {
    projectName: "my-vibe-project",
    projectBrief: "",
    productContext: "",
    systemPatterns: "",
    techContext: "",
    activeContext: "",
    progress: ""
  },
  automation: {
    includeCheckGuidelines: true,
    includePreCommitHook: true,
    includeGitHubCI: true,
    includeAuditPrompt: true,
    includeGitignore: true
  }
};

// src/lib/preset.ts
function fromBase64Url(text) {
  const b64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "=".repeat((4 - b64.length % 4) % 4));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
function decodePreset(preset) {
  let raw;
  try {
    raw = JSON.parse(new TextDecoder().decode(fromBase64Url(preset.trim())));
  } catch {
    return { ok: false, error: "Preset is not valid base64url-encoded JSON." };
  }
  const parsed = wizardSchema.safeParse(raw);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
    return { ok: false, error: `Preset failed validation -> ${issues.join("; ")}` };
  }
  return { ok: true, data: parsed.data };
}

// src/lib/templates/guidelines.ts
var SOFTWARE_SECTIONS = [
  {
    language: "Rust",
    titleTr: "Rust",
    titleEn: "Rust",
    rules: [
      {
        toggle: "rustNoUnsafe",
        tr: "**Unsafe Kullan\u0131m Yasaklar\u0131:** Yapay zekan\u0131n bellek y\xF6netiminde kolay \xE7\xF6z\xFCme ka\xE7mas\u0131n\u0131 \xF6nlemek i\xE7in `unsafe` blok kullan\u0131m\u0131 kesinlikle yasakt\u0131r (a\xE7\u0131k kullan\u0131c\u0131 izni hari\xE7).",
        en: "**Ban on `unsafe`:** Using `unsafe` blocks is strictly forbidden unless explicitly requested by the user."
      },
      {
        toggle: "rustLimitClone",
        tr: "**Gereksiz Clone \xC7a\u011Fr\u0131lar\u0131:** Performans israf\u0131n\u0131 \xF6nlemek ad\u0131na gereksiz `.clone()` kullan\u0131m\u0131 engellenmeli; sahiplik (ownership) ve bor\xE7lanma (borrowing) mekanizmalar\u0131 do\u011Fru kurgulanmal\u0131d\u0131r.",
        en: "**Restrict Unnecessary `.clone()`:** Prevent memory allocation waste; strictly enforce Rust ownership and borrowing mechanics."
      },
      {
        tr: "**Cargo Workspace Mod\xFClerli\u011Fi:** Proje `crates/` alt\u0131nda ba\u011F\u0131ms\u0131z mod\xFCllere b\xF6l\xFCnmeli, {{MAX_LINES}} sat\u0131r kural\u0131 s\u0131k\u0131 \u015Fekilde uygulanmal\u0131d\u0131r.",
        en: "**Cargo Workspace Modularity:** Organize projects into crates under `crates/` and enforce the {{MAX_LINES}}-line limit per file."
      }
    ]
  },
  {
    language: "TypeScript",
    titleTr: "TypeScript / JavaScript",
    titleEn: "TypeScript / JavaScript",
    rules: [
      {
        toggle: "tsNoAny",
        tr: "**Strict Typing (No `any`):** `any` veri tipi kullan\u0131m\u0131 kesinlikle yasakt\u0131r. T\xFCm aray\xFCzler (interface) ve tipler (type) a\xE7\u0131k\xE7a tan\u0131mlanmal\u0131d\u0131r.",
        en: "**Strict Typing (No `any`):** The `any` type is prohibited. Explicit interfaces and type definitions are required."
      },
      {
        tr: "**Async Error Handling:** `async/await` yap\u0131lar\u0131nda yakalanmam\u0131\u015F promise hatalar\u0131 (unhandled rejections) engellenmeli, `try/catch` bloklar\u0131 zorunlu tutulmal\u0131d\u0131r.",
        en: "**Async Error Handling:** Unhandled promise rejections are forbidden; `try/catch` blocks are mandatory in `async/await`."
      },
      {
        tr: "**Bile\u015Fen Mod\xFClerli\u011Fi:** React/Vue/Node.js dosyalar\u0131nda UI ve i\u015F mant\u0131\u011F\u0131 (business logic) ayr\u0131lmal\u0131, tek dosyada {{MAX_LINES}} sat\u0131r a\u015F\u0131lmamal\u0131d\u0131r.",
        en: "**Component Isolation:** Separate UI and business logic; enforce the {{MAX_LINES}}-line cap per file."
      }
    ]
  },
  {
    language: "Python",
    titleTr: "Python",
    titleEn: "Python",
    rules: [
      {
        toggle: "pyTypeHints",
        tr: "**Type Hints Zorunlulu\u011Fu:** T\xFCm fonksiyon parametreleri ve d\xF6n\xFC\u015F tipleri i\xE7in `typing` mod\xFCl\xFC ile tip ipu\xE7lar\u0131 verilmelidir.",
        en: "**Mandatory Type Hints:** All function parameters and return types must use explicit `typing` annotations."
      },
      {
        toggle: "pyNoGlobalState",
        tr: "**Global De\u011Fi\u015Fken Yasaklar\u0131:** Fonksiyonlar aras\u0131 ba\u011F\u0131ml\u0131l\u0131\u011F\u0131 art\u0131ran global de\u011Fi\u015Fken kullan\u0131m\u0131 ve `from module import *` yap\u0131s\u0131 yasakt\u0131r.",
        en: "**Global State Prohibition:** Global variables and `from module import *` wildcards are forbidden."
      },
      {
        tr: "**Mod\xFCler Yap\u0131:** Monolitik `.py` betikleri yerine paket/mod\xFCl mimarisi kurgulanmal\u0131d\u0131r.",
        en: "**Modular Structure:** Prefer package/module architecture over monolithic `.py` scripts."
      }
    ]
  },
  {
    language: "C++",
    titleTr: "C++",
    titleEn: "C++",
    rules: [
      {
        toggle: "cppNoRawPointers",
        tr: "**Ham \u0130\u015Faret\xE7i (Raw Pointer) Yasa\u011F\u0131:** Manuel `new` / `delete` kullan\u0131m\u0131 yasakt\u0131r. Bellek y\xF6netimi `std::unique_ptr` ve `std::shared_ptr` ile yap\u0131lmal\u0131d\u0131r.",
        en: "**Raw Pointer Ban:** Manual `new`/`delete` is forbidden. Use `std::unique_ptr` and `std::shared_ptr`."
      },
      {
        toggle: "cppNoRawPointers",
        tr: "**D\xF6k\xFCm (Cast) G\xFCvenli\u011Fi:** Tehlikeli `reinterpret_cast` kullan\u0131m\u0131 engellenmeli, `static_cast` veya `dynamic_cast` tercih edilmelidir.",
        en: "**Casting Safety:** Ban `reinterpret_cast`; require `static_cast` or `dynamic_cast`."
      },
      {
        tr: "**Ba\u015Fl\u0131k (Header) \u0130zolasyonu:** `.h` / `.hpp` dosyalar\u0131nda tan\u0131m karma\u015Fas\u0131 \xF6nlenmeli, {{MAX_LINES}} sat\u0131r kural\u0131na uyulmal\u0131d\u0131r.",
        en: "**Header Isolation:** Keep `.h`/`.hpp` files free of definition sprawl and within the {{MAX_LINES}}-line limit."
      }
    ]
  },
  {
    language: "Go",
    titleTr: "Go",
    titleEn: "Go",
    rules: [
      {
        toggle: "goCheckErrors",
        tr: "**Hata Denetim Zorunlulu\u011Fu:** D\xF6n\xFClen `err` de\u011Ferlerinin g\xF6z ard\u0131 edilmesi (`_` ile ge\xE7i\u015Ftirilmesi) yasakt\u0131r.",
        en: "**Explicit Error Checks:** Ignoring returned `err` values (e.g. `_ = fn()`) is strictly prohibited."
      },
      {
        toggle: "goCheckErrors",
        tr: "**Goroutine S\u0131z\u0131nt\u0131 \xD6nlemleri:** Kanal (channel) kapatma ve context y\xF6netimi eksiksiz yap\u0131lmal\u0131d\u0131r.",
        en: "**Goroutine Leak Prevention:** Mandatory channel closure and `context.Context` management."
      }
    ]
  }
];
var HDL_SECTIONS = [
  {
    language: "Verilog",
    titleTr: "Verilog / SystemVerilog",
    titleEn: "Verilog / SystemVerilog",
    rules: [
      {
        toggle: "hdlAssignmentRules",
        tr: "**Atama Kurallar\u0131 (Blocking vs. Non-blocking):**\n  - Ard\u0131\u015F\u0131l Mant\u0131k (Sequential Logic - `always @(posedge clk)`): Kesinlikle **Non-blocking (`<=`)** atama kullan\u0131lmal\u0131d\u0131r.\n  - Kombinasyonel Mant\u0131k (`always @(*)`): Kesinlikle **Blocking (`=`)** atama kullan\u0131lmal\u0131d\u0131r. Ayn\u0131 blok i\xE7inde ikisini kar\u0131\u015Ft\u0131rmak kesinlikle yasakt\u0131r!",
        en: "**Assignment Rules:**\n  - Sequential Logic (`always @(posedge clk)`): **Non-blocking (`<=`)** assignments are strictly mandatory.\n  - Combinational Logic (`always @(*)`): **Blocking (`=`)** assignments are strictly mandatory. Mixing both in one block is banned."
      },
      {
        toggle: "hdlLatchPrevention",
        tr: "**Mandal (Latch) \xD6nleme:** Kombinasyonel bloklardaki `if/else` ve `case` ifadeleri t\xFCm olas\u0131l\u0131klar\u0131 kapsamal\u0131 (`default` eklenmeli), eksik tan\u0131mlama nedeniyle istem d\u0131\u015F\u0131 \u015Feffaf latch olu\u015Fumu engellenmelidir.",
        en: "**Latch Prevention:** All `if/else` and `case` branches in combinational blocks must be fully specified (with `default`) to avoid unintended transparent latches."
      },
      {
        tr: "**Mod\xFCl S\u0131n\u0131rlar\u0131 ve {{MAX_LINES}} Sat\u0131r Kural\u0131:** Her Verilog mod\xFCl\xFC ayr\u0131 bir `.v` veya `.sv` dosyas\u0131nda bulunmal\u0131, top-level mod\xFCl alt\u0131nda temiz bir hiyerar\u015Fi kurgulanmal\u0131d\u0131r.",
        en: "**Module Hierarchy:** One module per `.v`/`.sv` file; maximum {{MAX_LINES}} lines per file."
      },
      {
        tr: "**Testbench Ayr\u0131m\u0131:** Test kodlar\u0131 ana donan\u0131m mod\xFCl\xFCnden ayr\u0131 `tb_*.v` dosyalar\u0131nda \xFCretilmeli ve self-checking assertions i\xE7ermelidir.",
        en: "**Testbenches:** Isolated testbenches in `tb_*.v` files with self-checking assertions."
      }
    ]
  },
  {
    language: "VHDL",
    titleTr: "VHDL",
    titleEn: "VHDL",
    rules: [
      {
        tr: "**Varl\u0131k / Mimari (Entity / Architecture) Ayr\u0131m\u0131:** Her VHDL varl\u0131\u011F\u0131 kendi `.vhd` dosyas\u0131nda yer almal\u0131d\u0131r. Ortak veri tipleri ve sabitler paket dosyalar\u0131nda (`*_pkg.vhd`) toplanmal\u0131d\u0131r.",
        en: "**Entity / Architecture Separation:** One entity per `.vhd` file; shared constants and types in package files (`*_pkg.vhd`)."
      },
      {
        toggle: "hdlLatchPrevention",
        tr: "**Duyarl\u0131l\u0131k Listeleri (Sensitivity Lists):** Kombinasyonel s\xFCre\xE7lerde (`process`) okunan T\xDCM sinyaller duyarl\u0131l\u0131k listesine eklenmelidir. Ard\u0131\u015F\u0131l s\xFCre\xE7lerde yaln\u0131zca `rising_edge(clock)` ve asenkron s\u0131f\u0131rlama yer almal\u0131d\u0131r.",
        en: "**Sensitivity Lists:** Combinational `process` statements must list ALL read signals. Sequential processes rely strictly on `rising_edge(clk)`."
      },
      {
        toggle: "hdlAssignmentRules",
        tr: "**G\xFC\xE7l\xFC Tip G\xFCvenli\u011Fi:** Standart d\u0131\u015F\u0131 `std_logic_unsigned` k\xFCt\xFCphaneleri yerine `ieee.numeric_std` k\xFCt\xFCphanesi ve `signed`/`unsigned` tipleri zorunlu tutulmal\u0131d\u0131r.",
        en: "**Strong Typing:** Use standard `ieee.numeric_std` library with `signed`/`unsigned` types instead of legacy non-standard packages."
      }
    ]
  }
];
function renderSections(sections, data, chapter, isTr) {
  const out = [];
  let n = 0;
  for (const s of sections) {
    if (!data.languages.includes(s.language)) continue;
    const rules = s.rules.filter((r) => !r.toggle || data.constraints[r.toggle]);
    if (rules.length === 0) continue;
    n += 1;
    out.push(`### ${chapter}.${n} ${isTr ? s.titleTr : s.titleEn}`);
    for (const r of rules) out.push(`- ${isTr ? r.tr : r.en}`);
    out.push("");
  }
  return out;
}
function buildGuidelinesTemplate(data) {
  const isTr = data.locale === "tr";
  const langs = data.languages.join(", ");
  const lines = [];
  if (isTr) {
    lines.push(
      "# Dile \xD6zel Yapay Zeka Kodlama ve Mimari Kurallar\u0131 (AI_GUIDELINES.md)",
      "",
      `Bu dok\xFCman, bu projede kullan\u0131lan dillerin (${langs}) yapay zeka kodlama asistanlar\u0131nca uyulmas\u0131 gereken dile \xF6zel k\u0131s\u0131tlamalar\u0131n\u0131, g\xFCvenlik kurallar\u0131n\u0131 ve mimari s\u0131n\u0131rlar\u0131n\u0131 tan\u0131mlar.`,
      "",
      "---",
      "",
      "## 0. Genel \xC7ekirdek Kurallar",
      "- **Maksimum Dosya S\u0131n\u0131r\u0131:** Hi\xE7bir kod dosyas\u0131 {{MAX_LINES}} sat\u0131r\u0131 ge\xE7emez. {{MAX_LINES_THRESHOLD}} sat\u0131ra yakla\u015F\u0131ld\u0131\u011F\u0131nda alt mod\xFCllere b\xF6l\xFCnmelidir.",
      "- **Dok\xFCmantasyon Puan Baraj\u0131:** Public bile\u015Fen ve fonksiyonlar i\xE7in \xF6z-de\u011Ferlendirme puan\u0131 en az {{DOC_SCORE}}/10 olmal\u0131d\u0131r.",
      "- **Memory Bank Senkronizasyonu:** Her g\xF6rev bitiminde `.memory_bank/activeContext.md` ve `.memory_bank/progress.md` dosyalar\u0131 g\xFCncellenmelidir.",
      "- **Kombinasyon Testleri:** T\xFCm yeni yetenekler i\xE7in u\xE7 durumlar\u0131 (edge-cases) kapsayan testler yaz\u0131lmal\u0131d\u0131r.",
      ""
    );
  } else {
    lines.push(
      "# Language-Specific AI Coding & Architectural Rules (AI_GUIDELINES.md)",
      "",
      `This document specifies language-specific constraints, safety enforcement rules, and architectural boundaries for AI coding assistants working on this project's languages (${langs}).`,
      "",
      "---",
      "",
      "## 0. Universal Core Directives",
      "- **Maximum File Limit:** No single code file may exceed {{MAX_LINES}} lines. Modularize when approaching {{MAX_LINES_THRESHOLD}} lines.",
      "- **Documentation Self-Scoring:** Public functions and modules must achieve at least {{DOC_SCORE}}/10 self-evaluated documentation quality score.",
      "- **Memory Bank Synchronization:** Synchronize `.memory_bank/activeContext.md` and `.memory_bank/progress.md` at the end of each session.",
      "- **Combination Tests:** Construct rigorous edge-case combination test matrices for every added component.",
      ""
    );
  }
  let chapter = 0;
  const sw = renderSections(SOFTWARE_SECTIONS, data, chapter + 1, isTr);
  if (sw.length > 0) {
    chapter += 1;
    lines.push("---", "", isTr ? `## ${chapter}. Genel Yaz\u0131l\u0131m Dilleri K\u0131s\u0131tlama Kurallar\u0131` : `## ${chapter}. General Software Language Constraints`, "", ...sw);
  }
  const hdl = renderSections(HDL_SECTIONS, data, chapter + 1, isTr);
  if (hdl.length > 0) {
    chapter += 1;
    lines.push(
      "---",
      "",
      isTr ? `## ${chapter}. Donan\u0131m Tan\u0131mlama Dilleri (HDL) Kurallar\u0131` : `## ${chapter}. Hardware Description Languages (HDL)`,
      "",
      isTr ? "Donan\u0131m tasar\u0131m\u0131 dijital sentez ve zamanlama k\u0131s\u0131tlar\u0131na dayand\u0131\u011F\u0131 i\xE7in yapay zekan\u0131n yaz\u0131l\u0131m dillerindeki gibi serbest hareket etmesi donan\u0131m sentezleme hatalar\u0131na (synthesis errors) veya yar\u0131\u015F durumlar\u0131na (race conditions) yol a\xE7ar." : "Hardware synthesis and timing constraints require strict rules to prevent hardware race conditions or unintentional latch inference.",
      "",
      ...hdl
    );
  }
  return lines.join("\n").replace(/\n+$/, "\n");
}

// src/lib/templates/checker.ts
var TEMPLATE_CHECK_GUIDELINES_PY = String.raw`#!/usr/bin/env python3
"""
AI Guidelines Auto-Checker (generated by Vibe Governor).

Verifies the codebase against AI_GUIDELINES.md:
1. Code file line limit (max {{MAX_LINES}} lines, warning above {{MAX_LINES_THRESHOLD}}).
2. Presence of AI_GUIDELINES.md in the project root.
3. Presence of .memory_bank/ with its 6 core files.
4. Language-specific safety rules selected in the wizard:
   {{ENABLED_RULES_DOC}}

Usage: python3 scripts/check_guidelines.py [project_root]
Exit code 0 = compliant, 1 = violations found.
"""

import ast
import os
import re
import sys
from typing import Dict, List, Optional, Set, Tuple

MAX_LINES: int = {{MAX_LINES}}
WARN_LINES: int = {{MAX_LINES_THRESHOLD}}
LOCALE: str = "{{LOCALE}}"
ENABLED_RULES: Set[str] = set({{ENABLED_RULES}})
CLONE_WARN_PER_FILE: int = 5

REQUIRED_MEMORY_FILES: Tuple[str, ...] = (
    "projectbrief.md",
    "productContext.md",
    "systemPatterns.md",
    "techContext.md",
    "activeContext.md",
    "progress.md",
)
GUIDELINE_FILES: Tuple[str, ...] = ("AI_GUIDELINES.md", "AI_GUIDELINES_LANGUAGES_TR.md", "AI_GUIDELINES_LANGUAGES_EN.md")
EXCLUDE_DIRS: Set[str] = {
    ".git", "node_modules", "target", "dist", "build", "out", ".next", ".memory_bank",
    "vendor", "__pycache__", ".venv", "venv", "env", "coverage", ".idea", ".vscode",
}
CODE_EXTS: Set[str] = {
    ".rs", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".py", ".c", ".h", ".cpp", ".hpp",
    ".cc", ".cxx", ".hh", ".go", ".v", ".sv", ".svh", ".vhd", ".vhdl", ".java", ".kt",
    ".cs", ".swift", ".rb", ".php", ".vue", ".svelte",
}
CPP_EXTS: Set[str] = {".cpp", ".hpp", ".cc", ".cxx", ".hh", ".h"}

MESSAGES: Dict[str, Dict[str, str]] = {
    "tr": {
        "title": "AI GUIDELINES OTOMATİK DENETÇİ BAŞLATILIYOR...",
        "no_guidelines": "[CRITICAL] Kök dizinde AI_GUIDELINES.md bulunamadı!",
        "no_mb": "[CRITICAL] .memory_bank/ klasörü kök dizinde bulunamadı!",
        "mb_missing": "[ERROR] Memory Bank dosyası eksik: .memory_bank/{0}",
        "line_limit": "[LINE LIMIT EXCEEDED] {0}: {1} satır (Maksimum sınır {2} satır)!",
        "line_warn": "[LINE LIMIT WARNING] {0}: {1} satır ({2} satıra yaklaşıyor, modüllere bölün)",
        "rust_unsafe": "[RUST VIOLATION] {0}:{1} -> 'unsafe' kullanımı tespit edildi!",
        "rust_clone": "[RUST WARNING] {0}: {1} adet .clone() çağrısı (sahiplik/borçlanma ile azaltın)",
        "ts_any": "[TYPESCRIPT VIOLATION] {0}:{1} -> 'any' tipi kullanımı tespit edildi!",
        "py_hint_arg": "[PYTHON VIOLATION] {0}:{1} -> '{2}' fonksiyonunda '{3}' parametresinin tip ipucu yok!",
        "py_hint_ret": "[PYTHON VIOLATION] {0}:{1} -> '{2}' fonksiyonunda dönüş tipi ipucu (->) yok!",
        "py_star": "[PYTHON VIOLATION] {0}:{1} -> 'from ... import *' kullanımı yasaktır!",
        "py_global": "[PYTHON VIOLATION] {0}:{1} -> 'global' değişken kullanımı yasaktır!",
        "py_syntax": "[PYTHON WARNING] {0}: sözdizimi hatası nedeniyle tip denetimi atlandı",
        "cpp_new": "[C++ VIOLATION] {0}:{1} -> Ham 'new'/'delete' kullanımı (smart pointer kullanın)!",
        "cpp_cast": "[C++ VIOLATION] {0}:{1} -> 'reinterpret_cast' kullanımı yasaktır!",
        "go_err": "[GO VIOLATION] {0}:{1} -> Dönüş değeri/hata '_' ile göz ardı ediliyor!",
        "v_seq": "[VERILOG VIOLATION] {0}:{1} -> Ardışıl blokta blocking (=) atama; '<=' kullanın!",
        "v_comb": "[VERILOG VIOLATION] {0}:{1} -> Kombinasyonel blokta non-blocking (<=) atama; '=' kullanın!",
        "v_latch": "[VERILOG VIOLATION] {0}:{1} -> Kombinasyonel 'case' bloğunda 'default' yok (latch riski)!",
        "vhdl_lib": "[VHDL VIOLATION] {0}:{1} -> Standart dışı kütüphane; 'ieee.numeric_std' kullanın!",
        "fail": "AI GUIDELINES İHLALLERİ TESPİT EDİLDİ:",
        "warnings": "Uyarılar (commit'i engellemez):",
        "retry": "Lütfen ihlalleri düzelttikten sonra tekrar deneyin.",
        "ok": "TÜM DENETİMLER BAŞARIYLA GEÇTİ! Kod tabanı AI Guidelines kurallarına uygun.",
    },
    "en": {
        "title": "AI GUIDELINES AUTO-CHECKER STARTING...",
        "no_guidelines": "[CRITICAL] AI_GUIDELINES.md not found in the project root!",
        "no_mb": "[CRITICAL] .memory_bank/ directory not found in the project root!",
        "mb_missing": "[ERROR] Missing Memory Bank file: .memory_bank/{0}",
        "line_limit": "[LINE LIMIT EXCEEDED] {0}: {1} lines (maximum is {2})!",
        "line_warn": "[LINE LIMIT WARNING] {0}: {1} lines (approaching {2}, split into modules)",
        "rust_unsafe": "[RUST VIOLATION] {0}:{1} -> 'unsafe' usage detected!",
        "rust_clone": "[RUST WARNING] {0}: {1} .clone() calls (reduce via ownership/borrowing)",
        "ts_any": "[TYPESCRIPT VIOLATION] {0}:{1} -> 'any' type usage detected!",
        "py_hint_arg": "[PYTHON VIOLATION] {0}:{1} -> parameter '{3}' of '{2}' has no type hint!",
        "py_hint_ret": "[PYTHON VIOLATION] {0}:{1} -> function '{2}' has no return type hint (->)!",
        "py_star": "[PYTHON VIOLATION] {0}:{1} -> 'from ... import *' is forbidden!",
        "py_global": "[PYTHON VIOLATION] {0}:{1} -> 'global' variables are forbidden!",
        "py_syntax": "[PYTHON WARNING] {0}: type-hint check skipped due to a syntax error",
        "cpp_new": "[C++ VIOLATION] {0}:{1} -> raw 'new'/'delete' (use smart pointers)!",
        "cpp_cast": "[C++ VIOLATION] {0}:{1} -> 'reinterpret_cast' is forbidden!",
        "go_err": "[GO VIOLATION] {0}:{1} -> return value/error ignored with '_'!",
        "v_seq": "[VERILOG VIOLATION] {0}:{1} -> blocking (=) assignment in sequential block; use '<='!",
        "v_comb": "[VERILOG VIOLATION] {0}:{1} -> non-blocking (<=) assignment in combinational block; use '='!",
        "v_latch": "[VERILOG VIOLATION] {0}:{1} -> combinational 'case' without 'default' (latch risk)!",
        "vhdl_lib": "[VHDL VIOLATION] {0}:{1} -> non-standard library; use 'ieee.numeric_std'!",
        "fail": "AI GUIDELINES VIOLATIONS DETECTED:",
        "warnings": "Warnings (do not block the commit):",
        "retry": "Please fix the violations above and try again.",
        "ok": "ALL CHECKS PASSED! The codebase complies with the AI Guidelines.",
    },
}

STRING_RE = re.compile(r'"(?:\\.|[^"\\])*"|\'(?:\\.|[^\'\\])*\'')
TS_ANY_RE = re.compile(r"(:\s*any\b)|(\bas\s+any\b)|(<\s*any\s*[>,])|(\bany\s*\[\s*\])")
CPP_NEW_RE = re.compile(r"\bnew\s+[A-Za-z_(]|\bdelete\s*(\[\s*\])?\s*[A-Za-z_(*]")
GO_IGNORE_RE = re.compile(r"^\s*_\s*=[^=]|,\s*_\s*:?=[^=]|^\s*_\s*,[\w\s,]*:?=[^=]")
V_ALWAYS_RE = re.compile(r"\balways_ff\s*(@\s*\([^)]*\))?|\balways_comb\b|\balways_latch\b|\balways\s*@\s*(\*|\([^)]*\))")
V_BLOCKING_RE = re.compile(r"^\s*[A-Za-z_][\w.]*(\s*\[[^\]]*\])*\s*=(?!=)")
V_NONBLOCKING_RE = re.compile(r"^\s*[A-Za-z_][\w.]*(\s*\[[^\]]*\])*\s*<=")
VHDL_LIB_RE = re.compile(r"\bieee\s*\.\s*std_logic_(unsigned|signed|arith)\b", re.IGNORECASE)


def msg(key: str, *args: object) -> str:
    """Returns a localized message."""
    table = MESSAGES.get(LOCALE, MESSAGES["en"])
    return table[key].format(*args)


def strip_c_like(line: str, in_block: bool) -> Tuple[str, bool]:
    """Removes string literals and // or /* */ comments from a C-like source line."""
    code = STRING_RE.sub('""', line)
    out = ""
    i = 0
    while i < len(code):
        if in_block:
            end = code.find("*/", i)
            if end < 0:
                return out, True
            i = end + 2
            in_block = False
        elif code.startswith("//", i):
            break
        elif code.startswith("/*", i):
            in_block = True
            i += 2
        else:
            out += code[i]
            i += 1
    return out, in_block


def check_structure(root: str) -> List[str]:
    """Checks for AI_GUIDELINES.md and the 6 Memory Bank files."""
    errors: List[str] = []
    if not any(os.path.exists(os.path.join(root, g)) for g in GUIDELINE_FILES):
        errors.append(msg("no_guidelines"))
    mb_dir = os.path.join(root, ".memory_bank")
    if not os.path.isdir(mb_dir):
        errors.append(msg("no_mb"))
        return errors
    for name in REQUIRED_MEMORY_FILES:
        if not os.path.exists(os.path.join(mb_dir, name)):
            errors.append(msg("mb_missing", name))
    return errors


def check_python(rel: str, source: str, errors: List[str], warnings: List[str]) -> None:
    """AST-based Python checks (type hints, globals, wildcard imports)."""
    try:
        tree = ast.parse(source)
    except SyntaxError:
        warnings.append(msg("py_syntax", rel))
        return
    for node in ast.walk(tree):
        if "py_no_global" in ENABLED_RULES:
            if isinstance(node, ast.ImportFrom) and any(a.name == "*" for a in node.names):
                errors.append(msg("py_star", rel, node.lineno))
            elif isinstance(node, (ast.Global, ast.Nonlocal)):
                errors.append(msg("py_global", rel, node.lineno))
        if "py_type_hints" in ENABLED_RULES and isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)):
            args = node.args
            params = args.posonlyargs + args.args + args.kwonlyargs
            for idx, arg in enumerate(params):
                if idx == 0 and arg.arg in ("self", "cls"):
                    continue
                if arg.annotation is None:
                    errors.append(msg("py_hint_arg", rel, node.lineno, node.name, arg.arg))
            for extra in (args.vararg, args.kwarg):
                if extra is not None and extra.annotation is None:
                    errors.append(msg("py_hint_arg", rel, node.lineno, node.name, extra.arg))
            if node.returns is None and node.name != "__init__":
                errors.append(msg("py_hint_ret", rel, node.lineno, node.name))


def strip_verilog_prefix(code: str) -> str:
    """Strips leading control tokens (begin/end/else/if(..)/for(..)/case labels) to expose a statement."""
    while True:
        code = code.lstrip()
        m = re.match(r"(begin\b(\s*:\s*\w+)?|end\b|else\b|default\s*:)", code)
        if m:
            code = code[m.end():]
            continue
        m = re.match(r"(if|for|while|repeat)\s*\(", code)
        if m:
            level, i = 0, m.end() - 1
            while i < len(code):
                level += {"(": 1, ")": -1}.get(code[i], 0)
                i += 1
                if level == 0:
                    break
            code = code[i:]
            continue
        m = re.match(r"[\w'.]+(\s*,\s*[\w'.]+)*\s*:(?!=)", code)
        if m:
            code = code[m.end():]
            continue
        return code


def check_verilog(rel: str, lines: List[str], errors: List[str]) -> None:
    """Block-aware Verilog checks: assignment style per always-block and case/default coverage."""
    in_comment = False
    block: Optional[str] = None  # "seq" | "comb"
    depth = 0
    opened = False  # True once the block's first 'begin' was seen
    cases: List[List[object]] = []  # [line_no, has_default]
    for idx, raw in enumerate(lines, 1):
        code, in_comment = strip_c_like(raw, in_comment)
        header = V_ALWAYS_RE.search(code)
        if header:
            text = header.group(0)
            if "always_latch" in text:
                block = None
                continue
            block = "seq" if re.search(r"always_ff|posedge|negedge", text) else "comb"
            depth, opened, cases = 0, False, []
            code = code[header.end():]
        if block is None or not code.strip():
            continue
        stmt = strip_verilog_prefix(code)
        if "verilog_assign" in ENABLED_RULES and stmt.strip():
            if block == "seq" and V_BLOCKING_RE.match(stmt):
                errors.append(msg("v_seq", rel, idx))
            elif block == "comb" and V_NONBLOCKING_RE.match(stmt):
                errors.append(msg("v_comb", rel, idx))
        if re.search(r"\bcase[xz]?\s*\(", code):
            cases.append([idx, False])
        if cases and re.search(r"\bdefault\b", code):
            cases[-1][1] = True
        if cases and re.search(r"\bendcase\b", code):
            line_no, has_default = cases.pop()
            if block == "comb" and not has_default and "verilog_latch" in ENABLED_RULES:
                errors.append(msg("v_latch", rel, line_no))
        begins = len(re.findall(r"\bbegin\b", code))
        depth += begins - len(re.findall(r"\bend\b", code))
        opened = opened or begins > 0
        single_done = code.rstrip().endswith(";") or re.search(r"\bendcase\b", code)
        if (opened and depth <= 0) or (not opened and not cases and single_done):
            block = None


def analyze_file(path: str, rel: str, errors: List[str], warnings: List[str]) -> None:
    """Runs line-limit and language-specific checks on one source file."""
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            source = f.read()
    except OSError:
        return
    lines = source.splitlines()
    ext = os.path.splitext(path)[1].lower()
    if len(lines) > MAX_LINES:
        errors.append(msg("line_limit", rel, len(lines), MAX_LINES))
    elif len(lines) > WARN_LINES:
        warnings.append(msg("line_warn", rel, len(lines), MAX_LINES))

    if ext == ".py":
        check_python(rel, source, errors, warnings)
        return
    if ext in (".v", ".sv", ".svh"):
        check_verilog(rel, lines, errors)
        return
    if ext in (".vhd", ".vhdl"):
        if "vhdl_numeric_std" in ENABLED_RULES:
            for idx, raw in enumerate(lines, 1):
                if VHDL_LIB_RE.search(raw.split("--", 1)[0]):
                    errors.append(msg("vhdl_lib", rel, idx))
        return

    in_comment = False
    clones = 0
    for idx, raw in enumerate(lines, 1):
        code, in_comment = strip_c_like(raw, in_comment)
        if not code.strip():
            continue
        if ext == ".rs":
            if "rust_unsafe" in ENABLED_RULES and re.search(r"\bunsafe\b", code):
                errors.append(msg("rust_unsafe", rel, idx))
            clones += len(re.findall(r"\.clone\(\)", code))
        elif ext in (".ts", ".tsx"):
            if "ts_any" in ENABLED_RULES and TS_ANY_RE.search(code):
                errors.append(msg("ts_any", rel, idx))
        elif ext in CPP_EXTS:
            if "cpp_raw_ptr" in ENABLED_RULES:
                if CPP_NEW_RE.search(code) and "std::" not in code and "operator" not in code:
                    errors.append(msg("cpp_new", rel, idx))
                if re.search(r"\breinterpret_cast\b", code):
                    errors.append(msg("cpp_cast", rel, idx))
        elif ext == ".go":
            if "go_errors" in ENABLED_RULES and GO_IGNORE_RE.search(code) and not re.search(r"\brange\b", code):
                errors.append(msg("go_err", rel, idx))
    if "rust_clone" in ENABLED_RULES and clones > CLONE_WARN_PER_FILE:
        warnings.append(msg("rust_clone", rel, clones))


def main() -> int:
    """Entry point. Returns the process exit code."""
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else os.getcwd())
    self_path = os.path.abspath(__file__)
    print("==================================================")
    print("🔍 " + msg("title"))
    print("==================================================")

    errors: List[str] = check_structure(root)
    warnings: List[str] = []
    for current, dirs, files in os.walk(root):
        dirs[:] = sorted(d for d in dirs if d not in EXCLUDE_DIRS)
        for name in sorted(files):
            full = os.path.join(current, name)
            if os.path.splitext(name)[1].lower() not in CODE_EXTS or os.path.abspath(full) == self_path:
                continue
            rel = os.path.relpath(full, root).replace(os.sep, "/")
            analyze_file(full, rel, errors, warnings)

    if warnings:
        print("\n⚠️ " + msg("warnings"))
        for w in warnings:
            print("  • " + w)
    if errors:
        print("\n❌ " + msg("fail") + "\n")
        for e in errors:
            print("  • " + e)
        print("\n⚠️ " + msg("retry"))
        return 1
    print("\n✅ " + msg("ok"))
    return 0


if __name__ == "__main__":
    sys.exit(main())
`;

// src/lib/templates/misc.ts
var HOOK_TEXT = {
  tr: {
    start: "\u{1F6E1}\uFE0F Git Pre-Commit: AI Guidelines kurallar\u0131 denetleniyor...",
    noPython: "\u274C Python bulunamad\u0131 (python3/python). Denet\xE7i \xE7al\u0131\u015Ft\u0131r\u0131lamad\u0131.",
    blocked: "\u274C COMMIT ENGELLEND\u0130: Proje AI Guidelines kurallar\u0131na uymuyor!",
    fix: "L\xFCtfen yukar\u0131daki hatalar\u0131 d\xFCzelttikten sonra tekrar commit yap\u0131n.",
    ok: "\u2705 Pre-Commit kontrol\xFC ba\u015Far\u0131l\u0131! Commit i\u015Flemine devam ediliyor..."
  },
  en: {
    start: "\u{1F6E1}\uFE0F Git Pre-Commit: verifying AI Guidelines rules...",
    noPython: "\u274C Python not found (python3/python). Cannot run the checker.",
    blocked: "\u274C COMMIT BLOCKED: the project violates the AI Guidelines!",
    fix: "Please fix the errors above and commit again.",
    ok: "\u2705 Pre-commit check passed! Continuing with the commit..."
  }
};
function buildPreCommitHook(locale) {
  const t = HOOK_TEXT[locale];
  return `#!/usr/bin/env bash
# Git Pre-Commit Hook for AI Guidelines Verification
# Install:  cp scripts/pre-commit-hook.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# (\`npx github:SafakSahinn/vibe-governor init\` installs it automatically.)

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT" || exit 1

echo "${t.start}"

# Windows ships a 'python3' Store alias that is not a real interpreter, so probe it.
PY=""
for candidate in python3 python py; do
    if command -v "$candidate" >/dev/null 2>&1 && "$candidate" -c "import sys" >/dev/null 2>&1; then
        PY="$candidate"
        break
    fi
done
if [ -z "$PY" ]; then
    echo "${t.noPython}"
    exit 1
fi

if ! "$PY" scripts/check_guidelines.py; then
    echo "${t.blocked}"
    echo "${t.fix}"
    exit 1
fi

echo "${t.ok}"
exit 0
`;
}
var TEMPLATE_GITHUB_CI = `name: AI Guidelines Verification

on:
  push:
    branches: [ main, master, develop ]
  pull_request:
    branches: [ main, master, develop ]

jobs:
  verify-guidelines:
    runs-on: ubuntu-latest

    steps:
      - name: Codebase Checkout
        uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - name: Run AI Guidelines Checker
        run: |
          python3 scripts/check_guidelines.py
`;
var AUDIT_TR = `## \u{1F1F9}\u{1F1F7} T\xFCrk\xE7e Denetim \u0130stem \u015Eablonu

\`\`\`text
PROJE PER\u0130YOD\u0130K DENET\u0130M VE TEKN\u0130K BOR\xC7 TARAMA TAL\u0130MATI

L\xFCtfen projemizin t\xFCm kod taban\u0131n\u0131 ve mod\xFCllerini detayl\u0131 bir \u015Fekilde denetle.

DENET\u0130M HEDEFLER\u0130 VE KURALLARI:
1. K\xF6k dizindeki \`AI_GUIDELINES.md\` kurallar\u0131 ile mevcut kodu kar\u015F\u0131la\u015Ft\u0131r.
2. {{MAX_LINES}} sat\u0131r\u0131 a\u015Fan veya a\u015Fmaya yakla\u015Fan monolithic/God Object dosyalar\u0131 tespit et.
3. Mimari k\u0131s\u0131tlamalara ayk\u0131r\u0131 yap\u0131lar\u0131, spagetti kod sapmalar\u0131n\u0131 ve mant\u0131k hatalar\u0131n\u0131 belirle.
4. Dile \xF6zel g\xFCvenlik ve donan\u0131m kurallar\u0131n\u0131 incele (\xF6r. Rust unsafe kullan\u0131m\u0131, TypeScript any kullan\u0131m\u0131, Verilog/VHDL hatal\u0131 atamalar\u0131 veya mandal/latch olu\u015Fumu).
5. Dok\xFCmantasyonu eksik veya puan\u0131 d\xFC\u015F\xFCk kalan (hedef >= {{DOC_SCORE}}/10) public yap\u0131lar\u0131 listele.

\xD6NEML\u0130:
- Do\u011Frudan projedeki kodlar\u0131 DE\u011E\u0130\u015ET\u0130RME.
- Buldu\u011Fun t\xFCm eksikleri, riskleri ve \xE7\xF6z\xFCm \xF6nerilerini \`audit-report.md\` ad\u0131nda yeni bir Markdown raporu olarak sun.
- Raporda her bulgu i\xE7in ilgili dosya yolunu ve sat\u0131r aral\u0131\u011F\u0131n\u0131 a\xE7\u0131k\xE7a belirt.
\`\`\`
`;
var AUDIT_EN = `## \u{1F1EC}\u{1F1E7} English Audit Prompt Template

\`\`\`text
PERIODIC CODEBASE AUDIT & TECHNICAL DEBT SCAN INSTRUCTIONS

Please perform a rigorous audit of the entire codebase and architectural modules.

AUDIT SCOPE & RULES:
1. Compare the codebase against the standards defined in \`AI_GUIDELINES.md\`.
2. Identify any monolithic / God Object files exceeding or nearing the {{MAX_LINES}}-line threshold.
3. Detect architectural drift, spaghetti code patterns, and logic vulnerabilities.
4. Verify language-specific safety rules (e.g., raw pointer hazards, unhandled promises, Verilog/VHDL blocking/non-blocking assignment bugs or unintended latches).
5. Flag any public components lacking self-evaluated documentation (min {{DOC_SCORE}}/10) or adequate test coverage.

CRITICAL DIRECTIVE:
- DO NOT modify the codebase directly.
- Output all findings, security risks, and refactoring action steps into a new Markdown file named \`audit-report.md\`.
- Cite exact file paths and line numbers for each issue identified.
\`\`\`
`;
function buildAuditPrompt(locale) {
  const header = locale === "tr" ? `# Frontier Model Periyodik Denetim \u0130stem \u015Eablonlar\u0131 (AUDIT_PROMPT.md)

B\xFCy\xFCk mod\xFCller tamamland\u0131\u011F\u0131nda veya belirli geli\u015Ftirme periyotlar\u0131n\u0131n sonunda projenizi Claude Opus / Claude Sonnet / GPT-4o gibi g\xFC\xE7l\xFC modellerle denetlerken a\u015Fa\u011F\u0131daki promptlar\u0131 kullanabilirsiniz.
` : `# Frontier Model Periodic Audit Prompt Templates (AUDIT_PROMPT.md)

Use the prompts below when auditing the project with frontier models (Claude Opus / Claude Sonnet / GPT-4o) after large modules are completed or at the end of a development period.
`;
  const bodies = locale === "tr" ? [AUDIT_TR, AUDIT_EN] : [AUDIT_EN, AUDIT_TR];
  return [header, "---", "", bodies[0], "---", "", bodies[1]].join("\n");
}
function buildGitignore(locale) {
  const h = locale === "tr" ? ["Yapay Zeka Denetim ve Ge\xE7ici \xC7al\u0131\u015Fma Dosyalar\u0131", "Memory Bank (Versiyon Kontrol\xFCne D\xC2H\u0130LD\u0130R)", "IDE ve Donan\u0131m/Yaz\u0131l\u0131m Derleme \xC7\u0131kt\u0131lar\u0131"] : ["AI Audit Reports & Temporary Work Files", "Memory Bank (TRACKED by version control)", "IDE & Hardware/Software Build Outputs"];
  const bar = "# ==========================================";
  return `${bar}
# ${h[0]}
${bar}
audit-report.md
*.tmp.md
scratch/
/tmp/

${bar}
# ${h[1]}
${bar}
!.memory_bank/
!.memory_bank/*.md

${bar}
# ${h[2]}
${bar}
.vscode/
.idea/
build/
target/
dist/
node_modules/
.next/
__pycache__/
*.o
*.elf
*.bit
*.mcs
`;
}

// src/lib/templates/ideRules.ts
var RULE_FILES = [
  {
    platform: "ANTIGRAVITY",
    path: "ANTIGRAVITY.md",
    language: "markdown",
    build: (v, safety) => `# AntiGravity AI Agent Protocol

## Mandatory Context Loading
- ALWAYS read and strictly apply \`./AI_GUIDELINES.md\` before analyzing code or writing changes.
- Inspect \`./.memory_bank/activeContext.md\` and \`./.memory_bank/systemPatterns.md\` prior to executing any task.

## Execution Restrictions
- **${v.MAX_LINES}-Line Rule:** Never exceed ${v.MAX_LINES} lines in any single code file. Split into clean sub-modules when approaching ${v.MAX_LINES_THRESHOLD} lines.
- **Modular Architecture:** Enforce strict single responsibility. Avoid monolithic or "God Object" designs.
- **Documentation Self-Scoring:** Add thorough docstrings/JSDoc for public structures and self-score quality (min ${v.DOC_SCORE}/10 required).
- **Combination Testing:** Generate comprehensive edge-case combination tests for every new feature.
- **Language Safety:** Enforce language-specific safety rules (${safety}).

## Session Synchronization
- Upon task completion, update \`./.memory_bank/activeContext.md\` and \`./.memory_bank/progress.md\` with the latest status.
`
  },
  {
    platform: "CLAUDE_CLI",
    path: "CLAUDE.md",
    language: "markdown",
    build: (v, safety) => `# Claude CLI Project Guidelines

- Read and follow \`./AI_GUIDELINES.md\` strictly.
- Inspect \`./.memory_bank/activeContext.md\` before modifying any files.
- Maintain the ${v.MAX_LINES}-line per file limit and full modularity.
- Require self-evaluated documentation scores (>= ${v.DOC_SCORE}/10).
- Enforce language safety rules: ${safety}.
- Update \`.memory_bank/activeContext.md\` and \`progress.md\` after completing work.
`
  },
  {
    platform: "CURSOR",
    path: ".cursorrules",
    language: "plaintext",
    build: (v, safety) => `Always read and strictly follow the architecture and coding guidelines in ./AI_GUIDELINES.md before generating any code.
Inspect .memory_bank/activeContext.md and .memory_bank/systemPatterns.md before task execution.
Enforce ${v.MAX_LINES}-line limit per file, mandatory modularity, documentation scoring (>= ${v.DOC_SCORE}/10), and combination tests.
Language safety rules: ${safety}.
Sync .memory_bank/activeContext.md and progress.md upon completion.
`
  },
  {
    platform: "WINDSURF",
    path: ".windsurfrules",
    language: "plaintext",
    build: (v, safety) => `Rule 1: Adhere strictly to the project rules in ./AI_GUIDELINES.md.
Rule 2: Read .memory_bank/activeContext.md prior to code modification.
Rule 3: Enforce maximum ${v.MAX_LINES} lines per file and single responsibility principle.
Rule 4: Require self-evaluated documentation scores (>= ${v.DOC_SCORE}/10) for public methods.
Rule 5: Enforce language safety rules: ${safety}.
`
  },
  {
    platform: "CLINE",
    path: ".clinerules",
    language: "plaintext",
    build: (v, safety) => `Context Loading: Always start by analyzing ./AI_GUIDELINES.md and .memory_bank/activeContext.md.
Code Quality: Maintain strict modularity and <${v.MAX_LINES} lines/file limit.
Language Safety: ${safety}.
Verification: Include edge-case combination tests for all new functions.
Session Sync: Update .memory_bank/activeContext.md and progress.md upon completion.
`
  },
  {
    platform: "GITHUB_COPILOT",
    path: ".github/copilot-instructions.md",
    language: "markdown",
    build: (v, safety) => `# GitHub Copilot Custom Instructions
- Follow all rules defined in \`AI_GUIDELINES.md\`.
- Never produce code files exceeding ${v.MAX_LINES} lines.
- Enforce language safety rules: ${safety}.
- Always generate unit/combination tests for code additions.
`
  }
];
function buildIdeRuleFiles(data, vars, safety) {
  return RULE_FILES.filter((d) => data.targetPlatforms.includes(d.platform)).map((d) => ({
    path: d.path,
    name: d.path.split("/").pop() ?? d.path,
    content: d.build(vars, safety),
    language: d.language,
    category: "rules"
  }));
}

// src/lib/templates/memoryBank.ts
function trFiles(d, v, safety) {
  const mb = d.memoryBank;
  const name = mb.projectName.trim() || "My Project";
  return [
    ["projectbrief.md", `# Proje \xD6zeti ve Vizyonu
- **Proje Ad\u0131:** ${name}
- **Temel Ama\xE7:** ${mb.projectBrief || "Projenin ana varl\u0131k nedeni ve hedefleri."}
- **\xC7ekirdek Hedefler:**
  1. Mod\xFCler, hatas\u0131z ve s\xFCrd\xFCr\xFClebilir mimari kurmak.
  2. AI destekli geli\u015Ftirmede context kayb\u0131 ya\u015Famamak.
`],
    ["productContext.md", `# \xDCr\xFCn Ba\u011Flam\u0131 ve Kullan\u0131c\u0131 Deneyimi
- **\xC7\xF6z\xFClen Problem:** ${mb.productContext || "AI kodlama asistanlar\u0131n\u0131n haf\u0131za kayb\u0131 ve spagetti koda yol a\xE7mas\u0131n\u0131 \xF6nlemek."}
- **Hedef Kullan\u0131c\u0131 Kitlesi:** Yaz\u0131l\u0131m ve donan\u0131m geli\u015Ftiricileri, teknik liderler.
- **Kritik \u0130\u015Flevsel Beklentiler:**
  - Maksimum ${v.MAX_LINES} sat\u0131r kural\u0131n\u0131n tavizsiz uygulanmas\u0131.
  - Public yap\u0131larda >= ${v.DOC_SCORE}/10 dok\xFCmantasyon puan\u0131.
`],
    ["systemPatterns.md", `# Sistem Mimarisi ve Tasar\u0131m Kal\u0131plar\u0131
- **Mimari Yap\u0131:** ${mb.systemPatterns || "Mod\xFCler mimari ve katmanl\u0131 servis deseni."}
- **Kullan\u0131lan Tasar\u0131m Kal\u0131plar\u0131:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Mod\xFCller Aras\u0131 Veri Ak\u0131\u015F\u0131:**
  - [Mod\xFCl A] -> [Mod\xFCl B] (Aray\xFCz/Interface \xFCzerinden)
`],
    ["techContext.md", `# Teknoloji Y\u0131\u011F\u0131n\u0131 ve Ortam K\u0131s\u0131tlar\u0131
- **Diller ve Ara\xE7lar:** ${d.languages.join(", ")}
- **Temel Ba\u011F\u0131ml\u0131l\u0131klar ve Derleme Komutlar\u0131:** ${mb.techContext || "Standart ara\xE7 zinciri ve derleyici ayarlar\u0131."}
- **K\u0131s\u0131tlamalar:** ${v.MAX_LINES} sat\u0131r s\u0131n\u0131r\u0131, ${safety}
`],
    ["activeContext.md", `# Aktif Oturum Ba\u011Flam\u0131
- **Mevcut Odak Noktas\u0131:** ${mb.activeContext || "Proje ba\u015Flang\u0131\xE7 konfig\xFCrasyonu ve anayasa entegrasyonu."}
- **Son Yap\u0131lan De\u011Fi\u015Fiklikler:**
  - Vibe Governor Memory Bank \u015Fablonlar\u0131 olu\u015Fturuldu.
  - AI kurallar\u0131 ve otomasyon betikleri eklendi.
- **Sonraki Ad\u0131mlar:**
  1. \xC7ekirdek mod\xFCllerin kodlanmas\u0131.
  2. Otomatik denet\xE7i beti\u011Finin test edilmesi.
`],
    ["progress.md", `# \u0130lerleme Durumu ve \u0130nceleme Raporu
- **Tamamlanan Mod\xFCller:**
  - [x] Memory Bank altyap\u0131s\u0131 (${name})
  - [x] AI Guidelines & Kural seti
- **\xC7al\u0131\u015Fan Mevcut Durum:** ${mb.progress || "Proje iskeleti kararl\u0131."}
- **Teknik Bor\xE7lar ve Bilinen Hatalar:**
  - [ ] \u0130lk u\xE7tan uca entegrasyon testlerinin tamamlanmas\u0131.
`]
  ];
}
function enFiles(d, v, safety) {
  const mb = d.memoryBank;
  const name = mb.projectName.trim() || "My Project";
  return [
    ["projectbrief.md", `# Project Brief & Vision
- **Project Name:** ${name}
- **Core Purpose:** ${mb.projectBrief || "Primary objective of the project and key deliverables."}
- **Key Goals:**
  1. Establish modular, resilient, and maintainable architecture.
  2. Prevent AI context drift and hallucination across sessions.
`],
    ["productContext.md", `# Product Context & UX
- **Problem Solved:** ${mb.productContext || "Mitigates AI assistant context loss and spaghetti code creep."}
- **Target Audience:** Software engineers, hardware designers, tech leads.
- **Key Functional Expectations:**
  - Strict enforcement of max ${v.MAX_LINES} lines per file.
  - Public documentation score >= ${v.DOC_SCORE}/10.
`],
    ["systemPatterns.md", `# System Architecture & Design Patterns
- **Architecture Type:** ${mb.systemPatterns || "Modular architecture with isolated service layers."}
- **Design Patterns:** Factory, Adapter, Single Responsibility, Explicit Error Handling.
- **Data Flow Between Modules:**
  - [Module A] -> [Module B] (via explicit interface)
`],
    ["techContext.md", `# Tech Stack & Environment Constraints
- **Primary Languages:** ${d.languages.join(", ")}
- **Key Dependencies & Build Commands:** ${mb.techContext || "Standard toolchain and compiler options."}
- **Constraints:** ${v.MAX_LINES}-line ceiling, ${safety}
`],
    ["activeContext.md", `# Active Session Context
- **Current Focus:** ${mb.activeContext || "Initial project setup and constitution integration."}
- **Recent Changes:**
  - Generated Vibe Governor Memory Bank structure.
  - Linked AI rules and automation checker scripts.
- **Next Steps:**
  1. Implement core domain logic.
  2. Run guideline verification scripts.
`],
    ["progress.md", `# Progress Status & Known Debts
- **Completed Modules:**
  - [x] Memory Bank scaffold for ${name}
  - [x] AI Guidelines & Rule enforcement configs
- **Current Working Status:** ${mb.progress || "Project scaffold verified and stable."}
- **Technical Debts & Known Bugs:**
  - [ ] Finalize end-to-end integration test suites.
`]
  ];
}
function buildMemoryBankFiles(data, vars, safety) {
  const list2 = data.locale === "tr" ? trFiles(data, vars, safety) : enFiles(data, vars, safety);
  return list2.map(([name, content]) => ({
    path: `.memory_bank/${name}`,
    name,
    content,
    language: "markdown",
    category: "memory_bank"
  }));
}

// src/lib/templateEngine.ts
function buildTemplateVars(data) {
  const maxLines = data.constraints.maxLines || 800;
  const rules = getEnabledRules(data);
  return {
    MAX_LINES: String(maxLines),
    MAX_LINES_THRESHOLD: String(Math.max(100, maxLines - 100)),
    DOC_SCORE: String(data.constraints.docScoreThreshold || 8),
    LOCALE: data.locale,
    ENABLED_RULES: JSON.stringify(rules),
    ENABLED_RULES_DOC: rules.length > 0 ? rules.join(", ") : "(none)"
  };
}
function applyTemplate(template, vars) {
  return template.replace(
    /\{\{([A-Z_]+)\}\}/g,
    (match, key) => key in vars ? vars[key] : match
  );
}
function generateProjectFiles(data) {
  const vars = buildTemplateVars(data);
  const fill = (t) => applyTemplate(t, vars);
  const safetySummary = getSafetySummary(data);
  const files = [];
  files.push({
    path: "AI_GUIDELINES.md",
    name: "AI_GUIDELINES.md",
    content: fill(buildGuidelinesTemplate(data)),
    language: "markdown",
    category: "guidelines"
  });
  files.push(...buildIdeRuleFiles(data, vars, safetySummary));
  files.push(...buildMemoryBankFiles(data, vars, safetySummary));
  const a = data.automation;
  if (a.includeCheckGuidelines) {
    files.push({
      path: "scripts/check_guidelines.py",
      name: "check_guidelines.py",
      content: fill(TEMPLATE_CHECK_GUIDELINES_PY),
      language: "python",
      category: "scripts"
    });
  }
  if (a.includePreCommitHook) {
    files.push({
      path: "scripts/pre-commit-hook.sh",
      name: "pre-commit-hook.sh",
      content: buildPreCommitHook(data.locale),
      language: "shell",
      category: "scripts"
    });
  }
  if (a.includeCheckGuidelines || a.includePreCommitHook) {
    files.push({
      path: ".gitattributes",
      name: ".gitattributes",
      content: "*.sh text eol=lf\n*.py text eol=lf\n*.yml text eol=lf\n",
      language: "plaintext",
      category: "config"
    });
  }
  if (a.includeGitHubCI) {
    files.push({
      path: ".github/workflows/ai-guidelines-ci.yml",
      name: "ai-guidelines-ci.yml",
      content: TEMPLATE_GITHUB_CI,
      language: "yaml",
      category: "ci"
    });
  }
  if (a.includeAuditPrompt) {
    files.push({
      path: "AUDIT_PROMPT.md",
      name: "AUDIT_PROMPT.md",
      content: fill(buildAuditPrompt(data.locale)),
      language: "markdown",
      category: "guidelines"
    });
  }
  if (a.includeGitignore) {
    files.push({
      path: ".gitignore",
      name: ".gitignore",
      content: buildGitignore(data.locale),
      language: "plaintext",
      category: "config"
    });
  }
  return files;
}

// cli/index.ts
var VERSION = "1.1.0";
var HELP = `vibe-governor ${VERSION}

Usage:
  vibe-governor init [options]

Options:
  --preset=<string>     Full configuration copied from the web wizard (step 5)
  --dir=<path>          Target directory (default: current directory)
  --force               Overwrite existing files
  --no-hook             Do not install .git/hooks/pre-commit
  --dry-run             Only list the files that would be written

  Without --preset, defaults can be adjusted with:
  --name=<project>      Project name
  --platforms=<list>    CLAUDE_CLI,ANTIGRAVITY,CURSOR,WINDSURF,CLINE,GITHUB_COPILOT
  --languages=<list>    Rust,TypeScript,Python,C++,Go,Verilog,VHDL
  --max-lines=<n>       File line limit (200-1500, default 800)
  --doc-score=<n>       Documentation score threshold (5-10, default 8)
  --lang=<tr|en>        Output language (default tr)

  -h, --help            Show this help
  -v, --version         Show version
`;
function parseArgs(argv) {
  const flags = /* @__PURE__ */ new Map();
  let command;
  for (const arg of argv) {
    if (arg === "-h") flags.set("help", true);
    else if (arg === "-v") flags.set("version", true);
    else if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq < 0) flags.set(arg.slice(2), true);
      else flags.set(arg.slice(2, eq), arg.slice(eq + 1));
    } else if (!command) command = arg;
  }
  return { command, flags };
}
function str(flags, key) {
  const v = flags.get(key);
  return typeof v === "string" ? v : void 0;
}
function list(value) {
  return value === void 0 ? void 0 : value.split(",").map((s) => s.trim()).filter(Boolean);
}
function fail(message) {
  console.error(`\u2716 ${message}`);
  process.exit(1);
}
function resolveConfig(flags) {
  const preset = str(flags, "preset");
  if (preset !== void 0) {
    const res = decodePreset(preset);
    if (!res.ok) fail(res.error);
    return res.data;
  }
  const d = DEFAULT_FORM_DATA;
  const num = (key, fallback) => {
    const v = str(flags, key);
    return v === void 0 ? fallback : Number(v);
  };
  const candidate = {
    ...d,
    locale: str(flags, "lang") ?? d.locale,
    targetPlatforms: list(str(flags, "platforms")) ?? d.targetPlatforms,
    languages: list(str(flags, "languages")) ?? d.languages,
    constraints: {
      ...d.constraints,
      maxLines: num("max-lines", d.constraints.maxLines),
      docScoreThreshold: num("doc-score", d.constraints.docScoreThreshold)
    },
    memoryBank: { ...d.memoryBank, projectName: str(flags, "name") ?? d.memoryBank.projectName }
  };
  const parsed = wizardSchema.safeParse(candidate);
  if (!parsed.success) {
    fail(parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; "));
  }
  return parsed.data;
}
function init(flags) {
  const data = resolveConfig(flags);
  const tr = data.locale === "tr";
  const root = path.resolve(str(flags, "dir") ?? process.cwd());
  const force = flags.has("force");
  const dryRun = flags.has("dry-run");
  const files = generateProjectFiles(data);
  console.log(`\u{1F6E1}\uFE0F  Vibe Governor \u2192 ${root}`);
  let written = 0;
  let skipped = 0;
  for (const file of files) {
    const target = path.join(root, ...file.path.split("/"));
    const exists = fs.existsSync(target);
    if (exists && !force) {
      skipped += 1;
      console.log(`  \u23ED  ${file.path} ${tr ? "(zaten var, --force ile \xFCzerine yaz\u0131l\u0131r)" : "(exists, use --force to overwrite)"}`);
      continue;
    }
    if (!dryRun) {
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, file.content, "utf8");
      if (/\.(sh|py)$/.test(file.path)) fs.chmodSync(target, 493);
    }
    written += 1;
    console.log(`  ${exists ? "\u267B\uFE0F " : "\u2714 "} ${file.path}`);
  }
  const hook = files.find((f) => f.path === "scripts/pre-commit-hook.sh");
  const gitDir = path.join(root, ".git");
  if (hook && !flags.has("no-hook") && fs.existsSync(gitDir) && fs.statSync(gitDir).isDirectory()) {
    const hookPath = path.join(gitDir, "hooks", "pre-commit");
    if (fs.existsSync(hookPath) && !force) {
      console.log(`  \u23ED  .git/hooks/pre-commit ${tr ? "(zaten var)" : "(exists)"}`);
    } else {
      if (!dryRun) {
        fs.mkdirSync(path.dirname(hookPath), { recursive: true });
        fs.writeFileSync(hookPath, hook.content, "utf8");
        fs.chmodSync(hookPath, 493);
      }
      console.log(`  \u{1FA9D} .git/hooks/pre-commit ${tr ? "kuruldu" : "installed"}`);
    }
  }
  const prefix = dryRun ? tr ? "[deneme] " : "[dry-run] " : "";
  console.log(
    tr ? `
${prefix}${written} dosya yaz\u0131ld\u0131, ${skipped} dosya atland\u0131.` : `
${prefix}${written} file(s) written, ${skipped} skipped.`
  );
  if (files.some((f) => f.path === "scripts/check_guidelines.py")) {
    console.log(tr ? "Denetim: python3 scripts/check_guidelines.py" : "Verify: python3 scripts/check_guidelines.py");
  }
}
function main() {
  const { command, flags } = parseArgs(process.argv.slice(2));
  if (flags.has("version")) {
    console.log(VERSION);
    return;
  }
  if (flags.has("help") || !command) {
    console.log(HELP);
    return;
  }
  if (command !== "init") fail(`Unknown command "${command}". Run with --help.`);
  init(flags);
}
main();
