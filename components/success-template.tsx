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
            product:{
                id: string;
                name: string;
                size: {
                    name: string;
                    value: string;
                }
                category:{
                    name: string
                }
                mastertype: string;
                mode: string;
                childrentype: string;
                thirdtype: string;
            };
            quantity: number;
            productvalue:{
                id: string;
                index: number;
                price: number;
                quantity: number,
                typevaluemaster: string;
                typevaluechildren: string;
                typevaluethird: string;
                images: {url: string}[];
                color: {
                    name: string;
                    value: string;
                }
            }
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
                    height="22"
                    alt="UBCOIEEE"
                    style={{ margin: "auto" }}
                />
                <Heading style={global.heading}>We are waiting for you!</Heading>
                <Text style={global.text}>
                    We have successfully received your order. Your order is ready for pickup! The hackerspace is located at EME2245. Our working hours can be found in the highlights of our
                    <a className="underline" href='https://www.instagram.com/ieeeubco/'>
                        &nbsp;<u>Instagram Page</u>
                        </a>
                </Text>
                <Text style={{ ...global.text, marginTop: 24 }}>
                    We´ve also charged your payment method for the cost of your order
                    and will be removing any authorization holds. For payment details,
                    please visit your Orders page on Nike.com or in the Nike app.
                </Text>
                </Section>
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                <Text style={adressTitle}>Recipient: {order.firstname}&nbsp;{order.lastname}</Text>
                </Section>
                <Hr style={global.hr} />
                {order.orderItems.map((item) => (
                    <Section
                    key={item.productvalue.id}
                    style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}
                    >
                    <Row>
                        <Column>
                        <Img
                            src={item.productvalue.images[0].url}
                            alt=""
                            style={{ float: "left" }}
                            width="260px"
                        />
                        </Column>
                        <Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                        <Text style={{ ...paragraph, fontWeight: "500" }}>
                            {item.product.name}
                        </Text>
                        <Text style={global.text}>Category: {item.product.category.name}</Text>
                        <Text style={global.text}>Size: {item.product.size.name}</Text>
                        {item.product.mode === "2" && (
                            <Text style={global.text}>{item.product.mastertype}: {item.productvalue.typevaluemaster}</Text>
                        )}
                        {item.product.mode === "3" && (
                            <>
                                <Text style={global.text}>{item.product.mastertype}: {item.productvalue.typevaluemaster}</Text>
                                <Text style={global.text}>{item.product.childrentype}: {item.productvalue.typevaluechildren}</Text>
                            </>
                        )}
                        {item.product.mode === "4" && (
                            <>
                            <Text style={global.text}>{item.product.mastertype}: {item.productvalue.typevaluemaster}</Text>
                            <Text style={global.text}>{item.product.childrentype}: {item.productvalue.typevaluechildren}</Text>
                            <Text style={global.text}>{item.product.thirdtype}: {item.productvalue.typevaluethird}</Text>
                            </>
                        )}
                        <Text style={global.text}>
                            Color:&nbsp;
                            <div
                                className="h-6 w-6 rounded-full border"
                                style={{ backgroundColor: item.productvalue.color.value }}
                            />
                        </Text>
                        <Text style={global.text}>Price per Unit: {item.productvalue.price}</Text>
                        <Text style={global.text}>Quantity: {item.quantity}</Text>
                        <Text style={global.text}>Price: {Number(item.productvalue.price)*Number(item.quantity)}</Text>
                        </Column>
                    </Row>
                    </Section>    
                ))}
                <Hr style={global.hr} />
                <Section style={global.defaultPadding}>
                <Row style={{ display: "inline-flex", marginBottom: 40 }}>
                    <Column align="center" style={{ width: "170px" }}>
                    <Text style={global.paragraphWithBold}>Order Date</Text>
                    <Text style={track.number}>{formattedDate}&nbsp;PST</Text>
                    </Column>
                </Row>
                </Section>
                <Hr style={global.hr} />
                <Section style={menu.container}>
                <Row>
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
                        Policies & Returns
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
                <Row>
                    <Text style={global.heading}>UBCO IEEE</Text>
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

const recomendations = {
container: {
    padding: "20px 0",
},
product: {
    verticalAlign: "top",
    textAlign: "left" as const,
    paddingLeft: "2px",
    paddingRight: "2px",
},
title: { ...recomendationsText, paddingTop: "12px", fontWeight: "500" },
text: {
    ...recomendationsText,
    paddingTop: "4px",
    color: "#747474",
},
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
