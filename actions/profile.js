"use server";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatar = exports.getProfile = exports.updateProfile = void 0;
var dal_1 = require("@/libs/dal");
var db_1 = require("@/services/db");
var cache_1 = require("next/cache");
var drizzle_orm_1 = require("drizzle-orm");
function updateProfile(prev, formData) {
    return __awaiter(this, void 0, Promise, function () {
        var name, phone, session, updateData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = formData.get("name");
                    phone = formData.get("phone");
                    // Validate phone number contains only digits
                    if (!/^\d+$/.test(phone)) {
                        return [2 /*return*/, {
                                errors: {
                                    phone: ["Phone number must contain only numbers."],
                                },
                            }];
                    }
                    return [4 /*yield*/, (0, dal_1.verifySession)()];
                case 1:
                    session = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    updateData = {
                        name: name,
                        phone: phone,
                        updated_at: new Date(),
                    };
                    return [4 /*yield*/, db_1.db
                            .update(db_1.users)
                            .set(updateData)
                            .where((0, drizzle_orm_1.eq)(db_1.users.id, session.userId))];
                case 3:
                    _a.sent();
                    (0, cache_1.revalidatePath)("/dashboard/profile");
                    return [2 /*return*/, {
                            success: true,
                            errors: {},
                        }];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            errors: {
                                _form: ["Failed to update profile. Please try again.", error_1],
                            },
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateProfile = updateProfile;
function getProfile() {
    return __awaiter(this, void 0, Promise, function () {
        var session, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, dal_1.verifySession)()];
                case 1:
                    session = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, db_1.db
                            .select({
                            name: db_1.users.name,
                            email: db_1.users.email,
                            phone: db_1.users.phone,
                            avatar: db_1.users.avatar,
                        })
                            .from(db_1.users)
                            .where((0, drizzle_orm_1.eq)(db_1.users.id, session.userId))
                            .get()];
                case 3:
                    user = _a.sent();
                    if (!user) {
                        throw new Error("User not found");
                    }
                    return [2 /*return*/, { success: true, data: user, error: null }];
                case 4:
                    error_2 = _a.sent();
                    return [2 /*return*/, {
                            success: false,
                            data: {},
                            error: error_2 instanceof Error ? error_2 : new Error("Failed to fetch profile"),
                        }];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getProfile = getProfile;
function getAvatar() {
    return __awaiter(this, void 0, Promise, function () {
        var session, avatar;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    session = (0, dal_1.verifySession)();
                    if (!session.isAuth) {
                        return [2 /*return*/, {
                                success: false,
                                data: "unAuthorized",
                                error: true
                            }];
                    }
                    return [4 /*yield*/, db_1.db.from(db_1.users).select("avatar").where((0, drizzle_orm_1.eq)(db_1.users.id, session.userId))];
                case 1:
                    avatar = _a.sent();
                    return [2 /*return*/, {
                            success: true,
                            data: avatar,
                            error: false
                        }];
            }
        });
    });
}
exports.getAvatar = getAvatar;
