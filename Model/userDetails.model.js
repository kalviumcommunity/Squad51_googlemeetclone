var moongose=require("mongoose");
const schema=moongose.Schema

const userDetails=new schema({
    id:{type:Number},
    MeetingId:{type:String},
    name:{type:String},
    lastname:{type:String},
    email:{type:String},
    Title:{type:String},
    Link:{type:String}
},{
        timestamps: true
    });


    const UserDetails = moongose.model('userDetails', userDetails);

    module.exports = UserDetails;