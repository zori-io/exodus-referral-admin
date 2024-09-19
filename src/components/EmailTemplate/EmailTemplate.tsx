import {
  Html,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Button,
} from "@react-email/components";

import Link from "next/link";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
}

const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
}) => {
  return (
    <Html>
      <Container style={{ backgroundColor: "#ffffff", padding: "32px" }}>
        <div style={{ padding: "32px 0" }}>
          <div style={{ padding: "24px 0" }}>
            <Img
              src="https://cloud.appwrite.io/v1/storage/buckets/66e668600018b0900563/files/66e6687d0007ccf5afaf/view?project=66decf5700255f351361&project=66decf5700255f351361&mode=admin"
              alt="Zori Exodus Logo"
              width="32"
              height="32"
            />
          </div>

          <div style={{ padding: "32px 0" }}>
            <Text style={{ fontSize: "16px", marginTop: 0, color: "#525252" }}>
              こんにちは {lastName} {firstName}
            </Text>

            <Text
              style={{
                fontSize: "16px",
                marginTop: "16px",
                marginBottom: 0,
                color: "#525252",
              }}
            >
              あなたのZORI
              Exodus紹介アカウントが承認されました！下のボタンからログインし、あなたの仲間を招待してください。あなたのお友達が入会した後に付与される「リワード」について詳しく知りたい場合は、下の「リワードについて」のボタンをクリックしてご確認ください。
            </Text>

            <Text
              style={{
                fontSize: "16px",
                marginTop: "16px",
                marginBottom: 0,
                color: "#525252",
              }}
            >
              Your ZORI Exodus referral account has been approved! Click the
              button below to Log In and start inviting your friends. To learn
              more about your rewards when you successfully invite friends,
              click the ‘Learn More’ button.
            </Text>

            <Section
              style={{
                marginTop: "24px",
                marginBottom: "24px",
              }}
            >
              <Row>
                <Button
                  href="https://zori-exodus-referral.vercel.app/login"
                  style={{
                    backgroundColor: "#000000",
                    color: "#FDFDFD",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    marginRight: "32px",
                  }}
                >
                  ログイン
                </Button>
                <Button
                  href="your-learnmore-url"
                  style={{
                    backgroundColor: "#000000",
                    color: "#FDFDFD",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    textDecoration: "none",
                  }}
                >
                  リワードについて
                </Button>
              </Row>
            </Section>

            <p style={{ fontSize: "16px", color: "#4B5563" }}>
              ZORI Exodusチーム / The ZORI Exodus Team
            </p>
          </div>
          <div style={{ padding: "32px 0" }}>
            <p
              style={{
                fontSize: "14px",
                color: "#4B5563",
                marginBottom: "48px",
              }}
            >
              © 2024 ZORI K.K
            </p>

            <Section>
              <Row>
                <Column style={{ width: "75%" }} align="left">
                  <Img
                    alt="Zori Exodus Logo"
                    height="20"
                    width="20"
                    src="https://cloud.appwrite.io/v1/storage/buckets/66e668600018b0900563/files/66e6687d0007ccf5afaf/view?project=66decf5700255f351361&project=66decf5700255f351361&mode=admin"
                  />
                </Column>
                <Column style={{ width: "25%" }} align="right">
                  <Row align="right">
                    <Column align="center">
                      <Link href="#">
                        <Img
                          alt="Instagram"
                          height="20"
                          width="20"
                          src="https://cloud.appwrite.io/v1/storage/buckets/66e668600018b0900563/files/66e6689300301dd48cd3/view?project=66decf5700255f351361&project=66decf5700255f351361&mode=admin"
                        />
                      </Link>
                    </Column>
                    <Column align="center">
                      <Link href="#">
                        <Img
                          alt="Twitter"
                          height="20"
                          width="20"
                          src="https://cloud.appwrite.io/v1/storage/buckets/66e668600018b0900563/files/66e668a5001f4326c2f3/view?project=66decf5700255f351361&project=66decf5700255f351361&mode=admin"
                        />
                      </Link>
                    </Column>
                    <Column align="center">
                      <Link href="#">
                        <Img
                          alt="Facebook"
                          height="20"
                          width="20"
                          src="https://cloud.appwrite.io/v1/storage/buckets/66e668600018b0900563/files/66e6688a0039d7ec6a86/view?project=66decf5700255f351361&project=66decf5700255f351361&mode=admin"
                        />
                      </Link>
                    </Column>
                  </Row>
                </Column>
              </Row>
            </Section>
          </div>
        </div>
      </Container>
    </Html>
  );
};

export default EmailTemplate;
