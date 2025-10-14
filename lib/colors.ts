// Centralized brand color constants for app-wide reuse (Slack-like palette)
export { SLACK_AUBERGINE_HEX } from "./palette/slackAubergine";
export { SLACK_MAGENTA_HEX } from "./palette/slackMagenta";
export { SLACK_YELLOW_HEX } from "./palette/slackYellow";
export { SLACK_BLUE_HEX } from "./palette/slackBlue";
export { SLACK_GREEN_HEX } from "./palette/slackGreen";
export { SLACK_BLACK_HEX } from "./palette/slackBlack";
export { SLACK_CHARCOAL_HEX } from "./palette/slackCharcoal";
export { SLACK_DARK_GRAY_HEX } from "./palette/slackDarkGray";
export { SLACK_WHITE_HEX } from "./palette/slackWhite";

// Back-compat mapping for existing brandColors usages
export const brandColors = {
  blue: "#36C5F0", // SLACK_BLUE_HEX
  blueDark: "#4A154B", // map to aubergine as primary dark
  green: "#2EB67D", // SLACK_GREEN_HEX
  accent: "#DF1E5A", // SLACK_MAGENTA_HEX
} as const;

// Optional gradients based on Slack palette
export const gradientPrimary = `linear-gradient(135deg, ${brandColors.blue} 0%, ${brandColors.blueDark} 100%)`;
export const gradientAccent = `linear-gradient(135deg, ${brandColors.accent} 0%, ${brandColors.blue} 100%)`;


