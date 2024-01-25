const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        type: { type: String, required: true },
        description: { type: String },
        link: { type: String },
    },
    {
        timestamps: true,
    }
);
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
