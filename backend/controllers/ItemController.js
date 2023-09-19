const Item = require("../models/Item");
const mongoose = require("mongoose");

class ItemController {
  async index(req, res) {
    try {
      const items = await Item.find();
      return res.status(200).json(items);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Internal server error.' });
    }
  }

  async create(req, res) {
    try {
      const { code, price } = req.body;
      console.log('Received request to create item:', code, price);
      const item = await Item.create({ code, price });
      console.log('Item created:', item);
      return res.status(201).json(item);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Erro no Create Controller.' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { code, price } = req.body;
      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).json();
      }

      await item.updateOne({ code, price });
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Internal server error.' });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ Error: 'ID inválido.' });
      }

      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).json({ Error: 'Item não encontrado.' });
      }

      await item.deleteOne();
      return res.status(200).json({ Message: 'Item excluído com sucesso.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ Error: 'Internal server error.' });
    }
  }
}

module.exports = new ItemController();
