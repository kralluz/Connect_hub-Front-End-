import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ContactProvider } from "./providers/contactProvider";
import { ClientProvider } from "./providers/clientProvier";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div>
            <Toaster />
            <ClientProvider>
                <ContactProvider>
                    <AppRoutes />
                </ContactProvider>
            </ClientProvider>
        </div>
    );
}

export default App;
