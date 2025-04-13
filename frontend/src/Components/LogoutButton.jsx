export default function LogoutButton({ onLogout }) {
  return (
    <button onClick={onLogout} className=" bg-amber-300 hover:bg-amber-500 p-1 rounded-md cursor-pointer">
      Logout
    </button>
  );
}
