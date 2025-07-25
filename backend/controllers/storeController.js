const Store = require("../models/Store");

exports.createStore = async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    const id = await Store.create({ name, email, address, owner_id });
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await Store.findAll(req.query);
    // Tag isMine for the logged-in owner
    let result = stores;
    if (req.user && req.user.role === "OWNER") {
      result = stores.map(store => ({
        ...store,
        isMine: store.owner_id === req.user.id
      }));
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStoreRatings = async (req, res) => {
  try {
    const storeId = req.params.id;
    const ratings = await Store.getRatingsByStoreId(storeId);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
