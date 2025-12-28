import Image from 'react-bootstrap/Image';
import LoginForm from "./LoginForm";
import "../globals.css";

const Index = () => {
  return(
    <main  className="centered-page">
      <Image src="/BookLogo.png"
      width={300}
      height={300}
      alt="Logo" rounded  />
      <LoginForm />
    </main>
  );
};
export default Index;
