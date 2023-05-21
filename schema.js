//validator module 
//npm i validator
const validator = require('validator'); // validator module

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: password => password.length >= 6,
      message: 'Password must be at least 6 characters long'
    }
  },
  username: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  numOfBaby: {
    type: Number,
    required: true,
    validate: {
      validator: function(numOfBaby) {
        return numOfBaby >= 0;
      },
      message: 'Number of babies cannot be negative'
    }
  },
  role: {
    type: String,
    required: true,
    enum: ['pregnant', 'mother', 'seller'],
    default: function() {
      return this.numOfBaby === 0 ? 'pregnant' : 'mother';
    }
  },
  isPregnant: { type: Boolean, default: false },
  pregnancyMonth: { type: Number },
  babyWeight: { type: Number },
  profile: {
    babyInfo: [
      {
        weight: { type: Number },
        height: { type: Number },
        headSize: { type: Number },
        age: { type: Number },
        temperature: { type: Number },
        vaccination: { type: String },
        extraInfo: [
          {
            foodTracker: { type: String },
            kindOfFood: { type: String }
          }
        ],
        reportFile: { type: String }
      }
    ]
  }
});





//Ahmed Anwar 
// Products 
const sellerProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  numAvialable: { type: Number },
  seller: { type: Schema.Types.ObjectId, ref: 'User',role:'seller', required: true },
  productImage:{type:string}
 //review type array 

});

//make collection for product name rate have comment review and rate 1:5 and product id ,user id 

// Order 
const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: [{ type: Schema.Types.ObjectId, ref: 'SellerProduct', required: true }],
  quantity: { type: Number, required: true },
    
    //make status enum -> pending ,done,cansled ,in prograss 
    
  status: { type: String },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
  },
    //waiting to handel later 
  paymentMethod: { type: String } ,
  orderDate: { type: Date, default: Date.now },
});

//Make collection for posts have the post owner and the post content and id of user and comments=>{array of obj}  and the post catgory 

//Make adrop dowen list when adding post the catgory of post 
const User = mongoose.model('User', userSchema);
const SellerProduct = mongoose.model('SellerProduct', sellerProductSchema);
const Order = mongoose.model('Order', orderSchema);
