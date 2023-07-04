const mongoose = require('mongoose');
// const mongoURI = 'mongodb+srv://jaydevariya2027:jay@cluster0.abnbi9o.mongodb.net/gofoodmern?retryWrites=true&w=majority';
const mongoURI = 'mongodb://jaydevariya2027:jay@ac-l5wyoyc-shard-00-00.abnbi9o.mongodb.net:27017,ac-l5wyoyc-shard-00-01.abnbi9o.mongodb.net:27017,ac-l5wyoyc-shard-00-02.abnbi9o.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-2x6z3v-shard-0&authSource=admin&retryWrites=true&w=majority';
// const mongoDB =() =>{
//     mongoose.connect(mongoURI,()=>{
//         console.log("connected");
//     });
// }
const mongoDB = async () => {
    // try {
    //     await mongoose.connect(mongoURI);
    //     console.log('Connected!');
    //     let fetched_data = mongoose.connection.db.collection("food_items");
    //     let data = await fetched_data.find({}).toArray()
    //     global.food_items = data;

    // } catch (error) {
    //     console.log('err: ', error);
    // }
    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory = catData;
                    }
                })
                // if (err) console.log(err);
                // else {
                //     global.food_items = data;
                //     console.log(global.food_items);
                // }
            })
        }
    })
};

module.exports = mongoDB;