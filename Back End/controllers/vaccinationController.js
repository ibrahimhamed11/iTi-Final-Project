const Vaccination = require('../Models/vaccination');
const User = require('../Models/Users');


exports.getVaccineById = async (req, res) => {

  const { vaccinationId } = req.params;

  const vaccine = await Vaccination.findById(vaccinationId);
  console.log(vaccine)
  res.send({ data: vaccine })
}
exports.getAllVaccines = async (req, res) => {
  const vaccines = await Vaccination.find()
  res.send(vaccines);
}


//new vaccination and push this to all mothers have babies
exports.createVaccination = async (req, res) => {
  try {
    const { name, date, min, max, delete_time } = req.body;

    // Save the vaccine in  vaccination schema 

    // Find all users with the role 'mother'
    const users = await User.find({ role: 'mother' });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users with the role "mother" found' });
    }

    // Iterate through each user and add the new vaccination to their baby profiles
    for (const user of users) {
      // Check if the user has any baby information
      if (!user.profile.babyInfo || user.profile.babyInfo.length === 0) {
        continue; // Skip this user and move to the next one
      }

      // Iterate through each baby info and add the new vaccination
      for (const babyInfo of user.profile.babyInfo) {
        // Check if the age of the vaccination is less than the baby's age
        if (babyInfo.age < max) {
          // Create a new vaccination object
          const newVaccination = new Vaccination({
            name,
            date,
            min,
            max,
            delete_time
          });


          // Add the new vaccination to the baby's profile
          babyInfo.vaccination.push(newVaccination);

        }          // Save the updated user object
        await user.save();

      }
      res.status(201).json({ message: 'Vaccination added to all babies of users with the role "mother"', status: 201 });
    }
  } catch (error) {
    console.error('Error creating vaccination:', error);
    res.status(500).json({ error: 'Internal error' });
  }
};





exports.updateVaccination = async (req, res) => {
  try {
    const { vaccinationId } = req.params;
    const { name, min, max, delete_time } = req.body;

    const updatedVaccination = await Vaccination.findOneAndUpdate(
      { _id: vaccinationId },
      { name, min, max, delete_time },
    );
    console.log();

    if (!updatedVaccination) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }

    res.status(200).json(updatedVaccination);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};







exports.getVaccinationsForMother = async (req, res) => {
  try {
    const motherId = req.params.motherId;
    const { min, max } = req.body;

    const vaccinations = await Vaccination.find({
      motherId,
      babyAge: { $gte: min, $lte: max },
    });

    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteVaccination = async (req, res) => {
  try {
    const vaccinationId = req.params.vaccinationId;

    const deletedVaccination = await Vaccination.findByIdAndDelete(vaccinationId);

    if (!deletedVaccination) {
      return res.status(404).json({ error: 'Vaccination not found' });
    }

    res.status(200).json({ message: 'Vaccination deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
