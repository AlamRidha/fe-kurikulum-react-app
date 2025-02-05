export const formatSeparatedText = (text, separator = "/") => {
  if (!text) return [];

  //   convert if text is not string
  const stringText = String(text);

  //   split text by separator and remove whitespace
  return stringText.split(separator).map((item) => item.trim());
};

export const formatDisplayText = (text, options = {}) => {
  const { capitalize = false, lowercase = false, uppercase = false } = options;

  if (!text) return "";

  let formattedText = String(text).trim();

  if (capitalize) {
    formattedText =
      formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
  }

  if (lowercase) {
    formattedText = formattedText.toLowerCase();
  }

  if (uppercase) {
    formattedText = formattedText.toUpperCase();
  }

  return formattedText;
};

export const ensureArray = (value) => {
  if (value === null || value === undefined) {
    return [""];
  }

  if (typeof value === "string") {
    const arr = value.split("\n").filter((item) => item.trim() !== "");
    return arr.length === 0 ? [""] : arr;
  }

  if (Array.isArray(value)) {
    return value.filter((item) => item.trim() !== "");
  }

  return [""];
};
