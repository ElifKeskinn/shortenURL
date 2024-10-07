import Logo from "@/components/svgs/logo";
import Link from 'next/link';

const DesktopHeader = () => {
  return (
    <div className="desktopHeader">
      <Logo />
      <div className="desktopNav">
        <div className="nav">
          <a href="#">Features</a>
          <a href="#">Pricing</a>
          <a href="#">Resources</a>
        </div>
      </div>
      <div className="loginNav">
      <Link href="/login">login</Link>
      <Link href="/signup">sign up</Link>
      </div>
    </div>
  );
};

export default DesktopHeader;
