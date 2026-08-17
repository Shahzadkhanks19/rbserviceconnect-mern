import ContactMessage from '../models/ContactMessage.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactMessage(req, res) {
  const { name, email, topic = 'general', message } = req.body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ message: 'Name, email, and message are required' });
  }

  if (!emailPattern.test(email.trim())) {
    return res.status(400).json({ message: 'Enter a valid email address' });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ message: 'Message must be at least 10 characters' });
  }

  const contactMessage = await ContactMessage.create({
    name: name.trim(),
    email: email.trim(),
    topic,
    message: message.trim(),
  });

  return res.status(201).json({
    message: 'Thanks. Your message has been received.',
    id: contactMessage._id,
  });
}
