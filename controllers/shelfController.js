const db = require('../model');

module.exports = {
    // add shelf
    addShelf: async (req, res) => {
        // console.log("User projectController L16:", req.user);

        const { name, containedIn } = req.body;
        const { _id: userId } = req.user;

        // If they don't give an email or password, return early
        if (!name || !containedIn) {
            return res.status(422).json({ error: 'you must provide shelf name and a valid qrawer reference.' });
        }
        try {
            // See if there's an existing user.
            const existingShelf = await db.Shelf.findOne({ name });
            // If a user with email does exist, throw an error;
            if (existingShelf) {
                return res.status(422).json({ error: 'Existing Shelf with given name' });
            }

            // See if there's a matching qrawer.
            const existingQrawer = await db.Qrawer.findOne({ _id: containedIn });
            // If a user with email does exist, throw an error;
            if (!existingQrawer) {
                return res.status(422).json({ error: 'No matching Qrawer' });
            }

            const shelf = new db.Shelf({ name, containedIn });

            // add shelf reference to qrawerobject
            const qrawer = await db.Qrawer.updateOne(
                {_id: containedIn},
                {$push: { shelves: shelf}}
            )

            console.log('new qrawer:', qrawer)

            console.log('shelf:', shelf);

            // Save user to database
            await shelf.save();
            res.json({ name: name, id: shelf._id});
        } catch (e) {
            console.log(e);
            res.status(404).json({ e });
        }
    },

    // get shelf
    findAllShelvesByQrawer: async (req, res) => {
        console.log('findallshelves', req)

        const { qrawerId } = req.params

        console.log( qrawerId )

        try {
            await db.Shelf.find({ containedIn: qrawerId })
            .then((doc) => {
                console.log(doc);
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
    findOneShelf: async (req, res) => {
        console.log('find 1 shelf');
        const { shelfId } = req.params;

        console.log(shelfId)

        // find one mongo
        const foundShelf = await db.Shelf.findOne({ _id: shelfId })

        console.log('sC 84', foundShelf)

        res.json(foundShelf)

    },

    // delete shelf
    deleteShelf: async (req, res) => {
        const { shelfId } = req.params;

        console.log(shelfId);

        const foundShelf = await db.Shelf.findOne({ _id: shelfId })
        // console.log('yesa?', foundShelf)

        const deletedItems = await db.Item.deleteMany({ containedIn: shelfId })

        console.log('deleted Items:', deletedItems)

        const deletedShelf = await db.Shelf.deleteOne({ _id: shelfId })

        const qrawer = await db.Qrawer.updateOne(
            {_id: foundShelf.containedIn},
            {$pull: { shelves: shelfId}}
        )

        res.json({deletedShelf, qrawer});

    },

    // edit shelf
    editShelf: async (req, res) => {

    }

}