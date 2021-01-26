import mongoose from 'mongoose';

const ipValidatorSchema = mongoose.Schema({
    poll_id : String,
    ip_adress : [String],
})

const ipDoc = mongoose.model('ipDoc',ipValidatorSchema);

export default ipDoc;