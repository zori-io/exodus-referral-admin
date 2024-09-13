import { Html, Container } from "@react-email/components";
import React from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "/public/images/logos/logo-icon.svg";
import { Icon } from "@iconify/react";

const EmailTemplate = ({
  firstName = "First Name",
  lastName = "Last Name",
}) => {
  return (
    <Html>
      <Container className="bg-white">
        <div className="p-8">
          <div className="p-6">
            <Logo />
          </div>

          <div className="py-8 px-6">
            <p className="text-base text-gray-600">
              Dear Mr. {firstName} {lastName},
            </p>

            <p className="text-base mt-4 text-gray-600">
              Your ZORI Exodus referral account has been approved! Click the
              button below to Log In and start inviting your friends. To learn
              more about your rewards when you successfully invite friends,
              click the ‘Learn More’ button.
            </p>

            <div className="flex py-6 gap-3">
              <Link
                className="bg-black text-white text-base font-semibold  py-[10px] px-[18px] rounded-sm"
                href="your-login-url"
              >
                Log In
              </Link>
              <Link
                className="bg-black text-white text-base font-semibold  py-[10px] px-[18px] rounded-sm"
                href="your-learnmore-url"
              >
                Learn More
              </Link>
            </div>

            <p className="text-base text-gray-600">
              Thank You,
              <br />
              The ZORI Exodus Team
            </p>
          </div>

          <div className="py-8 px-6">
            <p className="text-sm text-gray-600 mb-12">© 2024 ZORI K.K</p>

            <div className="flex justify-between">
              <Image src={LogoIcon} className="w-5 ms-4" alt="logo" />
              <div className="flex gap-4">
                <Icon
                  color="#A3A3A3"
                  icon="akar-icons:twitter-fill"
                  height={20}
                />
                <Icon color="#A3A3A3" icon="bi:facebook" height={20} />
                <Icon color="#A3A3A3" icon="iconoir:instagram" height={20} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Html>
  );
};

export default EmailTemplate;
