import Image from 'react-bootstrap/Image';
import LoginForm from "./LoginForm";

const Index = () => {
  return(
    <main>
      <Image src="/BookLogo.png"
      width={300}
      height={300}
      alt="Logo" rounded  />
      <LoginForm />
    </main>
  );
};
export default Index;
