export const passwRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$ %^&*-.]).{8,}$/;

export const usernameRegex = /@(.+)/;

export const officialChannelRegex = /^§[A-Z]+[^a-z]*$/;

export const nonOfficialChannelRegex = /^§[a-z]+[^A-Z]*$/;

export const channelRegex = new RegExp(
  officialChannelRegex.source +
    '|' +
    nonOfficialChannelRegex.source +
    '|' +
    /^#.+$/.source,
);

export const urlRegex = /(https?:\/\/[^\s]+)/g;
