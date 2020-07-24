import React from "react";

export default function InfoCard({
  firstName,
  lastName,
  description,
  address,
}) {
  const nonInfo = "No info";
  const dis = description ? description : nonInfo;
  return (
    <div className="info-card">
      <h3>About contact:</h3>
      <div className="fullname">
        Name: {firstName} {lastName}
      </div>
      <div className="discription">
        Description:
        <textarea rows="6" cols="40" disabled>
          {dis}
        </textarea>
      </div>
      <div className="address">
        <div>
          Адрес проживания: <b>{address ? address.streetAddress : nonInfo}</b>
        </div>
        <div>
          {" "}
          Город: <b>{address ? address.city : nonInfo}</b>
        </div>
        <div>
          Провинция/штат: <b>{address ? address.state : nonInfo}</b>
        </div>
        <div>
          Индекс: <b>{address ? address.zip : nonInfo}</b>
        </div>
      </div>
    </div>
  );
}
