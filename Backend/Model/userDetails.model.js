var moongose=require("mongoose");
const schema=moongose.Schema

const userDetails=new schema({
    id:{type:Number},
    name:{type:String},
    lastname:{type:String},
    email : {type:String, default : "gmail.com"},
    Title:{type:String},
    Link:{type:String},
    CreatedBy:{type:String}
},{
        timestamps: true
    });


    const UserDetails = moongose.model('userDetails', userDetails);

    module.exports = UserDetails;