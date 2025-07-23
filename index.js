const Canvas = require("canvas");

// Register Bold font
Canvas.registerFont(`${__dirname}/assets/fonts/THEBOLDFONT.ttf`, { family: "Bold" });
// Register SketchMatch font
Canvas.registerFont(`${__dirname}/assets/fonts/Sketch-Match.ttf`, { family: "SketchMatch" });
// Register SketchMatch font
Canvas.registerFont(`${__dirname}/assets/fonts/luckiest-guy.regular.ttf`, { family: "luckiest guy" });
// Register KeepCalm font
Canvas.registerFont(`${__dirname}/assets/fonts/KeepCalm-Medium.ttf`, { family: "KeepCalmed" });

module.exports.RankCard = require('./src/rank/Rank');
