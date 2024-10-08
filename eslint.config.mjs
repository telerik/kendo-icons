import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2018,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es6
            }
        }
    },
    {
        rules: {
            "no-unexpected-multiline": "error",
            "block-scoped-var": "error",
            "complexity": [ 1, 15 ],
            "consistent-return": "error",
            "curly": "error",
            "default-case": "error",
            "dot-location": ["error", "property"],
            "eqeqeq": ["error", "smart"],
            "no-alert": "error",
            "no-caller": "error",
            "no-console": "error",
            "no-else-return": "error",
            "no-eval": "error",
            "no-implied-eval": "error",
            "no-extend-native": "error",
            "no-extra-bind": "error",
            "no-implicit-coercion": "error",
            "no-invalid-this": "error",
            "no-lone-blocks": "error",
            "no-loop-func": "error",
            "no-multi-spaces": "error",
            "no-native-reassign": "error",
            "no-new": "error",
            "no-param-reassign": "error",
            "no-return-assign": "error",
            "no-sequences": "error",
            "no-useless-call": "error",
            "array-bracket-spacing": ["error", "always"],
            "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
            "camelcase": "error",
            "comma-style": "error",
            "consistent-this": ["error", "that"],
            "indent": ["error", 4, { "SwitchCase": 1 }],
            "jsx-quotes": "error",
            "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
            "keyword-spacing": ["error", { "before": true, "after": true }],
            "linebreak-style": ["error", "unix"],
            "max-params": ["error", 4],
            "no-multiple-empty-lines": ["error", {"max": 2}],
            "no-nested-ternary": "error",
            "no-spaced-func": "error",
            "no-trailing-spaces": "error",
            "object-curly-spacing": ["error", "always"],
            "semi": [ "error", "always" ],
            "semi-spacing": "error",
            "space-before-blocks": "error",
            "space-before-function-paren": ["error", "never"],
            "space-infix-ops": ["error", {"int32Hint": false} ],
            "arrow-body-style": "error",
            "no-confusing-arrow": "error",
            "no-class-assign": "error",
            "no-const-assign": "error",
            "no-dupe-class-members": "error",
            "no-this-before-super": "error",
            "no-var": "error",
            "yoda": ["error", "never", { "exceptRange": true }]
        }
    },
    {
        ignores: ["**/node_modules", "**/dist"]
    }
];
