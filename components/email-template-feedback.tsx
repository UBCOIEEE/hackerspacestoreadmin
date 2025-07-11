import {Body,Container,Column,Head,Html,Img,Link,Preview,Row,Section,Text,} from "@react-email/components";
import Image from "next/image";
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
const ubcoieeeoficialsiteurl = "https://ubcoieee.org/"
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
    timeZone: 'America/Los_Angeles'
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
              This is feedback you have sent on{" "}
              {formattedDate}&nbsp;PST:
            </Text>
            <Text style={paragraph}>
            &quot;{message}&quot;
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
          
          {/*<Section>
          <Row style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Column>
              <a href={ubcoieeeoficialsiteurl}>
                <Image src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/UBCOIEEELOGO_n9rkxc.png" width={30} height={30} alt="" />
              </a>
            </Column>
            <Column >
              <a href={twitterurl}>
                <Image src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758878/twitter-logo_oxhc5t.png" width={30} height={30} alt=""/>
              </a>
            </Column>
            <Column /*style={{ flex: "20%", paddingRight: "8px" }}*/ }{/*>
              <a href={linkedinurl}>
                <Image src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/linkedin-logo_kd7joi.webp"  width={30} height={30} alt=""/>
              </a>
            </Column>
            <Column >
              <a href={facebookurl}>
                <Image src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/facebook-logo_qqu0s6.png"  width={30} height={30} alt=""/>
              </a>
            </Column>
            <Column >
              <a href={instagramurl}>
                <Image src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758877/instagram-logo_lurtub.png" width={30} height={30} alt=""/>
              </a>
            </Column>
          </Row>
          </Section>*/}
          <Row
            style={{
              width: "120px",
            }}
          >
            <Column style={{ paddingRight: "4px" }}>
              <Link href={twitterurl}>
                <Img
                  width="20"
                  height="20"
                  src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758878/twitter-logo_oxhc5t.png"
                />
              </Link>
            </Column>
            <Column style={{ paddingRight: "4px" }}>
              <Link href={instagramurl}>
                <Img
                  width="20"
                  height="20"
                  src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758877/instagram-logo_lurtub.png"
                />
              </Link>
            </Column>
            <Column align = 'center'>
              <Link href={ubcoieeeoficialsiteurl}>
                <Img
                  width="20"
                  height="20"
                  src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/UBCOIEEELOGO_n9rkxc.png"
                />
              </Link>
            </Column>
            <Column style={{ paddingLeft: "4px" }}>
              <Link href={facebookurl}>
                <Img
                  width="20"
                  height="20"
                  src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/facebook-logo_qqu0s6.png"
                />
              </Link>
            </Column>
            <Column style={{ paddingLeft: "4px" }}>
              <Link href={linkedinurl}>
                <Img
                  width="20"
                  height="20"
                  src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706758875/linkedin-logo_kd7joi.webp"
                />
              </Link>
            </Column>
          </Row>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2024 Hackerspace Store, All Rights Reserved <br/>
              2245 EME, 1137 Alumni Avenue, Kelowna, BC V1V 1V7
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default EmailTemplateFeedback;
