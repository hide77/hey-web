import { FETCH } from "hey-mocks";
export default ({ data, token, user }) => {
  const body = {
    channel: "__hey-search",
    text: `user searched: ${data}`,
    attachments: [
      {
        color: "#68AFEB",
        pretext: "User",
        title: "Email",
        title_link: "hey.network",
        text: user.email,
        fields: [
          {
            title: "Full name",
            value: user.first_name + " " + user.last_name,
            short: true
          },
          {
            title: "ID",
            value: user._id,
            short: true
          },
          {
            title: "Language",
            value: user.language,
            short: true
          },
          {
            title: "Member since",
            value: user.created_at,
            short: true
          },
          {
            title: "Stripe",
            value: user.stripe_id,
            short: true
          },
          {
            title: "Karma",
            value: user.karma,
            short: true
          }
        ],
        footer: user.username,
        footer_icon:
          user.pictures && user.pictures.default
            ? user.pictures.default.indexOf("http") === 0
              ? user.pictures.default
              : `https://${user.pictures.default}`
            : ""
      }
    ]
  };
  FETCH("POST /v1/slack", {
    token,
    json: true,
    stringify: true,
    body
  }).then(r => {
    console.log("sent to slack", r);
  });
};
