
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey('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');

const sendEmail=(msg)=>{
  sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
}
exports.verifyemail = (rec, enc) => {
  const id=enc.content;
  const html = `<h2>Please verify to get daily updates and news feed </h2>
  <a href="http://127.0.0.1:3000/user/verify/${id}">verify </a>
  `;
  const msg = {
    to: rec, // Change to your recipient
    from: "gagandeepvashisht96@gmail.com", // Change to your verified sender
    subject: "Verification of your email",
    text: "This is a textfield ",
    html: html,
  };
  sendEmail(msg);
};

exports.sendToAll = function (content, recievers) {
  const msg = {
    to: recievers,
    from: "gagandeepvashisht96@gmail.com",
    subject: content.subject,
    text: "Random newsletter",
    html: content.body,
  };

  sgMail.sendMultiple(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
