import { controllerWrapper } from "../../decorators/index.js";
import { sendEmail } from "../../helpers/index.js";
import { Message } from "../../models/index.js";

const helpEmail = async (req, res) => {
  const { name, _id: owner } = req.user;
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
  await Message.create({ ...req.body, owner });

  res.json({
    message: "Help email sent",
  });
};

export default controllerWrapper(helpEmail);
