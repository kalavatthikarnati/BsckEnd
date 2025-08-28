import mongoose from "mongoose";
function dbConnection(){
mongoose.connect(process.env.MONGODBURL).then(() => {
    console.log('Database connected Successfully')
}).catch((e) => console.log('error connecting database', e))

}
export default dbConnection;