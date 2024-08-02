import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Column,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  export const EmailTemplate = ({
    name = "",
    redirectUrl = "/login",
    linkText = "Complete your onboarding process"
  }) => (
    <Html>
      <Head />
      <Preview>A fine-grained personal access token has been added to your account</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Img
            src={`${baseUrl}/static/github.png`}
            width="32"
            height="32"
            alt="Github"
          />
          <Text style={styles.title}>{linkText}</Text>
          <Section style={styles.section}>
            <Text style={styles.text}>
              Hey <strong>{name}</strong>!
            </Text>
            <Text style={styles.text}>
              Thank you for creating an account with us. We request you to click
              on the link below to complete your onboarding process. Thank you!
            </Text>
            <Link style={styles.button} href={`${baseUrl}${redirectUrl}`}>
              {linkText}
            </Link>
          </Section>
          <Section>
            <Row style={styles.footerLogos}>
              <Column style={{ width: "66%" }}>
                <Img
                  src={`${baseUrl}/static/slack-logo.png`}
                  width="120"
                  height="36"
                  alt="Slack"
                />
              </Column>
              <Column>
                <Section>
                  <Row>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-twitter.png`}
                          width="32"
                          height="32"
                          alt="Twitter"
                          style={styles.socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-facebook.png`}
                          width="32"
                          height="32"
                          alt="Facebook"
                          style={styles.socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-linkedin.png`}
                          width="32"
                          height="32"
                          alt="LinkedIn"
                          style={styles.socialMediaIcon}
                        />
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column>
            </Row>
          </Section>
          <Text style={styles.links}>
            <Link style={styles.link}>Your security audit log</Link> ・{" "}
            <Link style={styles.link}>Contact support</Link>
          </Text>
          <Text style={styles.footer}>
            Auth System By JB, Inc. ・88 Colin P Kelly Jr Street ・San Francisco,
            CA 94107
          </Text>
        </Container>
      </Body>
    </Html>
  );
  
  export default EmailTemplate;
  
  const styles = {
    main: {
      backgroundColor: "#ffffff",
      color: "#24292e",
      fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    },
    container: {
      width: "480px",
      margin: "0 auto",
      padding: "20px 0 48px",
    },
    title: {
      fontSize: "24px",
      lineHeight: 1.25,
    },
    section: {
      padding: "24px",
      border: "solid 1px #dedede",
      borderRadius: "5px",
      textAlign: "center",
    },
    text: {
      margin: "0 0 10px 0",
      textAlign: "left",
    },
    socialMediaIcon: {
      display: "inline",
      marginLeft: "32px",
    },
    footerLogos: {
      marginBottom: "32px",
      paddingLeft: "8px",
      paddingRight: "8px",
      width: "100%",
    },
    button: {
      fontSize: "14px",
      backgroundColor: "#28a745",
      color: "#fff",
      lineHeight: 1.5,
      borderRadius: "0.5em",
      padding: "0.75em 1.5em",
    },
    links: {
      textAlign: "center",
    },
    link: {
      color: "#0366d6",
      fontSize: "12px",
    },
    footer: {
      color: "#6a737d",
      fontSize: "12px",
      textAlign: "center",
      marginTop: "60px",
    },
  };
  