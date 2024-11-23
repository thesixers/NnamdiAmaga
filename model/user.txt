import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  createdAt: { type: Date, default: Date.now },
});

 
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function({email, password}){
    let user = await this.findOne({email});

    console.log(user);
    console.log({email, password});


    if(user){
        if(password !== ''){
            let passCheck = await bcrypt.compare(password,user.password)
            
            if(passCheck){
                return user;
            }
                throw Error('incorrect password');
        }
            throw Error('password field is empty')
    }
    throw Error('No account with this email');
}

const User = mongoose.model('hbpUser', userSchema);

export default User;
