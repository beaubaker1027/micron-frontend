let nesting = {
  returnElementValue: (element, nested) => {
    if (!nested) {
      return element;
    }
    if (typeof element !== "object") {
      throw new Error(
        `Element ${JSON.stringify(
          element
        )} does not contain the nested key ${nested}`
      );
    }
    return element[nested];
  }
};

export const returnElementValue = nesting.returnElementValue;
export default nesting;
