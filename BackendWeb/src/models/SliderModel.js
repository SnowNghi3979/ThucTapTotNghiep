const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        description: { type: String },
        link: { type: String },
        position : { type: String },
    },
    {
        timestamps: true,
    }
);
const Slider = mongoose.model('Slider', sliderSchema);

module.exports = Slider;
