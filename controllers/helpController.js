import { controllerWrapper } from "../decorators/index.js";
import { sendEmail } from "../middlewars/index.js";
import { Message } from "../models/index.js";

const helpEmail = async (req, res) => {
  const { name } = req.user;
  const { email, comment } = req.body;

  const newEmail = {
    from: email,
    subject: `User ${name} need help`,
    html: `
    <p>Comment from <b>${name}</b> (reply to ${email})</p>
    <hr align="left" width="500" size="2"/>
    <p><b> Message:</b> ${comment}</p>
    <p>Yours respectfully,</p><p>${name}</p> 
    `,
  };
  await sendEmail(newEmail);
  await Message.create(req.body);

  res.json(req.body);
};

export default {
  helpEmail: controllerWrapper(helpEmail),
};
