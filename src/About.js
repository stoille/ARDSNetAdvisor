import React from "react";
import { styles } from "./styles";

const Contact = () => (
  <div style={styles.container}>
    <h1 style={styles.title}>About</h1>
    <p>
      <b>Disclaimer:</b> This application is based on the NHLBI ARDS Clinical
      Network Mechanical Ventilation Protocol Summary and is not meant to
      replace clinical judgment. Visit{" "}
      <a href="http://ardsnet.org">http://ardsnet.org</a> for more information.
    </p>
    <p>
      Authors: <a href="mailto: aschwrtz@gmail.com">Jonathan Schwartz</a>,
      <a href="https://github.com/wave255">Mark Lacay</a>
      <br />
      Fork this code on{" "}
      <a href="https://codesandbox.io/s/ardsnetadvisor-n2uib">codesandbox.io</a>
    </p>
  </div>
);

export default Contact;
