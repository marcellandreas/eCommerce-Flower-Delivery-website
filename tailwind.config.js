/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        black: "#121212",
        white: "#ffffff",
        darkGray: "#424242",
        gray: "#808080",
        lightGray: "#d9d9d9",
        extraLight: "#f5f5f5",
        error: "#ff0000",
        success: "#00ff00",
        
        // Dark mode specific colors (optional, Tailwind will handle most)
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          border: "#334155",
          text: "#e2e8f0",
          textSecondary: "#94a3b8",
        }
      },
      fontSize: {
        // Mobile sizes
        mobileH1: ["72px", { lineHeight: "80px" }],
        mobileH2: ["48px", { lineHeight: "56px" }],
        mobileH3: ["32px", { lineHeight: "40px" }],
        mobileH4: ["24px", { lineHeight: "32px" }],
        mobileH5: ["20px", { lineHeight: "24px" }],
        mobileH6: ["16px", { lineHeight: "20px" }],
        mobileSub: ["16px", { lineHeight: "24px" }],
        mobileBody: ["14px", { lineHeight: "20px" }],
        mobileButton: ["14px", { lineHeight: "20px" }],
        mobileLinks: ["14px", { lineHeight: "20px" }],
        mobileOverline: ["12px", { lineHeight: "16px" }],
        mobileCaption: ["14px", { lineHeight: "20px" }],
        mobileCaptionSmall: ["12px", { lineHeight: "16px" }],
        
        // Desktop sizes
        desktopH1: ["96px", { lineHeight: "104px" }],
        desktopH2: ["64px", { lineHeight: "72px" }],
        desktopH3: ["40px", { lineHeight: "48px" }],
        desktopH4: ["32px", { lineHeight: "40px" }],
        desktopH5: ["24px", { lineHeight: "32px" }],
        desktopH6: ["20px", { lineHeight: "24px" }],
        desktopSub: ["18px", { lineHeight: "28px" }],
        desktopBody: ["16px", { lineHeight: "24px" }],
        desktopB: ["16px", { lineHeight: "24px" }],
        desktopLinks: ["16px", { lineHeight: "24px" }],
        desktopOverline: ["14px", { lineHeight: "20px" }],
        desktopCaption: ["16px", { lineHeight: "24px" }],
        desktopCaptionSmall: ["14px", { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
}