import {
Body,
Container,
Column,
Head,
Heading,
Hr,
Html,
Img,
Link,
Preview,
Row,
Section,
Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.VERCEL_URL
? `https://${process.env.VERCEL_URL}`
: "";

interface EmailTemplateProps {
    time: Date;
    order:{
        id: string;
        firstname: string;
        lastname: string;
        phone: string;
        studentId: string;
        personalemail: string;
        studentemail: string;
        isPaid: boolean;
        address: string;
        totalPrice: number;
        createdAt: Date;
        confirmationid: number;
        orderItems: {
            id: string;
            categoryname: string;
            quantitychosen: number;
            productIndex: number;
            mastertype: string;
            typevaluemaster: string;
            childrentype: string;
            typevaluechildren: string;
            thirdtype: string;
            typevaluethird: string;
            name: string;
            quantityavailableatproductvalue: number;
            colorname: string;
            colorvalue: string;
            imageurl: string;
            description: string;
            price: number;
            sizename: string;
            sizevalue: string;
            mode: string;
            createdAt: Date;
        }[];
    }
  }

export const ConfirmationReceiptEmail = ({
    time,
    order
  }: EmailTemplateProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: 'America/Los_Angeles'
      }).format(time);

      return (
        <Html>
            <Head />
            <Preview>Get your order summary, confirmation ID and more</Preview>
            <Body style={main}>
            <Container style={container}>
                <Section style={track.container}>
                <Row>
                    <Column>
                    <Text style={global.paragraphWithBold}>Confirmation Number</Text>
                    <Text style={track.number}>{order.confirmationid}</Text>
                    </Column>
                </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={message}>
                <Img
                    src="https://res.cloudinary.com/dahjexx4c/image/upload/v1706233756/IEEE_Okanagan_Student_Chapter_Logo_transparent_yiowkm.png"
                    width="66"
                    height="100"
                    alt="UBCOIEEE"
                    style={{ margin: "auto" }}
                />
                <Heading style={global.heading}>We are waiting for you, {order.firstname}&nbsp;{order.lastname}!</Heading>
                <Text style={global.text}>
                    We have successfully received your order. Your order is ready for pickup! The hackerspace is located at EME2245. Our working hours can be found in the highlights of our&nbsp;
                    <a className="underline" href='https://www.instagram.com/ieeeubco/'>
                        <u>Instagram Page</u>
                        </a>
                </Text>
                <Text style={{ ...global.text, marginTop: 24 }}>
                    We´ve also charged your payment method for the cost of your order. For payment details or problems,
                    please&nbsp;
                    <a className="underline" href='https://www.instagram.com/ieeeubco/'>
                        Contact Us
                    </a>
                </Text>
                </Section>
                <Hr style={global.hr} />
                {order.orderItems.map((item) => (
                    <Section
                    key={item.id}
                    style={{ ...paddingX, paddingTop: "20px", paddingBottom: "20px" }}
                    >
                    <Row>
                        <Column>
                        <Img
                            src={item.imageurl}
                            alt=""
                            style={{ float: "left" }}
                            width="300px"
                        />
                        </Column>
                        <Column style={{ verticalAlign: "top", paddingLeft: "10px" }}>
                        <Text style={{ ...paragraph, fontWeight: "900" }}>
                            {item.name}
                        </Text>
                        <Text style={global.text}>Category: {item.categoryname}</Text>
                        <Text style={global.text}>Size: {item.sizename}</Text>
                        {item.mode === "2" && (
                            <Text style={global.text}>{item.mastertype}: {item.typevaluemaster}</Text>
                        )}
                        {item.mode === "3" && (
                            <>
                                <Text style={global.text}>{item.mastertype}: {item.typevaluemaster}</Text>
                                <Text style={global.text}>{item.childrentype}: {item.typevaluechildren}</Text>
                            </>
                        )}
                        {item.mode === "4" && (
                            <>
                            <Text style={global.text}>{item.mastertype}: {item.typevaluemaster}</Text>
                            <Text style={global.text}>{item.childrentype}: {item.typevaluechildren}</Text>
                            <Text style={global.text}>{item.thirdtype}: {item.typevaluethird}</Text>
                            </>
                        )}
                        <Text style={global.text}>
                            Color: {item.colorname}
                        </Text>
                        <Text style={global.text}>Price per Unit: {item.price}CAD</Text>
                        <Text style={global.text}>Quantity: {item.quantitychosen}</Text>
                        <Text style={global.text}>Price: {Number((Number(item.price.toFixed(2))*Number(item.quantitychosen.toFixed(2))).toFixed(2))}CAD</Text>
                        </Column>
                    </Row>
                    </Section>    
                ))}
                <Hr style={global.hr} />
                <Section>
                    <Row style={{textAlign: 'center' }}>
                        <Text style={global.paragraphWithBold}>Order Date</Text>
                    </Row>
                    <Row style={{textAlign: 'center' }}>
                    <Text style={track.number}>{formattedDate}&nbsp;PST</Text>
                    </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={menu.container}>
                <Row style={{textAlign: 'center'}}>
                    <Text style={menu.title}>Get Help</Text>
                </Row>
                <Row style={menu.content}>
                    <Column style={{ width: "25%" }} colSpan={1}>
                    <Link href="https://ubcoieee.org/" style={menu.text}>
                       About Us
                    </Link>
                    </Column>
                    <Column style={{ width: "25%" }} colSpan={1}>
                    <Link href="https://hackerspace.ubcoieee.org/faq/" style={menu.text}>
                        FAQ
                    </Link>
                    </Column>
                    <Column style={{ width: "25%" }} colSpan={1}>
                    <Link href="https://hackerspace.ubcoieee.org/privacy/" style={menu.text}>
                        Policies
                    </Link>
                    </Column>
                    <Column style={{ width: "25%" }} colSpan={1}>
                    <Link href="mailto:mlrc.hackerspace@gmail.com" style={menu.text}>
                        Contact Us
                    </Link>
                    </Column>
                </Row>
                </Section>
                <Hr style={global.hr} />
                    <Section style={paddingY}>
                        <Row style={{ textAlign: 'center' }}>
                        <   Text style={global.heading}>UBCO IEEE</Text>
                        </Row>
                        <Row style={categories.container}>
                        <Column align="center">
                            <Link href="https://hackerspace.ubcoieee.org/" style={categories.text}>
                                Store
                            </Link>
                            </Column>
                            <Column align="center">
                            <Link href="https://ubcoieee.org/" style={categories.text}>
                                Club
                            </Link>
                            </Column>
                        </Row>
                    </Section>
                <Hr style={{ ...global.hr, marginTop: "12px" }} />
                <Section style={paddingY}>
                <Row style={footer.policy}>
                    <Column>
                    <Text style={footer.text}>Web Version</Text>
                    </Column>
                    <Column>
                    <Text style={footer.text}>Privacy Policy</Text>
                    </Column>
                </Row>
                <Row>
                    <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                    Please contact us if you have any questions. (If you reply to this
                    email, we won&apos;t be able to see it.)
                    </Text>
                </Row>
                <Row>
                    <Text style={footer.text}>
                    2024 HackerSpaceStore, Inc. All rights reserved.
                    
                    </Text>
                </Row>
                <Row>
                    <Text style={footer.text}>
                    2245 EME, 1137 Alumni Avenue, Kelowna, BC V1V 1V7
                    </Text>
                </Row>
                </Section>
            </Container>
            </Body>
        </Html> );
};

export default ConfirmationReceiptEmail;

const paddingX = {
paddingLeft: "40px",
paddingRight: "40px",
};

const paddingY = {
paddingTop: "22px",
paddingBottom: "22px",
};

const paragraph = {
margin: "0",
lineHeight: "2",
};

const global = {
paddingX,
paddingY,
defaultPadding: {
    ...paddingX,
    ...paddingY,
},
paragraphWithBold: { ...paragraph, fontWeight: "bold" },
heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
} as React.CSSProperties,
text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
},
button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
} as React.CSSProperties,
hr: {
    borderColor: "#E5E5E5",
    margin: "0",
},
};

const main = {
backgroundColor: "#ffffff",
fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
margin: "10px auto",
width: "600px",
maxWidth: "100%",
border: "1px solid #E5E5E5",
};

const track = {
container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
},
number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
},
};

const message = {
padding: "40px 74px",
textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
...paragraph,
fontSize: "15px",
fontWeight: "bold",
};

const recomendationsText = {
margin: "0",
fontSize: "15px",
lineHeight: "1",
paddingLeft: "10px",
paddingRight: "10px",
};

const menu = {
container: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "20px",
    backgroundColor: "#F7F7F7",
},
content: {
    ...paddingY,
    paddingLeft: "20px",
    paddingRight: "20px",
},
title: {
    paddingLeft: "20px",
    paddingRight: "20px",
    fontWeight: "bold",
},
text: {
    fontSize: "13.5px",
    marginTop: 0,
    fontWeight: 500,
    color: "#000",
},
tel: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "32px",
    paddingBottom: "22px",
},
};

const categories = {
container: {
    width: "370px",
    margin: "auto",
    paddingTop: "12px",
},
text: {
    fontWeight: "500",
    color: "#000",
},
};

const footer = {
policy: {
    width: "166px",
    margin: "auto",
},
text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
} as React.CSSProperties,
};
