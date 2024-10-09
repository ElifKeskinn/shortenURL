import IllustrationWorking from "@/components/svgs/illustrationWorking"

const Hero = ({email}) => {
  return (
    <div className="hero">
      <div className="desktopBanner">
        <div className="bannerContent">
          <h1>More than just shorter links</h1>
          <p>Build your brand&apos;s recognition and get detailed insights on how your links are performing.</p>
          <a href="/">Get Started</a>
          {email && <span className="greeting">Merhaba {email}</span>}
        </div>
        <IllustrationWorking />
      </div>
    </div>
  );
};

export default Hero;
