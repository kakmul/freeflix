"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmdb = exports.SUPPORTED_LANGUAGES = void 0;
var navigation_1 = require("next/navigation");
var TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
var BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
var IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_UR;
// Supported languages based on TMDB API
exports.SUPPORTED_LANGUAGES = {
    'ar-AE': 'Arabic',
    'az-AZ': 'Azerbaijani',
    'bg-BG': 'Bulgarian',
    'bn-BD': 'Bengali',
    'ca-ES': 'Catalan',
    'ch-GU': 'Chamorro',
    'cs-CZ': 'Czech',
    'da-DK': 'Danish',
    'de-DE': 'German',
    'el-GR': 'Greek',
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'eo-EO': 'Esperanto',
    'es-ES': 'Spanish (Spain)',
    'es-MX': 'Spanish (Mexico)',
    'et-EE': 'Estonian',
    'eu-ES': 'Basque',
    'fa-IR': 'Persian',
    'fi-FI': 'Finnish',
    'fr-FR': 'French',
    'he-IL': 'Hebrew',
    'hi-IN': 'Hindi',
    'hu-HU': 'Hungarian',
    'id-ID': 'Indonesian',
    'it-IT': 'Italian',
    'ja-JP': 'Japanese',
    'ka-GE': 'Georgian',
    'kk-KZ': 'Kazakh',
    'kn-IN': 'Kannada',
    'ko-KR': 'Korean',
    'lt-LT': 'Lithuanian',
    'lv-LV': 'Latvian',
    'ml-IN': 'Malayalam',
    'mn-MN': 'Mongolian',
    'ms-MY': 'Malay',
    'nb-NO': 'Norwegian',
    'nl-NL': 'Dutch',
    'pl-PL': 'Polish',
    'pt-PT': 'Portuguese (Portugal)',
    'pt-BR': 'Portuguese (Brazil)',
    'ro-RO': 'Romanian',
    'ru-RU': 'Russian',
    'si-LK': 'Sinhala',
    'sk-SK': 'Slovak',
    'sl-SI': 'Slovenian',
    'sq-AL': 'Albanian',
    'sr-RS': 'Serbian',
    'sv-SE': 'Swedish',
    'ta-IN': 'Tamil',
    'te-IN': 'Telugu',
    'th-TH': 'Thai',
    'tr-TR': 'Turkish',
    'uk-UA': 'Ukrainian',
    'vi-VN': 'Vietnamese',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)'
};
/**
 * Fungsi untuk memvalidasi response dari TMDB API
 * Akan melakukan redirect ke halaman lisensi tidak valid jika terdapat error
 */
var validateResponse = function (json) {
    // Cek apakah response memiliki field error
    if (json.error) {
        console.error('[LICENSE ERROR]', json.error);
        (0, navigation_1.redirect)('/invalid-license');
    }
    // Cek beberapa format error lain yang mungkin
    if (json.success === false && json.status_message) {
        console.error('[API ERROR]', json.status_message);
        // Jika pesan error terkait lisensi atau domain
        if (json.status_message.toLowerCase().includes('invalid') ||
            json.status_message.toLowerCase().includes('license') ||
            json.status_message.toLowerCase().includes('domain') ||
            json.status_message.toLowerCase().includes('purchase') ||
            json.status_message.toLowerCase().includes('email')) {
            (0, navigation_1.redirect)('/invalid-license');
        }
    }
    return json;
};
var fetchTMDB = function (endpoint_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([endpoint_1], args_1, true), void 0, function (endpoint, params) {
        var queryParams, url, response, json, error_1;
        if (params === void 0) { params = {}; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    queryParams = new URLSearchParams(__assign(__assign({}, params), { purchasedCode: 'PQR556677889', email: 'themasmul@gmail.com' })).toString();
                    url = "".concat(BASE_URL).concat(endpoint, "?").concat(queryParams);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                'Authorization': "Bearer ".concat(TMDB_API_KEY),
                                'accept': 'application/json',
                            },
                            cache: 'no-store'
                            //next: { revalidate: 3600 } // Cache for 1 hour
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    json = _a.sent();
                    // 🪵 Log the full request and response
                    console.log("url", url);
                    console.log("[TMDB RESPONSE]", JSON.stringify(json, null, 2));
                    // Validasi response sebelum mengembalikan hasilnya
                    return [2 /*return*/, validateResponse(json)];
                case 4:
                    error_1 = _a.sent();
                    console.error('[FETCH ERROR]', error_1);
                    // Jika terjadi error saat fetching, asumsikan ada masalah dengan lisensi
                    (0, navigation_1.redirect)('/invalid-license');
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.tmdb = {
    getFeaturedMovies: function (language) {
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/trending/movie/week', { language: language });
    },
    getTrendingMovies: function (page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/trending/movie/week', { page: page, language: language });
    },
    getTopRatedTV: function (page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/tv/top_rated', { page: page, language: language });
    },
    getNowPlaying: function (page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/movie/now_playing', { page: page, language: language });
    },
    getMovieDetails: function (id, language) {
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB("/movie/".concat(id), { language: language });
    },
    getMovieVideos: function (id, language) {
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB("/movie/".concat(id, "/videos"), { language: language });
    },
    getMovieRecommendations: function (id, language, page) {
        if (language === void 0) { language = 'en-US'; }
        if (page === void 0) { page = '1'; }
        return fetchTMDB("/movie/".concat(id, "/recommendations"), { language: language, page: page });
    },
    getTVShowDetails: function (id, language) {
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB("/tv/".concat(id), { language: language });
    },
    getTVShowVideos: function (id, language) {
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB("/tv/".concat(id, "/videos"), { language: language });
    },
    getTVShowRecommendations: function (id, language, page) {
        if (language === void 0) { language = 'en-US'; }
        if (page === void 0) { page = '1'; }
        return fetchTMDB("/tv/".concat(id, "/recommendations"), { language: language, page: page });
    },
    searchMovies: function (query, page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/search/movie', { query: query, page: page, language: language, include_adult: 'false' });
    },
    searchTV: function (query, page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/search/tv', { query: query, page: page, language: language, include_adult: 'false' });
    },
    searchMulti: function (query, page, language) {
        if (page === void 0) { page = '1'; }
        if (language === void 0) { language = 'en-US'; }
        return fetchTMDB('/search/multi', { query: query, page: page, language: language, include_adult: 'false' });
    },
    getImageUrl: function (path, size) {
        if (size === void 0) { size = 'original'; }
        return "".concat(IMAGE_BASE_URL, "/").concat(size).concat(path);
    },
    // Helper function to get available languages
    getAvailableLanguages: function () { return exports.SUPPORTED_LANGUAGES; }
};
