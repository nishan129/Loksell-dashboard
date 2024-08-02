

export function generateSlug(title) {
    const slug = title
      .toLowerCase() // Convert the title to lowercase
      .replace(/\s+/g, "-") // Replace spaces with dashes
      .replace(/[^\w\-]+/g, "") // Remove non-word characters except dashes
      .replace(/\-\-+/g, "-") // Replace multiple consecutive dashes with a single dash
      .replace(/^\-+/, "") // Remove dashes from the beginning
      .replace(/\-+$/, ""); // Remove dashes from the end
  
    return slug;
  }

  export const slugify = (text, uniqueIdentifier) => {
    return `${text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
    }-${uniqueIdentifier}`;
  };