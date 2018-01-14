"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var assert = require("assert");
var _1 = require("../");
var info;
var schema = graphql_1.buildSchema("\ntype Address {\n    line1: String\n    line2: String\n    city: String\n    state: String\n    country: String\n}\n\ntype Availability {\n    requestedHours: Int\n}\n\ninterface Employee {\n    id: ID\n    firstName: String\n    lastName: String\n    birthday: String\n    address: Address\n}\n\ntype Crew implements Employee {\n    id: ID\n    firstName: String\n    lastName: String\n    birthday: String\n    address: Address\n    availability: Availability\n}\n\nenum ManagerRole {\n    SHIFT_SUPERVISOR\n    RESTAURANT_MANAGER\n    GENERAL_MANAGER\n}\n\ntype Manager implements Employee {\n    id: ID\n    firstName: String\n    lastName: String\n    birthday: String\n    address: Address\n    role : ManagerRole\n}\n\nunion SearchResult = Manager | Crew\n\ntype Store {\n    id: ID\n    address: Address\n    crew : [Crew]\n    managers : [Manager]\n}\n\ntype Query {\n    stores: [Store]\n    employees: [SearchResult]\n}\n\nschema {\n    query: Query\n}\n");
var resolver = function (source, args, context, i) {
    info = i;
    return [];
};
describe('GraphQLNodes', function () {
    afterEach(function () {
        info = null;
    });
    it('Creates map for simple query', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, expected, graphqlArgs, response, graphqlNodes, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n            query {\n                stores {\n                    crew {\n                        firstName\n                        lastName\n                    }\n                }\n            }\n        ";
                    expected = {
                        "crew": {
                            "firstName": {},
                            "lastName": {}
                        }
                    };
                    graphqlArgs = {
                        schema: schema,
                        source: query,
                        fieldResolver: resolver
                    };
                    return [4 /*yield*/, graphql_1.graphql(graphqlArgs)];
                case 1:
                    response = _a.sent();
                    graphqlNodes = new _1.default(info);
                    map = graphqlNodes.createMap();
                    assert.deepStrictEqual(map, expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creates map for query with fragment definition', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, expected, graphqlArgs, response, graphqlNodes, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n            fragment profile on Crew {\n                firstName\n                lastName\n                birthday\n            }\n\n            query {\n                stores {\n                    crew {\n                        ... profile \n                    }\n                }\n            }\n        ";
                    expected = {
                        "crew": {
                            "firstName": {},
                            "lastName": {},
                            "birthday": {}
                        }
                    };
                    graphqlArgs = {
                        schema: schema,
                        source: query,
                        fieldResolver: resolver
                    };
                    return [4 /*yield*/, graphql_1.graphql(graphqlArgs)];
                case 1:
                    response = _a.sent();
                    graphqlNodes = new _1.default(info);
                    map = graphqlNodes.createMap();
                    assert.deepStrictEqual(map, expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creates map for query with inline fragment', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, expected, graphqlArgs, response, graphqlNodes, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n            query {\n                employees {\n                    ... on Crew {\n                        firstName\n                        availability {\n                            requestedHours\n                        }\n                    }\n                    ... on Manager {\n                        firstName\n                        role\n                    }\n                }\n            }\n        ";
                    expected = {
                        "firstName": {},
                        "availability": {
                            "requestedHours": {}
                        },
                        "role": {}
                    };
                    graphqlArgs = {
                        schema: schema,
                        source: query,
                        fieldResolver: resolver
                    };
                    return [4 /*yield*/, graphql_1.graphql(graphqlArgs)];
                case 1:
                    response = _a.sent();
                    graphqlNodes = new _1.default(info);
                    map = graphqlNodes.createMap();
                    assert.deepStrictEqual(map, expected);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Creates map for complex query with fragment definitions and inline fragments', function () { return __awaiter(_this, void 0, void 0, function () {
        var query, expected, graphqlArgs, response, graphqlNodes, map;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = "\n            fragment name on Employee {\n                firstName\n                lastName\n            }\n\n            query {\n                employees { \n                    ... on Crew {\n                        ... name\n                    }\n                    ... on Manager {\n                        ... name\n                    }\n                }\n            }\n        ";
                    expected = {
                        "firstName": {},
                        "lastName": {}
                    };
                    graphqlArgs = {
                        schema: schema,
                        source: query,
                        fieldResolver: resolver
                    };
                    return [4 /*yield*/, graphql_1.graphql(graphqlArgs)];
                case 1:
                    response = _a.sent();
                    graphqlNodes = new _1.default(info);
                    map = graphqlNodes.createMap();
                    assert.deepStrictEqual(map, expected);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=index.spec.js.map