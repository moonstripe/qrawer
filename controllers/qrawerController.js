const db = require('../model');

// const tokenForUser = function(user){
//     const timestamp = new Date().getTime();
//     // subject and issued at
//     // What this returns will be the payload that we pass into jwt strategy
//     // This encodes the token with the secret
//     return jwt.encode({ sub: user.id, iat: timestamp }, config.JWT_SECRET);
// };


module.exports = {
    //adding projects
    addQrawer: async (req, res) => {

        // console.log("User projectController L16:", req.user);

        const { name, items } = req.body;
        const { _id: userId } = req.user;

        // If they don't give an email or password, return early
        if (!name) {
            return res.status(422).json({ error: 'you must provide project name' });
        }
        try {
            // See if there's an existing user.
            const existingQrawer = await db.Qrawer.findOne({ name });
            // If a user with email does exist, throw an error;
            if (existingQrawer) {
                return res.status(422).json({ error: 'Existing Qrawer with given name' });
            }

            const qrawer = new db.Qrawer({ name: name, postedBy: userId });

            console.log('qrawer:', qrawer);
            // Save user to database
            await qrawer.save();
            res.json({ name: name, id: qrawer._id });
        } catch (e) {
            console.log(e);
            res.status(404).json({ e });
        }

    },

    findAllQrawers: async (req, res) => {
        console.log('findallproject', req.user)
        try {
            await db.Qrawer.find({})
                .then((doc) => {
                    // console.log(doc);
                    res.json(doc);
                })
                .catch(e => {
                    console.log(e);
                    res.status(404).json({ e });
                });
        } catch (e) {
            console.log(e)
        }
    },
    findOneQrawer: async (req, res) => {
        console.log('find 1 project');
        const { qrawerId } = req.params;

        console.log(qrawerId);

        // find one mongo
        const foundQrawer = await db.Qrawer.findOne({ _id: qrawerId })

        res.json(foundQrawer)

    },
    //editing projects
    editQrawer: async (req, res) => {
        res.send('editQrawer hit')
    },
    //deleting projects
    deleteQrawer: async (req, res) => {

        const { qrawerId } = req.params;

        const foundShelves = await db.Shelf.find({ containedIn: qrawerId });
        // find Shelves in Qrawer to delete
        if (foundShelves) {
            // delete contents of qrawer starting with Item
            for (let i = 0; i < foundShelves.length; i++) {
                const deletedItems = await db.Item.deleteMany({ containedIn: foundShelves[i]['_id'] })
                console.log('deleted Items:', deletedItems)
            }
            const deletedShelf = await db.Shelf.deleteMany({ containedIn: qrawerId })
            console.log('deleted Shelf:', deletedShelf)

        }

        console.log(qrawerId);
        const deletedQrawer = await db.Qrawer.deleteOne({ _id: qrawerId })

        res.json(deletedQrawer);
    }
};
