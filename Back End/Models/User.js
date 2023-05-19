const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({

    name: {
         type: String, required: true 
        },
  
    
    email: {
      type: String,
      required: true,
      unique: true,
     
    },
  
    password: {
      type: String,
      required: true},
  
    username: { type: String, required: true },

    age: { type: Number, required: true },

    role: { 

        type: String,
        enum :['mother' , 'seller'],
        required: true,
        default:"mother"
            
      },
  
  
  
},
{
  strict:false,
  versionKey:false,
}

)

module.exports = mongoose.model('User', userSchema);
