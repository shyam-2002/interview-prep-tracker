const handle_err = (err)=>{
      const errors = {email : '', password : ''};
      const err_code = err.code;
      const err_msg = err.message;
      if(err_code === 11000){
          errors['email'] = "This email is not available";
          return errors;
      }
      if(err_msg == 'email error'){
          errors['email'] = 'This email is not registered';
      }
      if(err_msg == 'password error'){
          errors['password'] = 'Incorrect password';
      }
      if(err_msg.includes("User validation failed")){
            const obj = Object.values(err.errors)
            obj.forEach(({properties})=>{
                 errors[properties.path] = properties.message;
            })
      }
      return errors;
}


module.exports = {
    handle_err
}