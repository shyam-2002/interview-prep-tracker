const handle_question_err = (err)=>{
    const errors = {question_name : '', question_topic : '', question_link : ''};
    const err_code = err.code;
    const err_msg = err.message;
    if(err_code === 11000){
        const arr = Object.values(err);
        console.log(arr[4]);
        
        const real = Object.keys(arr[4]);

        errors[real] = `This ${real} is not available`;
        return errors;
    }
    
}



module.exports = {
  handle_question_err
}