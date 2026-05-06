import "../src/app/globals.css";
import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },

        backgrounds: {
            options: {
                dark: { name: "Dark", value: "#0a0a0a" },
            },
        },

        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: "todo",
        },
    },
    initialGlobals: {
        // 👇 Set the initial background color
        backgrounds: { value: "dark" },
    },
};

export default preview;
