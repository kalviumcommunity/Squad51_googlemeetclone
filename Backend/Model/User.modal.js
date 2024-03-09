var moongose=require("mongoose");
const schema=moongose.Schema

const signUpSchema=new schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
   
},{
        timestamps: true
    });


    const signUp = moongose.model('signup', signUpSchema);

    module.exports = signUp;