const handleObject = {
  getKeyOfEnum: (enum_object: Object, enum_value: string) => {
    const indexOfEnumValue = Object.values(enum_object).indexOf(enum_value);
    return Object.keys(enum_object)[indexOfEnumValue];
  },

  convertIntoFormData: (object: any) => {
    const formData = new FormData();
    const keys = Object.keys(object);

    keys.forEach((key) => {
      if (key === "avatar") {
        object[key] && formData.append(key, object[key]);
      } else {
        formData.append(key, object[key].toString().trim() ?? "");
      }
    });

    return formData;
  },
};

export default handleObject;
