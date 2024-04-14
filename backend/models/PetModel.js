const mongoose = require('mongoose')
// const User = require('./User');


const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    species: {
      type: String,
      required: true,
      enum: ["cat", "dog", "parrot", "fish", "insect", "other pet"],
      index: true,
    },

    breed: String,

    age: {
      type: String,
      required: true,
      index: true,
    },

    color: {
      type: String,
      index: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "unknown"],
      default: "unknown",
    },

    description: String,

    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Photo",
      },
    ],

    adoptionStatus: {
      type: String,
      enum: ["available", "pending", "adopted"],
      default: "available",
    },

    price: {
      type: String,
    },

    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    // },

    /*deleted created_at field because mongoose has built-in timestamps*/
  },
  { timestamps: true }
);


// PetSchema.post('save'):
// This post-save middleware is executed after a Pet document is successfully saved to the MongoDB database.
// It checks if the user who owns the pet does not already have the 'petSeller' role. If they don't, it adds this role to the user.
// Parameters:
// - doc: The document that was just saved. This is an instance of the Pet model.
// - next: A callback function to proceed to the next middleware in the sequence, if any.


// petSchema.post('save', async function(doc, next) {
//     console.log("User model", User); // Should log the User model function
//     const ownerUser = await User.findById(doc.owner); // Find the user who owns the pet.
//     if (ownerUser && !ownerUser.roles.includes('petSeller')) {
//         ownerUser.roles.push('petSeller'); // Add 'petSeller' role to the user.
//         await ownerUser.save(); // Save the updated user document.
//     }
//     next(); // Proceed to the next middleware.
// });

// PetSchema.post('remove'):
// This post-remove middleware is triggered after a Pet document is successfully removed from the database.
// It checks if the user who owned the deleted pet no longer has any pet posts. If so, and if the user has the 'petSeller' role, it removes this role.
// Parameters:
// - doc: The document that was just removed. This is an instance of the Pet model that was deleted.
// - next: A callback function to proceed to the next middleware in the sequence, if any.


// petSchema.post('remove', async function (doc, next) {
//     const ownerUser = await User.findById(doc.owner); // Find the user who owned the deleted pet.
//     if (ownerUser) {
//         const pets = await Pet.find({ owner: ownerUser._id }); // Find all remaining pets owned by this user.
//         if (pets.length === 0 && ownerUser.roles.includes('petSeller')) {
//             ownerUser.roles = ownerUser.roles.filter(role => role !== 'petSeller'); // Remove 'petSeller' role from the user.
//             await ownerUser.save(); // Save the updated user document.
//         }
//     }
//     next(); // Proceed to the next middleware.
// });




petSchema.index({ species: "text", color: "text" });

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet;