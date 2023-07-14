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



exports.createVaccination = async (req, res) => {
  try {
    const { name, date, min, max, delete_time } = req.body;

    const vaccination = new Vaccination({
      name,
      date,
      min,
      max,
      delete_time
    });

    await vaccination.save();

    const users = await User.find({ role: 'mother' });

    if (users.length === 0) {
      return res.status(404).json({ error: 'No users with the role "mother" found' });
    }

    for (const user of users) {
      if (!user.profile.babyInfo || user.profile.babyInfo.length === 0) {
        continue;
      }

      for (const babyInfo of user.profile.babyInfo) {
        if (babyInfo.age >= min && babyInfo.age <= max) {
          const newVaccination = {
            _id: vaccination._id, // Use _id instead of res._id
            name,
            date,
            min,
            max,
            delete_time,
            status: false // Set the statusvaccin field to false
          };

          if (!babyInfo.vaccination) {
            babyInfo.vaccination = [];
          }
          babyInfo.vaccination.push(newVaccination);
        }
      }

      await user.save();
    }

    res.status(201).json({ message: 'Vaccination added to all babies of users with the role "mother"', status: 201 });
  } catch (error) {
    console.error('Error creating vaccination:', error);
    res.status(500).json({ error: 'Internal error' });
  }
};

//------------------------------------------------------------------------------

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







// exports.getVaccinationsForMother = async (req, res) => {
//   try {
//     const motherId = req.params.motherId;
//     const { min, max } = req.body;

//     const vaccinations = await Vaccination.find({
//       motherId,
//       babyAge: { $gte: min, $lte: max },
//     });

//     res.json(vaccinations);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


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


