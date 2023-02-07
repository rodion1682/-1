export function validator(data, config) {
   const errors = {};
   function validate(validateMethod, data, config) {
      let statusValidate;
      if (validateMethod === 'isRequired') {
         statusValidate = data.trim() === '';
      } else if (validateMethod === 'isEmail') {
         const emailRegExp = /^\S+@\S+\.\S+$/g;
         statusValidate = !emailRegExp.test(data);
      } else if (validateMethod === 'isCapitalSumbol') {
         const capitalRegExp = /[A-Z]+/g;
         statusValidate = !capitalRegExp.test(data);
      } else if (validateMethod === 'isContainDigit') {
         const digitRegExp = /\d+/g;
         statusValidate = !digitRegExp.test(data);
      } else if (validateMethod === 'min') {
         statusValidate = data.length < config.value;
      }
      if (statusValidate) return config.message;
   }
   for (const fieldName in data) {
      for (const validateMethod in config[fieldName]) {
         const error = validate(
            validateMethod,
            data[fieldName],
            config[fieldName][validateMethod]
         );
         if (error && !errors[fieldName]) {
            errors[fieldName] = error;
         }
      }
   }
   return errors;
}
