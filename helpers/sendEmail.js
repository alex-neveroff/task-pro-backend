import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_API_KEY, PROJECT_EMAIL, HELP_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = {
    ...data,
    to: PROJECT_EMAIL,
    from: HELP_EMAIL,
  };
  await sgMail.send(email);
  return true;
};

export default sendEmail;
