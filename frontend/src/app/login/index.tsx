import Image from 'react-bootstrap/Image';
import LoginForm from "./LoginForm";
import "../globals.css";

const Index = () => {
  return(
    <main className="centered-page">
      <Image src="/BookLogo.png"
      width={200}
      height={200}
      alt="Logo" rounded  />

      <h1>BookManager</h1>
      <h5>Admin Portal</h5>
      <br></br>
      <h2>Login</h2>

      <LoginForm />
    </main>
  );
};
export default Index;
