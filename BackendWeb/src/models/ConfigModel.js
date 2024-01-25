const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema(
    {
        author: { type: String, required: true, unique: true },
        email: { type: String, required: true },
        type: { type: String, required: true },
        phone: { type: String, required: true  },
        zalo: { type: String },
        facebook: { type: String  },
        address: { type: String },
        metadesc: { type: String  },
        metakey: { type: String },

    },
    {
        timestamps: true,
    }
);
const Config = mongoose.model('Config', brandSchema);

module.exports = Config;
