import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "@typescript-eslint/explicit-member-accessibility": ["error", {
                accessibility: "explicit"
            }]
        }
    }
);
