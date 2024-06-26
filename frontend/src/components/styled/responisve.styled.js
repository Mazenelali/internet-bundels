const sizes = {
    mobileS: "320px",
    mobileM: "420px",
    mobileL: "540px",
    tablet: "600px",
    laptop: "1024px",
    laptopL: "1440px",
    desktop: "2560px",
};

export const devices = {
    mobileS: `(min-width: ${sizes.mobileS})`,
    mobileM: `(min-width: ${sizes.mobileM})`,
    mobileL: `(min-width: ${sizes.mobileL})`,
    tablet: `(min-width: ${sizes.tablet})`,
    laptop: `(min-width: ${sizes.laptop})`,
    laptopL: `(min-width: ${sizes.laptopL})`,
    desktop: `(min-width: ${sizes.desktop})`,
};
