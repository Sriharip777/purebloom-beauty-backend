const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const pureBloomStyle = `
<style>
  body { font-family: 'Georgia', 'Times New Roman', serif; margin: 0; padding: 0; background-color: #f5f0eb; }
  .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .header { background: #1a1a2e; padding: 32px 40px; text-align: center; }
  .header h1 { color: #f5f0eb; font-family: 'Georgia', serif; font-size: 24px; margin: 0; letter-spacing: 2px; }
  .header .tagline { color: #b8d4e3; font-family: Arial, sans-serif; font-size: 12px; margin-top: 6px; letter-spacing: 3px; text-transform: uppercase; }
  .body-content { padding: 40px; }
  .body-content h2 { color: #1a1a2e; font-family: 'Georgia', serif; font-size: 20px; margin-top: 0; }
  .body-content p { color: #4a4a5a; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.7; }
  .btn { display: inline-block; background: #1a1a2e; color: #ffffff !important; text-decoration: none; padding: 12px 32px; border-radius: 50px; font-family: Arial, sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.5px; }
  .footer { background: #f5f0eb; padding: 24px 40px; text-align: center; }
  .footer p { color: #888; font-family: Arial, sans-serif; font-size: 12px; margin: 4px 0; }
  .footer a { color: #1a1a2e; }
  .divider { height: 1px; background: #e8e0d8; margin: 24px 0; }
</style>
`;

const wrapEmail = (content) => `
<!DOCTYPE html>
<html>
<head>${pureBloomStyle}</head>
<body style="margin:0;padding:20px;background:#f5f0eb">
  <div class="container">
    <div class="header">
      <h1>PureBloom Beauty</h1>
      <div class="tagline">Curated Beauty Discovery</div>
    </div>
    <div class="body-content">${content}</div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} PureBloom Beauty. All rights reserved.</p>
      <p>Curated beauty picks for your everyday glow</p>
      <p><a href="mailto:srihariharipechettis@gmail.com">srihariharipechettis@gmail.com</a></p>
    </div>
  </div>
</body>
</html>
`;

const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.APP_BASE_URL || 'http://localhost:5173'}/admin/reset-password/${resetToken}`;
  const content = `
    <h2>Reset Your Password</h2>
    <p>We received a request to reset the password for your PureBloom Beauty admin account.</p>
    <p>Click the button below to set a new password. This link expires in 1 hour.</p>
    <p style="text-align:center;margin:32px 0">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </p>
    <div class="divider"></div>
    <p style="font-size:12px;color:#888">If you didn't request this, please ignore this email. Your password is safe.</p>
    <p style="font-size:12px;color:#888">If the button doesn't work, copy this link: ${resetUrl}</p>
  `;
  return transporter.sendMail({
    from: `"PureBloom Beauty" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'PureBloom Beauty - Password Reset Request',
    html: wrapEmail(content),
  });
};

const sendContactNotification = async (contactData) => {
  const content = `
    <h2>New Contact Message</h2>
    <p><strong>From:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${contactData.subject}</p>
    <div class="divider"></div>
    <p><strong>Message:</strong></p>
    <p>${contactData.message}</p>
  `;
  return transporter.sendMail({
    from: `"PureBloom Beauty Contact" <${process.env.SMTP_FROM_EMAIL}>`,
    to: process.env.ADMIN_RECEIVE_EMAIL,
    subject: `New Contact: ${contactData.subject}`,
    html: wrapEmail(content),
  });
};

const sendThankYouEmail = async (email, name) => {
  const content = `
    <h2>Thank You, ${name}!</h2>
    <p>We received your message and will get back to you within 24 hours.</p>
    <p>At PureBloom Beauty, we're dedicated to helping you discover the perfect beauty products for your unique glow.</p>
    <p>In the meantime, feel free to browse our curated collection of beauty essentials.</p>
    <p style="text-align:center;margin:32px 0">
      <a href="${process.env.APP_BASE_URL || 'http://localhost:5173'}/products" class="btn">Explore Products</a>
    </p>
    <p>With love,<br>The PureBloom Beauty Team</p>
  `;
  return transporter.sendMail({
    from: `"PureBloom Beauty" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'We received your message - PureBloom Beauty',
    html: wrapEmail(content),
  });
};

const sendNewsletterWelcome = async (email) => {
  const content = `
    <h2>Welcome to PureBloom Beauty!</h2>
    <p>You're now subscribed to our newsletter. Get ready for:</p>
    <p>✨ Curated beauty product recommendations<br>
    ✨ Exclusive deals and offers<br>
    ✨ Beauty tips and trends<br>
    ✨ New product launches</p>
    <p>We're so happy to have you as part of our beauty community.</p>
    <p>With love,<br>The PureBloom Beauty Team</p>
  `;
  return transporter.sendMail({
    from: `"PureBloom Beauty" <${process.env.SMTP_FROM_EMAIL}>`,
    to: email,
    subject: 'Welcome to PureBloom Beauty!',
    html: wrapEmail(content),
  });
};

module.exports = { sendPasswordResetEmail, sendContactNotification, sendThankYouEmail, sendNewsletterWelcome };
