export const getTextFromMessageContent = (content) => {
  if (typeof content === "string") {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === "string") {
          return item;
        }

        if (item?.type === "text") {
          return item.text;
        }

        return "";
      })
      .join("")
      .trim();
  }

  return "";
};
