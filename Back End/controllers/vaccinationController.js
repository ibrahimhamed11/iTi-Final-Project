const Vaccination = require('../Models/vaccination');

exports.createVaccination = async (req, res) => {
  const {  name, date, minAge, maxAge } = req.body;

  const vaccination = new Vaccination({
    name,
    date,
    minAge,
    maxAge,
  });


  try {
    const savedVaccination = await vaccination.save();
    res.status(201).json(savedVaccination);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateVaccination = async (req, res) => {
  try {
    const { vaccinationId } = req.params;
    const {  name, date, minAge, maxAge } = req.body;

    const updatedVaccination = await Vaccination.findByIdAndUpdate(
      vaccinationId,
      {
        name,
        date,
        minAge,
        maxAge,
      },
      { new: true }
    );

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
    const { minAge, maxAge } = req.body;

    const vaccinations = await Vaccination.find({
      motherId,
      babyAge: { $gte: minAge, $lte: maxAge },
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
