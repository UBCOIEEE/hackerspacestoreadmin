import {Body,Container,Column,Head,Html,Img,Link,Preview,Row,Section,Text,} from "@react-email/components";
import * as React from "react";

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
};

interface EmailTemplateProps {
  time: Date;
  firstName: string;
  message: string;
}
const ubcoieeeoficialsiteurl = 'https://ubcoieee.org/'
const twitterurl = "https://twitter.com/UBCOIEEE"
const facebookurl = "https://www.facebook.com/IEEEUBCO/"
const linkedinurl = "https://www.linkedin.com/company/ieee-okanagan-student-chapter/"
const instagramurl = "https://www.instagram.com/ieeeubco/"

export const EmailTemplateFeedback = ({
  time,
  firstName,
  message
}: EmailTemplateProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(time);

  return (
    <Html>
      <Head />
      <Preview>Your feedback was received</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706233756/IEEE_Okanagan_Student_Chapter_Logo_transparent_yiowkm.png" />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>Hi {firstName},</Text>
            <Text style={paragraph}>
              This is feedabck you have sent on{" "}
              {formattedDate}:
            </Text>
            <Text style={paragraph}>
              {message}
            </Text>
            <Text style={paragraph}>
              We thank you for your contribution in our store development. Our team will review 
              your feedback and use it to improve future interactions with users!
            </Text>
            <Text style={paragraph}>
              Thanks,
              <br />
              Hackerspace Store - UBCO IEEE branch
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Link href={ubcoieeeoficialsiteurl} style={link}>
                <Img src='react-email-starter\static\UBCOIEEELOGO.png' />
              </Link>
            </Column>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Link href={twitterurl} style={link}>
                <Img src='react-email-starter\static\twitter-logo.png' />
              </Link>
            </Column>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Link href={linkedinurl} style={link}>
                <Img src='react-email-starter\static\linkedin-logo.webp' />
              </Link>
            </Column>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Link href={facebookurl} style={link}>
                <Img src='react-email-starter\static\facebook-logo.png' />
              </Link>
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Link href={instagramurl} style={link}>
                <Img src='react-email-starter\static\facebook-logo.png'/>
              </Link>
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2024 Hackerspace Store, All Rights Reserved <br />
              2245 EME, 1137 Alumni Avenue, Kelowna, BC V1V 1V7
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default EmailTemplateFeedback;
