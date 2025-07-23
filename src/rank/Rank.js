const Canvas = require('canvas');
const { formatVariable, applyText } = require('../../utils/functions');

module.exports = class RankCard {
  constructor() {
    this.backgroundImage = `${__dirname}/../../assets/img/1px.png`;
    this.avatar = `${__dirname}/../../assets/img/default-avatar.png`;
    this.level = '1';
    this.rank = '10';
    this.username = 'username';
    this.xpCurrent = 8000;
    this.xpNeeded = 12000;
    this.trueXp = 10000;
    this.addonRank = true;
    this.colorBackground = '#000000';
    this.colorLayer = '#000000';
    this.colorLevelBox = '#ff7b4b';
    this.colorLevel = '#ffffff';
    this.colorRank = '#ffffff';
    this.colorUsername = '#ffffff';
    this.colorBackgroundBar = '#484b4e';
    this.colorNeededXp = '#ffffff';
    this.colorBar = '#ffffff';
    this.radiusCorner = '20';
    this.radiusCornerLayer = 15;
    this.opacityBackground = '0.75';
    this.opacityLevel = '1';
    this.opacityBackgroundBar = 1;
    this.opacityLayer = 0.75;
    this.sideSpace = 25;
    this.textLevel = '{level}';
    this.textNeededXp = '{current} / {needed} XP';
  }

  setTrueXp(value) {
    this.trueXp = value;
    return this;
  }

  setAvatar(value) {
    this.avatar = value;
    return this;
  }

  setUsername(value) {
    this.username = value;
    return this;
  }

  setRank(value) {
    this.rank = value;
    return this;
  }

  setLevel(value) {
    this.level = value;
    return this;
  }

  setBackground(value) {
    this.backgroundImage = value;
    return this;
  }

  setXP(variable, value) {
    const formattedVariable = formatVariable('xp', variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setColor(variable, value) {
    const formattedVariable = formatVariable('color', variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setText(variable, value) {
    const formattedVariable = formatVariable('text', variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setOpacity(variable, value) {
    const formattedVariable = formatVariable('opacity', variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setAddon(variable, value) {
    const formattedVariable = formatVariable('addon', variable);
    if (this[formattedVariable]) this[formattedVariable] = value;
    return this;
  }

  setBadge(variable, value) {
    const number = Number(variable);
    for (let i = badges[0]; i <= badges[1]; i++)
      if (number === i) {
        this[`badge${number}`] = value;
        break;
      }
    return this;
  }

  setRadius(value) {
    this.radiusCorner = value;
    return this;
  }

  async toAttachment() {
    let canvas = Canvas.createCanvas(934, 282),
      ctx = canvas.getContext('2d');

    const lvlText = this.textLevel.replace(/{level}/g, this.level);

    // Background
    ctx.beginPath();
    ctx.moveTo(0 + Number(this.radiusCorner), 0);
    ctx.lineTo(0 + 934 - Number(this.radiusCorner), 0);
    ctx.quadraticCurveTo(0 + 934, 0, 0 + 934, 0 + Number(this.radiusCorner));
    ctx.lineTo(0 + 934, 0 + 282 - Number(this.radiusCorner));
    ctx.quadraticCurveTo(0 + 934, 0 + 282, 0 + 934 - Number(this.radiusCorner), 0 + 282);
    ctx.lineTo(0 + Number(this.radiusCorner), 0 + 282);
    ctx.quadraticCurveTo(0, 0 + 282, 0, 0 + 282 - Number(this.radiusCorner));
    ctx.lineTo(0, 0 + Number(this.radiusCorner));
    ctx.quadraticCurveTo(0, 0, 0 + Number(this.radiusCorner), 0);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = this.colorBackground;
    ctx.fillRect(0, 0, 934, 282);
    let background = await Canvas.loadImage(this.backgroundImage);
    ctx.drawImage(background, 0, 0, 934, 282);
    ctx.restore();

    // Layer
    ctx.globalAlpha = this.opacityLayer;

    ctx.fillStyle = this.colorLayer;
    ctx.beginPath();
    ctx.moveTo(this.sideSpace + this.radiusCornerLayer, this.sideSpace);
    ctx.lineTo(canvas.width - this.sideSpace - this.radiusCornerLayer, this.sideSpace);
    ctx.quadraticCurveTo(canvas.width - this.sideSpace, this.sideSpace, canvas.width - this.sideSpace, this.sideSpace + this.radiusCornerLayer);
    ctx.lineTo(canvas.width - this.sideSpace, canvas.height - this.sideSpace - this.radiusCornerLayer);
    ctx.quadraticCurveTo(
      canvas.width - this.sideSpace,
      canvas.height - this.sideSpace,
      canvas.width - this.sideSpace - this.radiusCornerLayer,
      canvas.height - this.sideSpace
    );
    ctx.lineTo(this.sideSpace + this.radiusCornerLayer, canvas.height - this.sideSpace);
    ctx.quadraticCurveTo(this.sideSpace, canvas.height - this.sideSpace, this.sideSpace, canvas.height - this.sideSpace - this.radiusCornerLayer);
    ctx.lineTo(this.sideSpace, this.sideSpace + this.radiusCornerLayer);
    ctx.quadraticCurveTo(this.sideSpace, this.sideSpace, this.sideSpace + this.radiusCornerLayer, this.sideSpace);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();

    // Avatar border
    const avatarRay = 83;
    const thicknessBorder = 0;
    const colorBorder = '#000000';

    ctx.beginPath();
    ctx.arc(40 + 85, 51 + 85, avatarRay + thicknessBorder, 0, Math.PI * 2, true);
    ctx.lineWidth = thicknessBorder;
    ctx.strokeStyle = colorBorder;
    ctx.stroke();

    // Avatar
    let avatar = await Canvas.loadImage(this.avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(40 + 85, 51 + 85, 85, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 40, 51, 170, 170);
    ctx.restore();

    // Level
    let levelText = 'LEVEL ' + this.level;
    let levelPrefix = 'LEVEL ';
    let levelTextWidth = ctx.measureText(levelText).width * 2;
    let levelPrefixWidth = ctx.measureText(levelPrefix).width;
    let levelValue = this.level;
    let levelValueWidth = ctx.measureText(levelValue).width + 25;
    const levelValue0000 = '0000';
    let levelValueWidth0000 = ctx.measureText(levelValue0000).width;

    ctx.textAlign = 'right';
    ctx.fillStyle = this.colorLevel;
    ctx.font = applyText(canvas, levelPrefix, 24, levelPrefixWidth * 2.5, 'KeepCalmed');
    ctx.fillText(levelPrefix, canvas.width - levelValueWidth - levelPrefixWidth - levelValueWidth, 80);

    ctx.font = applyText(canvas, lvlText, 48, 'KeepCalmed');
    ctx.fillText(lvlText, canvas.width - levelValueWidth0000 - 15, 80);

    // Rank
    if (this.addonRank) {
      const rankText = 'RANK';
      const rankTextWidth = ctx.measureText(rankText).width;
      let rankValue = '#' + this.rank;
      let rankValueWidth = ctx.measureText(rankValue).width;
      let rankValueWidth00001 = ctx.measureText(rankValue).width;
      if ((rankValueWidth = rankValueWidth00001)) {
        rankValueWidth = rankValueWidth - 25;
      }
      const rankValue0000 = '0000';
      let rankValueWidth0000 = ctx.measureText(rankValue0000).width + levelTextWidth;

      ctx.textAlign = 'right';
      ctx.fillStyle = '#FCFCFF';
      ctx.font = applyText(canvas, 'RANK', 24, rankTextWidth, 'KeepCalmed');
      ctx.fillText('RANK', canvas.width - levelTextWidth - 15 - rankTextWidth - rankValueWidth00001, 80);

      ctx.fillStyle = this.colorRank;
      ctx.font = applyText(canvas, '#' + this.rank, 48, 'KeepCalmed');
      ctx.fillText('#' + this.rank, canvas.width - rankValueWidth0000 - 15, 80);
    }

    // Username
    ctx.textAlign = 'left';
    ctx.fillStyle = this.colorUsername;
    ctx.font = applyText(canvas, this.username, 40, 'KeepCalmed');
    ctx.fillText(this.username, 80 + 38 + 15 + 25 + 150, 80 + 45 + 20 + 40 - 25);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#808080';
    let trueXpText = 'XP: ' + this.trueXp;
    ctx.font = applyText(canvas, trueXpText, 21, 934 - (80 + 38 + 15 + 25 + 150) - 50, 'KeepCalmed');
    ctx.fillText(trueXpText, 934 - (80 + 38 + 15 + 25 + 150 - 15) - 50, 80 + 45 + 20 + 40 - 25);

    // XP
    ctx.globalAlpha = 1;
    const latestXP = Number(this.xpNeeded) - Number(this.xpCurrent);
    const textXPEdited = this.textNeededXp
      .replace(/{needed}/g, formatNumber(this.xpNeeded))
      .replace(/{current}/g, formatNumber(this.xpCurrent))
      .replace(/{latest}/g, latestXP);
    const avatarHeight = 141;
    const heightProgressBar = canvas.height - avatarHeight / 2 - 90 - (43 / 2 + 8);

    ctx.globalAlpha = 1;
    ctx.textAlign = 'right';
    ctx.fillStyle = this.colorNeededXp;
    ctx.font = applyText(canvas, textXPEdited, 21, 595, 'KeepCalmed');

    const nonGreyTextWidth = ctx.measureText(textXPEdited.slice(0, textXPEdited.indexOf('/'))).width;

    const greyTextWidth = ctx.measureText(textXPEdited.slice(textXPEdited.indexOf(' /') + 1)).width;

    const nonGreyTextX = canvas.width - 50 - (nonGreyTextWidth - 1);

    const GreyTextX = canvas.width - 50 - greyTextWidth;

    ctx.fillText(textXPEdited.slice(0, textXPEdited.indexOf('/')), GreyTextX, 80 + 45 + 20 + 40 - 25);

    ctx.fillStyle = '#808080';
    ctx.fillText(textXPEdited.slice(textXPEdited.indexOf('/')), nonGreyTextX + nonGreyTextWidth, 80 + 45 + 20 + 40 - 25);

    ctx.beginPath();
    ctx.moveTo(207 + 43 + 43 + 21, heightProgressBar + 38 + 8 + 40);
    ctx.lineTo(207 + 43 + 43 + 605 - 21, heightProgressBar + 38 + 8 + 40);
    ctx.quadraticCurveTo(207 + 43 + 43 + 605, heightProgressBar + 38 + 8 + 40, 207 + 43 + 43 + 605, heightProgressBar + 38 + 8 + 40 + 21);
    ctx.lineTo(207 + 43 + 43 + 605, heightProgressBar + 38 + 8 + 40 + 43 - 21);
    ctx.quadraticCurveTo(207 + 43 + 43 + 605, heightProgressBar + 38 + 8 + 40 + 43, 207 + 43 + 43 + 605 - 21, heightProgressBar + 38 + 8 + 40 + 43);
    ctx.lineTo(207 + 43 + 43 + 21, heightProgressBar + 38 + 8 + 40 + 43);
    ctx.quadraticCurveTo(207 + 43 + 43, heightProgressBar + 38 + 8 + 40 + 43, 207 + 43 + 43, heightProgressBar + 38 + 8 + 40 + 43 - 21);
    ctx.lineTo(207 + 43 + 43, heightProgressBar + 38 + 8 + 40 + 21);
    ctx.quadraticCurveTo(207 + 43 + 43, heightProgressBar + 38 + 8 + 40, 207 + 43 + 43 + 21, heightProgressBar + 38 + 8 + 40);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = this.colorBackgroundBar;
    ctx.globalAlpha = this.opacityBackgroundBar;
    ctx.fillRect(207 + 43 + 43, heightProgressBar + 38 + 8 + 40, 605, 43);
    ctx.fillStyle = this.colorLevel;
    ctx.globalAlpha = 1;
    const percent = (100 * this.xpCurrent) / this.xpNeeded;
    const progress = (percent * 605) / 100;
    ctx.fillRect(207 + 43 + 43, heightProgressBar + 38 + 8 + 40, progress, 43);

    return canvas;
  }
};

/**
 * Formats a number for display, abbreviating large numbers with 'k' (thousands) or 'M' (millions) suffixes.
 *
 * @param {number} number - The number to be formatted.
 * @returns {string} The formatted number as a string with appropriate suffix (k or M) for thousands and millions.
 */
function formatNumber(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M';
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1) + 'k';
  } else {
    return number.toString();
  }
}
