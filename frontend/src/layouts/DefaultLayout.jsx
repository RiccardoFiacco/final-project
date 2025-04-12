import { Outlet } from "react-router-dom";

export function DefaultLayout() {
    return (
        <>
          <Header />
            <main>
              <Outlet />
            </main>   
          <Footer/>  
        </>   
    )
}