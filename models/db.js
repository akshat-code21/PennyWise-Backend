const { MONGO_URL } = require('../config/config')
const mongoose = require('mongoose');
mongoose.connect(`${MONGO_URL}`).then(()=>{console.log('connected to db')});
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const UserSchema = new Schema({
    name : { type: String, required: true },
    email : {type : String,unique : true,required : true},
    passwordHash : {type : String,required : true}
})
const ExpenseSchema = new Schema({
    userId : {type : ObjectId,ref : 'User',required : true},
    amount : Number,
    category : String,
    date : {type : Date,default : Date.now},
    description : String
})
const UserModel = mongoose.model('Users',UserSchema);
const ExpenseModel = mongoose.model('Expense',ExpenseSchema);
module.exports = {
    UserModel,ExpenseModel
}