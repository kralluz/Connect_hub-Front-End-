import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ContactProvider } from "./providers/contactProvider";
import { ClientProvider } from "./providers/clientProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.css'
import { Toaster } from "react-hot-toast";


function App() {
    return (
        <div>
            <Toaster
                position="bottom-right" 
                toastOptions={{
                    className: "", 
                    duration: 2000,
                    style: {
                        background: "#0000008b",
                        color: "#ffffff",
                    },
                }}
            />
            <ClientProvider>
                <ContactProvider>
                    <AppRoutes />
                </ContactProvider>
            </ClientProvider>
        </div>
    );
}

export default App;
