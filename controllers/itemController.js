const db = require('../model');

module.exports = {
    // add shelf
    addItem: async (req, res) => {
        // console.log("User projectController L16:", req.user);

        const { name, count, containedIn } = req.body;
        const { _id: userId } = req.user;

        // If they don't give an email or password, return early
        if (!name || !containedIn) {
            return res.status(422).json({ error: 'you must provide item name and a valid qrawer reference.' });
        }
        try {
            // See if there's an existing user.
            const existingItem = await db.Item.findOne({ name });
            // If a user with email does exist, throw an error;
            if (existingItem) {
                return res.status(422).json({ error: 'Existing item with given name' });
            }

            // See if there's a matching qrawer.
            const existingShelf = await db.Shelf.findOne({ _id: containedIn });
            // If a user with email does exist, throw an error;
            if (!existingShelf) {
                return res.status(422).json({ error: 'No matching Shelf' });
            }

            const item = new db.Item({ name, count, containedIn });

            // add item reference to qrawerobject
            const shelf = await db.Shelf.updateOne(
                {_id: containedIn},
                {$push: { items: item}}
            )

            console.log('new shelf:', shelf)

            console.log('item:', item);

            // Save user to database
            await item.save();
            res.json({ name: name, id: item._id});
        } catch (e) {
            console.log(e);
            res.status(404).json({ e });
        }
    },

    // get item
    findAllItemsByShelf: async (req, res) => {
        console.log('findallitems', req)

        const { shelfId } = req.params

        console.log( shelfId )
        try {
            await db.Item.find({ containedIn: shelfId })
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
    findOneItem: async (req, res) => {
        console.log('find 1 shelf');
        const { itemId } = req.params;

        // find one mongo
        const foundItem = await db.Item.findOne({ _id: itemId })

        res.json(foundItem)

    },

    // delete item
    deleteItem: async (req, res) => {
        const { itemId } = req.params;

        console.log(itemId);

        const foundItem = await db.Item.findOne({ _id: itemId })
        // console.log('yesa?', foundShelf)

        const deletedItem = await db.Item.deleteOne({ _id: itemId })

        const shelf = await db.Shelf.updateOne(
            {_id: foundItem.containedIn},
            {$pull: { items: itemId}}
        )

        res.json({deletedItem, shelf});

    },

    // edit item
    editItem: async (req, res) => {

    }

}