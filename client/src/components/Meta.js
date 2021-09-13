import { Helmet } from "react-helmet";

const Meta = ({ title, keywords, description }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>

        <meta name="description" content={description} />

        <meta name="keywords" content={keywords} />
      </Helmet>
    </>
  );

  
};

Meta.defaultProps = {
  title: "Shop Aspin Society Online - Streetwear • Lifestyle • Culture",
  description:
    "We are Aspin Society. We love Lechon and you probably don't know what it is. That's why Aspin Society is here to bring culture and lifestyle to an extraordinary level by merging it to our unique style of streetwear.",
  keywords: "streetwear, buy streetwear, filipino streetwear, pinoy streetwear"
};


export default Meta;
