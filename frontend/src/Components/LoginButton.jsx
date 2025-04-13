
function LoginButton() {
    const openLoginPage = () => {
      window.open("http://localhost:8080/login", "_self"); // oppure "_blank" se vuoi nuova scheda
    };
  
    return (
      <button onClick={openLoginPage} className=" bg-amber-300 hover:bg-amber-500 p-1 rounded-md cursor-pointer">
        Login
      </button>
    );
  }
  
  export default LoginButton;