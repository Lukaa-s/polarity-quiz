module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Système éditorial "Scrutin". Hex pour fiabilité des modificateurs d'opacité (/10, /60…).
        paper: "#F6F3EC",
        paper2: "#EDE9DE",
        paper3: "#E3DDCE",
        ink: "#23201A",
        ink2: "#5E594F",
        rule: "#D8D2C4",
        // Pôles fonctionnels — ne pas réutiliser comme accent décoratif.
        left: "#C62828",
        right: "#1565C0",
      },
      fontFamily: {
        display: ['"Fraunces"', "ui-serif", "Georgia", "serif"],
        body: ['"Libre Franklin"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Libre Franklin"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
}
