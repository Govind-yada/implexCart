const { Newsletters, Contact, readStore } = require('../models/store');
const initialData = require('../data/initialData');

const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    await Newsletters.add(email.trim());
    res.json({
      success: true,
      message: 'Subscribed successfully! Check your inbox for exclusive global offers.'
    });
  } catch (error) {
    console.error('Newsletter error:', error);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
};

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please complete all required fields.' });
    }
    const saved = await Contact.add({ name, email, subject, message });
    res.json({
      success: true,
      message: 'Thank you! Your inquiry has been routed to Implex 24/7 Support. Ticket #' + saved.id,
      ticket: saved
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to submit contact message.' });
  }
};

const getFAQs = (req, res) => {
  res.json({ success: true, faqs: initialData.faqs });
};

module.exports = {
  subscribeNewsletter,
  submitContact,
  getFAQs
};
