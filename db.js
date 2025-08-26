import mongoose from "mongoose";
function dbConnection(){
mongoose.connect(`mongodb+srv://RegisterLogin:RegisterLogin@cluster0.rlksgly.mongodb.net/SignInUser?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Database connected Successfully')
}).catch((e) => console.log('error connecting database', e))

}
export default dbConnection;